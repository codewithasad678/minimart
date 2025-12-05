const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail", // or 'hotmail', 'yahoo', 'smtp'
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Define email options
    const mailOptions = {
        from: `"MiniMart App" <${process.env.c}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // Send mail
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;