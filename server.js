require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON body

app.post("/send-email", async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    // Backend Validation
    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Your email to receive messages
            subject: subject,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email", error: error.message });
    }
});
