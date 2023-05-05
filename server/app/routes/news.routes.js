module.exports = (app) => {
  const news = require("../controllers/news.controller.js")

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", news.create)

  // Retrieve all Tutorials
  router.get("/", news.findAll)

  // Update a Tutorial with id
  router.put("/:id", news.update)

  // Retrieve a single Proposal with id
  router.get("/:id", news.findOne)

  router.delete("/:id", news.delete)
  app.use("/api/news", router)
};
