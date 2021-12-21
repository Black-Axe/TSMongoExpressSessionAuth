require('dotenv').config();
import nodemailer from 'nodemailer';
import config from "../../config/defaults";
const clientURL = config.adminClient;
const mailPORT = Number(process.env.MAIL_PORT);
const host = process.env.MAIL_HOST

//if using Google email service, you may need to allow less secure apps
const transporter = nodemailer.createTransport({
    host: host,
    port: mailPORT,
    secure: true,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});

export const sendResetLink = ({tokenString, email}:{tokenString:string, email:string}) => {
      let link = `${clientURL}/reset/${tokenString}`;
      let html = `<p>You have requested to reset your password. Please click the link below to reset your password:</p>
                  <a href="${link}">${link}</a>`;
      const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "Password Reset",
            html: html
      }
      transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                  console.log(err);
                  return{
                        error: true,
                  }
            } else {
                  console.log('Message sent: %s', info.messageId);
                  return{
                        error: false,
                  }
            }
      });

}