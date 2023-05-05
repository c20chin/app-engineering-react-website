module.exports = (app) => {
  const orginfo = require("../controllers/orgInfo.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", orginfo.create);

  // Retrieve all Tutorials
  router.get("/", orginfo.findAll);

  // Retrieve by user ID
  router.get("/user/:id", orginfo.findByUserId);

  // Update a Tutorial with id
  router.put("/:id", orginfo.update);


  app.use("/api/orginfo", router);
};
