module.exports = (app) => {
    const webconfig = require("../controllers/webConfig.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", webconfig.findAll);
  
    // Update a Tutorial with id
    router.put("/:id", webconfig.update);

    // Retrieve a single Proposal with id
    router.get("/:id", webconfig.findOne);
  
  
    app.use("/api/webconfig", router);
  };
  