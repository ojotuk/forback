const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const app = express();
const { USER, PASS, FROM, TO } = require("./config");
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Welcome to Bie-Moni Application");
});
//post request
app.post("/requests/new", (req, res) => {
  const { name, serviceType, email, phone, details } = req.body;
  // console.log(details);
  var mailOptions = {
    from: FROM,
    to: TO,
    subject: `BIE-MONI APP ${serviceType}`,
    html: `
      <h1>Request on ${serviceType}</h1>
      <h4>Hello, you have a new request/inquiry from ${name}</h4>
      <div>
      Find details of this inquiry/request below:
      <p>Client Email: ${email}</p>
      <p>Client Phone: ${phone}</p>
      <hr></hr>
      <p>${details}</p>
      <p>Thank you.</p>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({
        message: "Failed",
        status: 500,
      });
    } else {
      // console.log("Email sent: " + info.response);
      res.json({
        message: "Message sent",
        status: 200,
      });
    }
  });
});
//post subcriber
app.post("/subscribe/new", (req, res) => {
  const { email } = req.body;
  var mailOptions = {
    from: FROM,
    to: TO,
    subject: `BIE-MONI APP: New Subscriber`,
    html: `
      <h4>Please add the email below to your subscriber list.</h4>
      <p>Thank you.</p>
      <div>
      <p>Client Email: ${email}</p>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({
        message: "Subscription Failed",
        status: 500,
      });
    } else {
      // console.log("Email sent: " + info.response);
      res.json({
        message: "Message sent",
        status: 200,
      });
    }
  });
});

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);
