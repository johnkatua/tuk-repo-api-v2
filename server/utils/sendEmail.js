const nodemailer = require('nodemailer');

require('dotenv').config();

exports.sendEmail = ({ from, to, subject, text }) => {
  const client = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
  });


  const message = { from, to, subject, text };
  return client.sendMail(message);
}
