
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const newChatBtn = document.getElementById("new-chat-btn");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const chatContainer = document.getElementById("chat-container");
    const chatbotIcon = document.getElementById("chatbot-icon");

    //  Gemini API
    const API_KEY = "AIzaSyDRQ_cyqmOyu2v2f_iJIbJ0F2XY5t0uC6g"; 
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

    //  SkillPilot trained responses
    const skillPilotResponses = {
      "courses": " SkillPilot offers Web Development, Data Science, AI, and Digital Marketing courses.",
      "offers": " Limited-time offer: 50% OFF on Web Dev & AI courses this month!",
      "about": "I'm SkillPilot Bot. I help you explore courses and special deals.",
      "contact": " Contact us: support@skillpilot.com | +92-300-1234567"
    };

    //  Show/hide chatbot
    chatbotIcon.addEventListener("click", () => {
      chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
      if(chatBox.innerHTML.trim() === "") {
        addBotMessage("Hello , I'm SkillPilot Bot! ");
      }
    });

    //  Streaming text effect
    function streamMessage(element, text, speed = 40) {
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      }
      typeWriter();
    }

    function addBotMessage(text, streaming = true) {
      let botMsg = document.createElement("div");
      botMsg.className = "bot-message";
      chatBox.appendChild(botMsg);
      if(streaming) {
        streamMessage(botMsg, text);
      } else {
        botMsg.textContent = text;
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addUserMessage(text) {
      let userMsg = document.createElement("div");
      userMsg.className = "user-message";
      userMsg.textContent = text;
      chatBox.appendChild(userMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    //  Send message
    async function sendMessage(msg) {
  addUserMessage(msg);

  let lowerMsg = msg.toLowerCase();

  // Look for a keyword in the input
  for (let key in skillPilotResponses) {
    if (lowerMsg.includes(key)) {
      addBotMessage(skillPilotResponses[key], true);
      return;
    }
  }

  // Otherwise → Gemini
  const requestBody = {
    contents: [{ parts: [{ text: msg }] }]
  };

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    let data = await response.json();
    let output = data.candidates[0].content.parts[0].text;
    addBotMessage(output, true);
  } catch (error) {
    addBotMessage("Error: Could not connect.", false);
  }
}

    //  Event Listeners
    sendBtn.addEventListener("click", () => {
      let msg = userInput.value.trim();
      if(msg) {
        sendMessage(msg);
        userInput.value = "";
      }
    });

    userInput.addEventListener("keypress", (e) => {
      if(e.key === "Enter") sendBtn.click();
    });

    newChatBtn.addEventListener("click", () => {
      chatBox.innerHTML = "";
      addBotMessage(" New chat started with SkillPilot Bot!");
    });

    fullscreenBtn.addEventListener("click", () => {
      chatContainer.classList.toggle("fullscreen");
    });
 