import mongoose from "mongoose";
import { projectSchema } from "../models/project.schema.js";
import { issueSchema } from "../models/issue.schema.js";

const projectModel = mongoose.model('Project', projectSchema);
const issueModel = mongoose.model('Issue', issueSchema);

//const { findById } = require('../models/project');

// create a project for the user
export const createProject = async function (req, res) {
  try {
    projectModel.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    });
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};

// find project and display it in the project page
export const getProject = async function (req, res) {
  try {
    let project = await projectModel.findById(req.params.id).populate({
      path: 'issues',
    });
    if (project) {
      return res.render('projectPage', {
        title: 'Project Page',
        project,
      });
    }
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};

// create issue
export const createIssue = async function (req, res) {
  try {
    let project = await projectModel.findById(req.params.id);
    if (project) {
      let issue = await issueModel.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });
      project.issues.push(issue);

      if (!(typeof req.body.labels === 'string')) {
        for (let label of req.body.labels) {
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }
      await project.save();
      return res.redirect(`back`);
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    return res.redirect('back');
  }
};
