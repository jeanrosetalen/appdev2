const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
require("dotenv").config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// Email sending function
const sendEmailNotification = async (book) => {
  try {
    const templatePath = path.join(__dirname, "views", "bookCreated.pug");
    const html = pug.renderFile(templatePath, {
    //   title: book.title,
    //   author: book.author,
    //   year: book.year || "Unknown",
      message: "A new book has been added to the system."
    });

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: process.env.RECIPIENT_EMAIL || "default@example.com",
      subject: "New Book Added",
      html
    };

    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmailNotification;