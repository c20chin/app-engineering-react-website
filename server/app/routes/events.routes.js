module.exports = (app) => {
  const events = require("../controllers/events.controller.js")

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", events.create)

  // Retrieve all Tutorials
  router.get("/", events.findAll)

  // Update a Tutorial with id
  router.put("/:id", events.update)

  // Retrieve a single Proposal with id
  router.get("/:id", events.findOne)

  router.delete("/:id", events.delete)   //new 
  app.use("/api/events", router)



}
