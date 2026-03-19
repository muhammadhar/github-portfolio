// TYPING EFFECT (PRO FLOW)
const text = [
    "DevOps Engineer & Software Engineer",
    "Languages: C++, Java, Python, Dart",
    "DevOps Tools: Git, GitHub, Docker, Jenkins, Kubernetes, Grafana",
    "Cloud: AWS",
    "AWS Services: EC2, S3, IAM, VPC, RDS, Lambda, CloudWatch, EKS, Route53, CloudFront"
];

let i = 0, j = 0, current = "", isDeleting = false;

function type() {
    current = text[i];
    
    if (isDeleting) j--;
    else j++;

    document.getElementById("typing").innerText = current.substring(0, j);

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % text.length;
    }

    setTimeout(type, isDeleting ? 40 : 70);
}
type();

// SCROLL REVEAL
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// SHOW SECTIONS ON LOAD
window.addEventListener("load", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        el.classList.add("active");
    });
});

// CONTACT FORM
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    status.innerText = res.ok ? "✅ Message Sent!" : "❌ Error!";
});