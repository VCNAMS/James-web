const progressBar = document.getElementById("scrollProgress");
const cursorGlow = document.getElementById("cursorGlow");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a, .brand");
const revealItems = document.querySelectorAll("[data-reveal]");

const setActiveLink = () => {
    const scrollPosition = window.scrollY + 120;

    navAnchors.forEach((link) => {
        const section = document.querySelector(link.getAttribute("href"));
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    setActiveLink();
});

window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
});

window.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
});

navAnchors.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            navLinks.classList.remove("open");
        }
    });
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const commentForm = document.getElementById("commentForm");
const formNotification = document.getElementById("formNotification");

if (commentForm && formNotification) {
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(commentForm);
        const name = formData.get("name").toString().trim();
        const email = formData.get("email").toString().trim();
        const message = formData.get("message").toString().trim();

        if (!name || !email || !message) {
            formNotification.textContent = "Please fill in your name, email, and comment before sending.";
            formNotification.classList.add("show");
            return;
        }

        const subject = encodeURIComponent(`New comment from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:namsjaemsiu@gmail.com?subject=${subject}&body=${body}`;
        formNotification.textContent = `Thanks ${name}! Your comment is ready to be sent to me.`;
        formNotification.classList.add("show");
        commentForm.reset();
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));
setActiveLink();

