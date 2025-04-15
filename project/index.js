const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = today.getFullYear();

document.querySelector("#lastModified").textContent = 
    new Date(document.lastModified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

const currentYearEl = document.querySelector("#currentyear");
const lastModifiedEl = document.querySelector("#lastModified");
const contactForm = document.querySelector("#contactForm");
const themeToggle = document.createElement("button");

const appState = {
  theme: localStorage.getItem("theme") || "light",
  formSubmissions: JSON.parse(localStorage.getItem("formSubmissions")) || []
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toggleTheme() {
  appState.theme = appState.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", appState.theme);
  saveToLocalStorage("theme", appState.theme);
  updateThemeButton();
}

function updateThemeButton() {
  themeToggle.innerHTML = appState.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
}

function initTheme() {
  document.documentElement.setAttribute("data-theme", appState.theme);
  themeToggle.id = "themeToggle";
  themeToggle.addEventListener("click", toggleTheme);
  updateThemeButton();
  document.querySelector("nav ul").prepend(themeToggle);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    id: Date.now(),
    name: e.target.name.value,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
    date: new Date().toISOString()
  };

  appState.formSubmissions.push(formData);
  saveToLocalStorage("formSubmissions", appState.formSubmissions);

  displaySuccessMessage();
  e.target.reset();
}

function displaySuccessMessage() {
  const successEl = document.createElement("div");
  successEl.className = "alert success";
  successEl.innerHTML = `
    <p>Thank you for your message! I'll respond within 48 hours.</p>
    <p>Previous submissions: ${appState.formSubmissions.length}</p>
  `;
  
  contactForm.parentNode.insertBefore(successEl, contactForm.nextSibling);
  
  setTimeout(() => {
    successEl.classList.add("fade-out");
    setTimeout(() => successEl.remove(), 500);
  }, 3000);
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  if (!filterButtons.length) return;
  
  const filters = {
    all: Array.from(projectCards),
    javascript: Array.from(projectCards).filter(card => 
      card.querySelector(".skill").textContent.includes("JavaScript")),
    python: Array.from(projectCards).filter(card =>
      card.querySelector(".skill").textContent.includes("Python"))
  };
  
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      
      projectCards.forEach(card => card.style.display = "none");
      
      filters[filter].forEach(card => {
        card.style.display = "block";
        card.classList.add("animate-in");
      });
      
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function initApp() {
  currentYearEl.textContent = new Date().getFullYear();
  
  lastModifiedEl.textContent = formatDate(document.lastModified);
  
  initTheme();
  
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
  
  initProjectFilters();
  
  console.log("Saved submissions:", appState.formSubmissions);
}

document.addEventListener("DOMContentLoaded", initApp);

document.getElementById("contact-method").addEventListener("change", (e) => {
    const phoneField = document.getElementById("phone-field");
    phoneField.style.display = e.target.value === "phone" ? "block" : "none";
});