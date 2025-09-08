const chatBox = document.getElementById("chat-box"); 
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const newChatBtn = document.getElementById("new-chat-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const chatContainer = document.getElementById("chat-container");
const chatbotIcon = document.getElementById("chatbot-icon");

// 🎤 Voice buttons
const voiceBtn = document.getElementById("voice-btn");
const stopVoiceBtn = document.getElementById("stop-voice-btn");

// 🔊 Speech API setup
let synth = window.speechSynthesis;
let recognition;

// Gemini API
const API_KEY = "AIzaSyDRQ_cyqmOyu2v2f_iJIbJ0F2XY5t0uC6g"; 
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

// ---- Load memory from localStorage ----
let userMemory = JSON.parse(localStorage.getItem("userMemory")) || {};

//  Save memory helper
function saveMemory() {
  localStorage.setItem("userMemory", JSON.stringify(userMemory));
}

//  SkillPilot trained responses
const skillPilotResponses = {
  "courses": "SkillPilot offers Web Development,Python, Data Science, AI, and Agentic AI courses.",
  "offers": "Limited-time offer: 14 days free trial on Web Dev & AI courses this month!",
  "about": "I'm SkillPilot Bot. I help you explore courses and special deals.",
  "contact": "Contact us: support@skillpilot.com | +92-300-1234567"
};

//  Show/hide chatbot
chatbotIcon.addEventListener("click", () => {
  chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
  if(chatBox.innerHTML.trim() === "") {
    if (userMemory.name) {
      addBotMessage(`Welcome back, ${userMemory.name}!`);
    } else {
      addBotMessage("Assalam o Alaikum, I'm SkillPilot Bot! What's your name?");
    }
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

  // 🔊 Speak the bot reply
  speakText(text);
}

function addUserMessage(text) {
  let userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ---- Speak text (Text-to-Speech)
function speakText(text) {
  if (synth.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Google UK English Female"));
  if (femaleVoice) utterance.voice = femaleVoice;
  utterance.rate = 1;
  utterance.pitch = 1;
  synth.speak(utterance);
}

// ---- Voice-to-Text (Speech Recognition)
function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support Speech Recognition. Try Chrome!");
    return;
  }
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 10;

  recognition.start();

  recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    userInput.value = speechResult;
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
  };
}

// ---- Send message
async function sendMessage(msg) {
  addUserMessage(msg);

  let lowerMsg = msg.toLowerCase();

  // ---- Memory Handling ----
  if (lowerMsg.includes("my name is") || lowerMsg.includes("my name ") || lowerMsg.includes("name is")) {
    let name = msg.split("is")[1]?.trim();
    if (name) {
      userMemory.name = name;
      saveMemory();
      addBotMessage(`Nice to meet you, ${name}! `, true);
      return;
    }
  }

  if (lowerMsg.includes("my email is")) {
    let email = msg.split("is")[1]?.trim();
    if (email) {
      userMemory.email = email;
      saveMemory();
      addBotMessage(`Got it! I'll remember your email: ${email}`, true);
      return;
    }
  }

  if (lowerMsg.includes("what's my name") || lowerMsg.includes("do you know my name") || lowerMsg.includes("what is my name")) {
    if (userMemory.name) {
      addBotMessage(`Yes! Your name is ${userMemory.name}.`, true);
    } else {
      addBotMessage("I don’t know yet. Tell me your name by saying 'My name is ...'", true);
    }
    return;
  }

  if (lowerMsg.includes("what's my email")) {
    if (userMemory.email) {
      addBotMessage(`Your email is ${userMemory.email}.`, true);
    } else {
      addBotMessage("I don’t know your email yet. Tell me by saying 'My email is ...'", true);
    }
    return;
  }

  // ---- Registration handling ----
  if (lowerMsg.includes("register") || lowerMsg.includes("registration") || lowerMsg.includes("sign up")) {
    let botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.innerHTML = `Sure! <a href="register.html" target="_blank" style="color:#007bff; text-decoration:underline;">Click here to Register</a>`;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return;
  }

  // ---- Predefined responses ----
  for (let key in skillPilotResponses) {
    if (lowerMsg.includes(key)) {
      let shortReply = skillPilotResponses[key].split(".").slice(0, 2).join(".") + ".";
      addBotMessage(shortReply.trim(), true);
      return;
    }
  }

  // ---- Otherwise → Gemini ----
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

    let lines = output.split("\n").filter(l => l.trim() !== "");
    let shortOutput = lines.slice(0, 2).join(" ");
    addBotMessage(shortOutput.trim(), true);

  } catch (error) {
    addBotMessage("Error: Could not connect.", false);
  }
}

// ---- Event Listeners
sendBtn.addEventListener("click", () => {
  let msg = userInput.value.trim();
  if(msg) {
    sendMessage(msg);
    userInput.value = "";
  }
});

voiceBtn.addEventListener("click", () => startListening());

stopVoiceBtn.addEventListener("click", () => {
  if (synth.speaking) synth.cancel();
});

userInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendBtn.click();
});

newChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
  userMemory = {}; 
  saveMemory();
  addBotMessage("Assalam o Alaikum, I am SkillPilot Bot! What's your name?");
});

fullscreenBtn.addEventListener("click", () => {
  chatContainer.classList.toggle("fullscreen");
});
