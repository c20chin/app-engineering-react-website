const db = require("../models")
const Event = db.events
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }

  // Create a event
  const event = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    datetime: req.body.datetime,
    media: req.body.media,
    // location: req.body.location
  }
  console.log(event)

  // Save event in the database
  Event
    .create(event)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      })
    })
}

exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Event
    .findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Event
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find data with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  console.log(req.body)

  Event
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating data with id=" + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Event
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully.",
        })
      } else {
        res.send({
          message: `Cannot delete data with id=${id}. Maybe data was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting data with id=" + id,
      })
    })
}
