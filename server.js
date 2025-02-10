const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");




const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => {
    console.log(`app is running on PORT ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const {firstName, lastName, email, subject, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password
            },
        });

        await transporter.sendMail({
            from: email,
            text: `Name : ${firstName} ${lastName}`,
            to: process.env.EMAIL, // Your email to receive messages
            subject: subject,
            text: message,
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