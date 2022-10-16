const express = require("express");

var cors = require("cors");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const data = require("./readData");

const app = express();

var corsOptions = {
  origin: 'http://www.example1.com',
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

app.get("/api/data", cors(corsOptions), (req, res) => {
  res.json(data);
});

app.post("/api/send", cors(corsOptions), (req, res) => {
  const response_key = req.body["g-recaptcha-response"];
  const secret_key = process.env.SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  fetch(url, {
    method: "post"
  })
    .then(response => response.json())
    .then(google_response => {
      if (google_response.success == true) {
        let mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: process.env.MAIL_USERNAME,
          subject: req.body.subject,
          html: `<h3>From:</h3><ul><li><strong>Name: </strong>${req.body
            .name}</li><li><strong>Email: </strong>${req.body
            .email}</li></ul><h2>Message:</h2><p>${req.body.message}</p>`
        };

        let attach = req.body.files;
        if (attach) {
          attach = JSON.parse(attach);
          mailOptions["attachments"] = attach;
        }

        transporter.sendMail(mailOptions, function(err, data) {
          if (err) {
            return res.status(500).end();
          } else {
            res.setHeader("content-type", "text/plain");
            return res.send("sent");
          }
        });
      } else {
        return res.status(500).end();
      }
    })
    .catch(error => {
      return res.status(500).end();
    });
});

app.listen();