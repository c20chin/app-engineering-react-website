const db = require("../models");
const OrgInfo = db.orgInfo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  // Create a OrgInfo
  const orgInfo = {
    orgName: req.body.orgName,
    intro: req.body.intro,
    address: req.body.address,
    contactName: req.body.contactName,
    jobTitle: req.body.jobTitle,
    userID: req.body.userID,
    contactEmail: req.body.contactEmail,
    contactPhone: req.body.contactPhone,
  };

  // Save OrgInfo in the database
  OrgInfo.create(orgInfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrgInfo.",
      });
    });
};

exports.findByUserId = (req, res) => {
  const id = req.params.id;

  OrgInfo.findAll({ where: { userId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orgInfos.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  OrgInfo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orgInfos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  OrgInfo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find OrgInfo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving OrgInfo with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  OrgInfo
    .update(req.body, {
      where: { userID: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "orgInfo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update orgInfo with id=${id}. Maybe orgInfo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating orgInfo with id=" + id,
      });
    });
};
