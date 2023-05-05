module.exports = (app) => {
    const { sendMail } = require("../controllers/email.controller.js");

    const router = require("express").Router();

    /** HTTP Reqeust */
    router.post("/sendMail", sendMail);

    app.use("/api", router)

}
