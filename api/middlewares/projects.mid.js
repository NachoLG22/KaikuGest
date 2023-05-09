const Project = require("../models/project.model");
const createError = require("http-errors");

module.exports.exists = (req, res, next) => {
  const projectId = req.params.projectId || req.params.id;
  console.log(projectId);
  Project.findById(projectId)
    .then((project) => {
      if (project) {
        req.project = project;
        console.log(req.project);
        next();
      } else {
        next(createError(404, "Project not found"));
      }
    })
    .catch(next);
};

module.exports.checkOwner = (req, res, next) => {
  if (req.project.authors.toString() !== req.user.id.toString()) {
    next(createError(403, "Forbidden action"));
  } else {
    next();
  }
};
