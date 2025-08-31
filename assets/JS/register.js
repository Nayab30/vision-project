
    // ----- state -----
    const form = document.getElementById('regForm');
    const stepEls = Array.from(document.querySelectorAll('.step'));
    const indicators = Array.from(document.querySelectorAll('.step-indicator'));
    const progressBar = document.getElementById('progressBar');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const reviewArea = document.getElementById('reviewArea');
    let current = 0;
    let maxVisited = 0; // allow clicking to visited steps

    // show the given step index
    function showStep(index){
      stepEls.forEach((s,i)=> s.classList.toggle('active', i === index));
      indicators.forEach((ind,i)=> ind.classList.toggle('active', i <= index));
      prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
      nextBtn.style.display = index === stepEls.length - 1 ? 'none' : 'inline-block';
      submitBtn.style.display = index === stepEls.length - 1 ? 'inline-block' : 'none';
      const percent = Math.round((index) / (stepEls.length - 1) * 100);
      progressBar.style.width = percent + '%';
      progressBar.setAttribute('aria-valuenow', percent);
      current = index;
      if(index > maxVisited) maxVisited = index;

      // when entering review, populate summary
      if(stepEls[index].dataset.step === '4') populateReview();

      // focus first input
      const firstInput = stepEls[index].querySelector('input,select,textarea');
      firstInput && firstInput.focus();
    }

    // basic validation for visible step
    function validateStep(index){
      const step = stepEls[index];
      const requireds = Array.from(step.querySelectorAll('[required]'));
      let valid = true;

      // clear previous invalid styles
      requireds.forEach(i => i.classList.remove('invalid'));

      for(const inp of requireds){
        if(inp.type === 'checkbox'){
          if(!inp.checked){ inp.classList.add('invalid'); valid = false; }
        } else if(!inp.value || !String(inp.value).trim()){
          inp.classList.add('invalid'); valid = false;
        }
      }

      // extra check for password match on account step
      if(step.dataset.step === '1'){
        const pw = document.getElementById('password');
        const cpw = document.getElementById('confirmPassword');
        if(pw.value && cpw.value && pw.value !== cpw.value){
          pw.classList.add('invalid'); cpw.classList.add('invalid');
          alert('Passwords do not match');
          valid = false;
        } else if(pw.value && pw.value.length < 6){
          pw.classList.add('invalid'); alert('Password should be at least 6 characters'); valid = false;
        }
      }

      return valid;
    }

    nextBtn.addEventListener('click', ()=>{
      if(validateStep(current)) showStep(current + 1);
    });
    prevBtn.addEventListener('click', ()=> showStep(current - 1));

    // allow clicking indicator to go back/forward only to visited+1 step
    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => {
        if(i <= maxVisited + 1){
          if(i > current && !validateStep(current)) return; // validate before jumping forward
          showStep(i);
        }
      });
    });

    // ---- Dynamic: phones ----
    document.getElementById('addPhoneBtn').addEventListener('click', ()=>{
      const container = document.getElementById('phonesContainer');
      const row = document.createElement('div'); row.className = 'list-item';
      row.innerHTML = `\n        <input name="phones[]" type="tel" placeholder="Phone">\n        <button type="button" class="remove-btn">Remove</button>\n      `;
      container.appendChild(row);
      const remove = row.querySelector('.remove-btn');
      remove.addEventListener('click', ()=> row.remove());
    });

    // ---- Dynamic: education ----
    let eduIndex = 1; // 0 already exists
    document.getElementById('addEduBtn').addEventListener('click', ()=>{
      const container = document.getElementById('eduContainer');
      const row = document.createElement('div'); row.className = 'list-item';
      row.innerHTML = `\n        <input name="education[${eduIndex}][institution]" placeholder="Institute - e.g. ABC College">\n        <input name="education[${eduIndex}][degree]" placeholder="Degree - e.g. FSc">\n        <button type="button" class="remove-btn">Remove</button>\n      `;
      container.appendChild(row);
      const remove = row.querySelector('.remove-btn');
      remove.addEventListener('click', ()=> row.remove());
      eduIndex++;
    });

    // ---- Skills ----
    const skillsInput = document.getElementById('skillsInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillsList = document.getElementById('skillsList');
    const skills = [];
    function renderSkills(){
      skillsList.innerHTML = '';
      skills.forEach((s,i)=>{
        const pill = document.createElement('div');
        pill.style.padding = '6px 10px'; pill.style.borderRadius = '999px'; pill.style.background = '#16171b';
        pill.style.fontSize = '13px'; pillar = pill; // (no-op to avoid linter)
        pill.textContent = s;
        const x = document.createElement('button'); x.type = 'button'; x.textContent = '×';
        x.style.marginLeft = '8px'; x.style.background='transparent'; x.style.border='0'; x.style.cursor='pointer';
        x.addEventListener('click', ()=>{ skills.splice(i,1); renderSkills(); });
        pill.appendChild(x);
        skillsList.appendChild(pill);
      });
    }
    addSkillBtn.addEventListener('click', ()=>{
      const val = skillsInput.value.trim();
      if(!val) return;
      // allow comma-separated
      const parts = val.split(',').map(p=>p.trim()).filter(Boolean);
      parts.forEach(p=> skills.push(p));
      skillsInput.value = '';
      renderSkills();
    });

    // populate review area
    function populateReview(){
      const data = new FormData(form);
      // also include skills array
      const out = {};
      for(const [k,v] of data.entries()){
        if(k.endsWith('[]')){
          const key = k.replace('[]','');
          out[key] = out[key] || [];
          out[key].push(v);
        } else if(k.includes('education')){
          // collect education fields into an array
          out.education = out.education || [];
          // k looks like education[0][institution]
          const m = k.match(/education\[(\d+)\]\[(\w+)\]/);
          if(m){
            const idx = Number(m[1]); const field = m[2];
            out.education[idx] = out.education[idx] || {};
            out.education[idx][field] = v;
          }
        } else {
          out[k] = out[k] ? (Array.isArray(out[k]) ? out[k].concat(v) : [out[k], v]) : v;
        }
      }
      // include skills
      if(skills.length) out.skills = skills.slice();

      // build HTML summary
      const rows = [];
      function row(title, value){
        return `<div class="review-row"><strong>${title}</strong><div>${value}</div></div>`;
      }
      rows.push(row('Name', `${out.firstName || ''} ${out.lastName || ''}`));
      rows.push(row('Email', out.email || ''));
      if(out['phones']) rows.push(row('Phones', Array.isArray(out['phones']) ? out['phones'].join(', ') : out['phones']));
      rows.push(row('Username', out.username || ''));
      if(out.education && out.education.length){
        const eduHtml = out.education.map(e=> (e ? `${e.institution || ''} ${e.degree ? ' — '+e.degree : ''}` : '')).join('<br>');
        rows.push(row('Education', eduHtml));
      }
      if(out.skills) rows.push(row('Skills', out.skills.join(', ')));
      rows.push(row('Address', `${out.address || ''} ${out.city?(', '+out.city):''} ${out.country?(', '+out.country):''}`));

      reviewArea.innerHTML = rows.join('');
    }

    // submit handler
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      // final validation of last step
      if(!validateStep(current)) return;
      // collect data and simulate submission
      const data = new FormData(form);
      // append skills
      skills.forEach(s => data.append('skills[]', s));
      // convert to object for demo
      const obj = {};
      for(const [k,v] of data.entries()){
        if(obj[k] === undefined) obj[k] = v; else if(Array.isArray(obj[k])) obj[k].push(v); else obj[k] = [obj[k], v];
      }
      console.log('Form submitted:', obj);
      alert('Form submitted! See console for data (demo).');
      // reset optionally: form.reset(); showStep(0);
    });

    // init
    showStep(0);
  