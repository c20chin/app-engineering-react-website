const db = require("../models");
const webConfig = db.webConfig;
const User = db.user;
const Op = db.Sequelize.Op;



exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  webConfig.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  webConfig.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id,
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    webConfig
      .update(req.body, {
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Data was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating data with id=" + id,
        });
      });
  };