const db = require("../models")
const Projects = db.project
const Op = db.Sequelize.Op
const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express')
const crypto = require('crypto')
const { parse } = require('json2csv')
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }

  // Create a projects
  const projects = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
    link: req.body.link,
    partner: req.body.partner,
    media: req.body.media,
    partnerType: req.body.partnerType,
    category: req.body.category
  }
  console.log(projects)

  // Save projects in the database
  Projects
    .create(projects)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the projects.",
      })
    })
}

exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Projects
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

  Projects
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
  console.log("update +++")
  console.log(id)
  console.log(req.body)
  Projects
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
  Projects
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

exports.findByTitle = (req, res) => {
  const title = req.params.title
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null
  Projects.findAll({ where: condition })
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


exports.exportsProjects = async (req, res) => {
  const id = req.body.ids
  console.log(id)
  if (Array.isArray(id) && id.length === 0) {
    res.send('no')
    return
  }
  const project = await Projects.findAll({
    where: {
      id: id,
    },
  })
  const fields = ['id', 'title', 'media', 'year', 'views', 'link', 'partner', 'description', 'createdAt', 'updatedAt']
  const csv = parse(project, { fields })
  console.log(csv)
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=projects.csv')
  res.send(csv)
}

exports.importProjects = async (req, res) => {
  try {
    const num = req.body
    const projectsArray = num.map((pp) => ({
      title: pp.title,
      description: pp.description,
      year: pp.year,
      link: pp.link,
      partner: pp.partner,
      media: pp.media,
      partnerType: pp.partnerType,
      category: pp.category
    }))
    console.log(projectsArray)

    for (const project of projectsArray) {
      console.log("front")
      await Projects.create(project)
      console.log("back")
    }
  } catch {
    res.send({ message: `error`, })
  }
}

exports.changeFeature = async (req, res) => {
  const what = req.params.what
  const id = req.params.id
  console.log(what)
  console.log(id)
  try {
    if (what === 'False') {
      await Projects.update(
        { feature: 'False' },
        { where: { id: id }, }
      )
      res.send({
        message: `ok`,
      })
    } else {
      const count = await Projects.count({
        where: { feature: 'True' }
      })
      console.log("count = " + count)
      if (count >= 2) {
        res.send({
          message: `no`,
        })
      } else {
        await Projects.update(
          { feature: 'True' },
          { where: { id: id }, }
        )
        res.send({
          message: `ok`,
        })
      }
    }
  } catch {
    console.log("error")
  }
}

exports.changePublish = async (req, res) => {
  const what = req.params.what
  const id = req.params.id
  console.log(what)
  console.log(id)
  try {
    if (what === 'False') {
      await Projects.update(
        { publish: 'False' },
        { where: { id: id }, }
      )
      res.send({
        message: `ok`,
      })
    } else {
      await Projects.update(
        { publish: 'True' },
        { where: { id: id }, }
      )
      res.send({
        message: `ok`,
      })

    }
  } catch {
    console.log("error")
  }
}


exports.incrementViewCount = (req, res) => {
  const id = req.params.id

  Projects.findByPk(id)
    .then((project) => {
      if (project) {
        project.views += 1
        project
          .save()
          .then((updatedProject) => {
            res.send({ views: updatedProject.views })
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating view count for project with id=" + id,
            })
          })
      } else {
        res.status(404).send({
          message: `Cannot find project with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving project with id=" + id,
      })
    })
}
