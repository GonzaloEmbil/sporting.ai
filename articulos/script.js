// MODO OSCURO
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    themeIcon.classList.toggle("fa-moon", !dark);
    themeIcon.classList.toggle("fa-sun", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
});

// HAMBURGER (estructura preparada para futuro)
const hamburger = document.getElementById("hamburger-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
});
