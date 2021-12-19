import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

require('dotenv').config();


import nodemailer from 'nodemailer';
import config from "../../config/defaults";

let clientURL = config.adminClient;

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});

export const sendResetLink = ({tokenString, email}:{tokenString:string, email:string}) => {
      const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `${clientURL}reset/${tokenString}\n\n`
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

