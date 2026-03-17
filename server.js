console.log("STARTED");

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log(`Message from ${name} (${email}): ${message}`);

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hariskhan38273@gmail.com',
                pass: 'doijcmtzjuxlxryk'
            }
        });

        let mailOptions = {
            from: 'hariskhan38273@gmail.com', // ⚠️ IMPORTANT FIX
            to: 'hariskhan38273@gmail.com',
            subject: `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        let info = await transporter.sendMail(mailOptions);

        console.log("✅ Email sent:", info.response);

        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.log("❌ ERROR FULL:", error); // 🔥 show real error
        res.status(500).send('Failed to send message');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});