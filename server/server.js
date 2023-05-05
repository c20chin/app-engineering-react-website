const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {  // message
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// database
const db = require("./app/models")
const Role = db.role

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.")
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message)
  })
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to COMP0067 application." })
})

// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require("./app/routes/proposal.routes")(app)
require("./app/routes/orginfo.routes")(app)
require("./app/routes/webConfig.routes")(app)
require("./app/routes/events.routes")(app)
require("./app/routes/news.routes")(app)
require("./app/routes/projects.routes")(app)
require("./app/routes/email.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial () {
  Role.create({
    id: 1,
    name: "user"
  })

  Role.create({
    id: 2,
    name: "admin"
  })
}