const db = require("../models")
const Proposal = db.proposals
const User = db.user
const Op = db.Sequelize.Op
const { parse } = require('json2csv')

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }

  // Create a Proposal
  const proposal = {
    title: req.body.title,
    description: req.body.description,
    usersType: req.body.usersType,
    projectType: req.body.projectType,
    targetDevice: req.body.targetDevice,
    webServer: req.body.webServer,
    reference: req.body.reference,
    userId: req.body.userId,
  }

  // Save Proposal in the database
  Proposal.create(proposal)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proposal.",
      })
    })
}

exports.findByTitle = (req, res) => {
  const title = req.params.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Proposal.findAll({ where: condition })
    .then((data) => {
      res.send(data)
      console.log(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Can not find",
      })
    })
}

exports.findByUserId = (req, res) => {
  const id = req.params.id

  Proposal.findAll({ where: { userId: id } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proposals.",
      })
    })
}

exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Proposal.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proposals.",
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  console.log('here' + id)

  Proposal.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Proposal with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Proposal with id=" + id,
      })
    })
}


exports.exportsProposals = async (req, res) => {
  const id = req.body.ids
  console.log(id)
  if (Array.isArray(id) && id.length === 0) {
    res.send('no')
    return
  }
  const proposal = await Proposal.findAll({
    where: {
      id: id,
    },
  })
  const fields = ['id', 'title', 'description', 'status', 'usersType', 'projectType', 'targetDevice', 'webServer', 'reference', 'createdAt', 'updatedAt']
  const csv = parse(proposal, { fields })
  console.log(csv)
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=projects.csv')
  res.send(csv)
}


exports.findUserInfoByUserId = (req, res) => {
  const id = req.params.id
  User.findAll({ where: { id: id } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proposals.",
      })
    })
}

exports.decline = async (req, res) => {
  const id = req.params.id
  const proposal = await Proposal.findByPk(id)
  if (!proposal) {
    res.status(404).send('Proposal not found')
  } else {
    await Proposal.update({ status: 'Decline' }, { where: { id } })
    res.status(200).send('Proposal status updated successfully')
  }
}

exports.accept = async (req, res) => {
  const id = req.params.id
  console.log(id)
  const proposal = await Proposal.findByPk(id)
  if (!proposal) {
    res.status(404).send('Proposal not found')
  } else {
    await Proposal.update({ status: 'Accept' }, { where: { id } })
    res.status(200).send('Proposal status updated successfully')
  }
}

exports.update = (req, res) => {
  const id = req.params.id

  Proposal.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Proposal was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Proposal with id=${id}. Maybe Proposal was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Proposal with id=" + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Proposal.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Proposal was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Proposal with id=${id}. Maybe Proposal was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Proposal with id=" + id,
      })
    })
}

exports.getUserByEmail = (req, res) => {
  User.findOne({
    where: {
      email: req.params.email,
    },
    attributes: ['id'],
  })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};




