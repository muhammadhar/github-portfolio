const form = document.getElementById('contactForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = "Message sent successfully!";
            form.reset();
        } else {
            status.textContent = "Failed to send message. Try again.";
        }
    } catch (error) {
        status.textContent = "Error sending message. Try again.";
    }
});