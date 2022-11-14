const nodemailer = require('nodemailer');

exports.sendEmail = ({ from, to, subject, text }) => {
  const client = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const message = { from, to, subject, text };
  return client.sendMail(message);
}
