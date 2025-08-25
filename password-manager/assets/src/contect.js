document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("Name");
  const emailInput = document.getElementById("email");
  const messageInput = document.querySelector("textarea");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      Toastify({
        text: "⚠️ Please fill in all fields.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ef4444",
        style: {
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        },
      }).showToast();
      return;
    }

    Toastify({
      text: `✅ Thank you, ${name}. Your message was sent!`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#1E293B",
      style: {
        border: "2px solid #F1F5F9",
        borderRadius: "8px",
        fontWeight: "bold",
        color: "#F1F5F9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      },
    }).showToast();

    form.reset();
  });
});
