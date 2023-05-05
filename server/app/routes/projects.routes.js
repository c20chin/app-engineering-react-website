module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js")
  // const { ossController, uploadToOSS } = require("../controllers/oss.controller.js")
  const { uploadToOSS, azureControl } = require("../controllers/azure.controller.js")
  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", projects.create)

  // Retrieve all Tutorials
  router.get("/", projects.findAll)

  // Retrieve by ID
  router.get("/:id", projects.findOne)

  // Update a Tutorial with id
  router.put("/:id", projects.update)

  router.delete("/:id", projects.delete)  //new 


  router.get("/find/title/:title", projects.findByTitle)  // new
  router.get("/find/title/", projects.findByTitle)  // new

  router.post("/export/project", projects.exportsProjects)  // new

  router.put("/add/CSV", projects.importProjects)  // new

  router.post("/upload/pic", uploadToOSS, azureControl)

  router.post("/change/feature/:what/:id", projects.changeFeature)  // new

  router.post("/change/publish/:what/:id", projects.changePublish)  // new

  router.post("/:id/views", projects.incrementViewCount)

  app.use("/api/projects", router)


}
