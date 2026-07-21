const toggle = document.querySelector(".chat-toggle");
const chatbot = document.querySelector(".chatbot");
const closeButton = document.querySelector(".chat-close");
const form = document.querySelector(".chat-form");
const input = form.querySelector("input");
const messages = document.querySelector(".chat-messages");
const chips = document.querySelectorAll("[data-prompt]");

const answers = [
  {
    keywords: ["project", "projects", "work", "portfolio"],
    reply:
      "Shefa has worked on a Smart Food Inventory & Recipe Recommendation App concept and a Python Virtual Voice Assistant. The food app focused on expiry tracking, shopping cart-style wireframes, and AI recipe ideas. The voice assistant helped her practice Python and customize open-source code."
  },
  {
    keywords: ["skill", "skills", "technical", "tools", "programming"],
    reply:
      "Shefa's skills include Python, HTML, CSS, JavaScript, UI wireframing, user flow design, product concept development, research, GitHub, and problem solving."
  },
  {
    keywords: ["student", "university", "study", "life", "learning"],
    reply:
      "As a software engineering student, Shefa is building confidence through coursework and hands-on projects. She is especially interested in practical software ideas, user-friendly interfaces, and learning how AI can support everyday tasks."
  },
  {
    keywords: ["food", "inventory", "recipe", "ai", "expiry", "expiration"],
    reply:
      "The Smart Food Inventory app was designed to help people track food items and expiration dates. Shefa also planned an AI feature that suggests recipes based on ingredients the user already has."
  },
  {
    keywords: ["voice", "assistant", "python", "virtual"],
    reply:
      "For the Virtual Voice Assistant project, Shefa customized an open-source Python implementation and used resources such as GitHub and GeeksforGeeks to understand and develop the assistant."
  },
  {
    keywords: ["contact", "email", "linkedin", "github", "hire", "recruiter"],
    reply:
      "Please do not hesitate to contact Shefa through the contact section. You can reach her by email, LinkedIn, or GitHub."
  }
];

function setChat(open) {
  chatbot.classList.toggle("open", open);
  chatbot.setAttribute("aria-hidden", String(!open));
  toggle.setAttribute("aria-expanded", String(open));
  if (open) input.focus();
}

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function getReply(text) {
  const normalized = text.toLowerCase();
  const match = answers.find((item) => item.keywords.some((word) => normalized.includes(word)));

  if (match) return match.reply;

  return "Shefa is a software engineering student with experience in Python, UI wireframing, product concepts, and AI-inspired project ideas. For more detail, please contact her through the contact section.";
}

function askBot(text) {
  const clean = text.trim();
  if (!clean) return;

  addMessage(clean, "user");
  input.value = "";

  window.setTimeout(() => {
    addMessage(getReply(clean), "bot");
  }, 360);
}

toggle.addEventListener("click", () => {
  setChat(!chatbot.classList.contains("open"));
});

closeButton.addEventListener("click", () => setChat(false));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  askBot(input.value);
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => askBot(chip.dataset.prompt));
});
