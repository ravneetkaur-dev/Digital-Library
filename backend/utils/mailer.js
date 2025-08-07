import nodemailer from 'nodemailer';
// import { config } from '../config.js';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
export const sendEmail = async (to,username,password) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to,
            subject:"Your MAIMT Digital Library Account",
            html:
              `<h3>Welcome to Digital Library</h3>
      <p>You have been added as a faculty.</p>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please log in and change your password after first login.</p>
    `,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};