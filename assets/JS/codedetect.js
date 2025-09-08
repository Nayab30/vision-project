  const MODEL = "gemini-1.5-flash";

    function escapeHtml(s){
      return s.replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
    }

    function toHTML(md){
      const esc = escapeHtml;
      let html = md;

      html = html.replace(/```([\w+-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const safeLang = lang || "plaintext";
        const safeCode = esc(code);
        const codeId = "code_" + Math.random().toString(36).slice(2, 9);
        return `
          <div class="code-block">
            <pre><code id="${codeId}" class="language-${safeLang}">${safeCode}</code></pre>
            <button class="copy-btn" onclick="copyCode('${codeId}')">📋 Copy Code</button>
          </div>
        `;
      });

      html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
      html = html.replace(/^\s*[-*] (.*)$/gm, '• $1');
      html = html.replace(/\n{2,}/g, '<br><br>');

      return `<h2>Analysis Result</h2>${html}`;
    }

    function copyCode(id){
      const codeEl = document.getElementById(id);
      if(!codeEl) return;
      const text = codeEl.innerText;
      navigator.clipboard.writeText(text).then(()=>{
        alert("Code copied!");
      }).catch(err=>{
        alert("Copy failed: " + err);
      });
    }

    async function detectCodeErrors(){
      const btn = document.getElementById("checkBtn");
      const outputEl = document.getElementById("output");
      const API_KEY = "AIzaSyDRQ_cyqmOyu2v2f_iJIbJ0F2XY5t0uC6g"; 

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

      const userCode = document.getElementById("userInput").value.trim();
      if(!userCode){
        outputEl.innerHTML = `<p style="color:#b00;">Please paste some code first.</p>`;
        return;
      }

      const systemPrompt =
`You are an expert code reviewer.  
Analyze the following code:  
1. Detect and explain all errors and improvements.  
2. Output a corrected version.  
3. Detect the programming language automatically and wrap the fixed code in fenced block.  

Format:
### Errors & Explanations
- ...

### Corrected Code
\`\`\`<language>
...fixed code...
\`\`\``;

      const body = {
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt + `\n\nHere is the code:\n\`\`\`auto\n${userCode}\n\`\`\`` }
            ]
          }
        ]
      };

      try{
        btn.disabled = true;
        btn.textContent = "Analyzing...";
        outputEl.classList.add("muted");
        outputEl.textContent = "Working...";

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await res.json();

        if(!res.ok){
          const msg = data?.error?.message || `HTTP ${res.status}`;
          throw new Error(msg);
        }

        const text = (data.candidates?.[0]?.content?.parts || [])
          .map(p => p.text || "")
          .join("\n")
          .trim();

        if(!text) throw new Error("Empty response from model.");

        outputEl.classList.remove("muted");
        outputEl.innerHTML = toHTML(text);
        Prism.highlightAll();

      }catch(err){
        outputEl.classList.remove("muted");
        outputEl.innerHTML = `<p style="color:red;">${escapeHtml(String(err))}</p>`;
        console.error(err);
      }finally{
        btn.disabled = false;
        btn.textContent = "Check Errors";
      }
    }