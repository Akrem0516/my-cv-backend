const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const mailOptions = {
    from: process.env.EMAIL,
    to: "akremmezouri@gmail.com",
    subject: "Test Email",
    text: "If you receive this, your setup is working!",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});
