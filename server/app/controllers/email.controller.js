const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")

const { EMAIL, PASSWORD } = require("../env.js")

/** send mail from real gmail account */
const sendMail = (req, res) => {
  const userEmail = "c20chin@gmail.com"

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  }

  let transporter = nodemailer.createTransport(config)

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "COMP0067",
      link: "https://google.com",
    },
  })

  let response = {
    body: {
      name: "",
      intro: "Notification: You Received A New Proposal!",
      outro: "Please sign in the website to respond.",
    },
  }

  let mail = MailGenerator.generate(response)

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "New Proposal",
    html: mail,
  }

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      })
    })
    .catch((error) => {
      return res.status(500).json({ error })
    })

  // res.status(201).json("getBill Successfully...!");
}

module.exports = {
  sendMail
}
