module.exports = (app) => {
  const proposals = require("../controllers/proposal.controller.js")

  var router = require("express").Router()

  // Create a new Proposal
  router.post("/", proposals.create)

  // Retrieve a single Proposal with id
  router.get("/:id", proposals.findOne)

  // Retrieve all proposals
  router.get("/", proposals.findAll)

  // Retrieve by user ID
  router.get("/user/:id", proposals.findByUserId)

  /*   
  // Retrieve all published proposals
  router.get("/published", proposals.findAllPublished);

  // Update a Proposal with id
  router.put("/:id", proposals.update);

  // Delete a Proposal with id
  router.delete("/:id", proposals.delete);

  // Delete all proposals
  router.delete("/", proposals.deleteAll); */

  router.get("/find/title/:title", proposals.findByTitle)  // new
  router.get("/find/title/", proposals.findByTitle)   // new

  router.post("/export/proposal", proposals.exportsProposals)  // new

  router.get("/find/user/:id", proposals.findUserInfoByUserId)  //new

  router.post("/respond/decline/:id", proposals.decline)   // new

  router.post("/respond/accept/:id", proposals.accept)

  router.put("/update/:id", proposals.update)

  router.delete("/delete/:id", proposals.delete)

  router.get("/email/:email", proposals.getUserByEmail);


  app.use("/api/proposals", router)
  // http://localhost:3030/api/proposals/respond/decline/3
}
