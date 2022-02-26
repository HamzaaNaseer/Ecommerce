const nodeMailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  //----below is the code for nodemailer
  // const transporter = nodeMailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   service: process.env.SMTP_SERVICE,
  //   auth: {
  //     user: process.env.SMTP_MAIL,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html : ` <a href="${options.resetPasswordUrl}">Reset pass!</a> `
  };

  //await transporter.sendMail(mailOptions);

  sgMail.setApiKey(process.env.SEND_GRID_API);
  
  await sgMail.send(mailOptions);
};

module.exports = sendEmail;
