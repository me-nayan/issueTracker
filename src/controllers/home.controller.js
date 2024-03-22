import mongoose from "mongoose";
import { projectSchema } from "../models/project.schema.js";

const projectModel = mongoose.model('Project', projectSchema);
export const homeController = async function (req, res) {
  try {
    let projects = await projectModel.find({}).sort('-createdAt');
    return res.render('home', {
      title: 'Issue/Bug Tracker | Home',
      projects,
    });
  } catch {
    console.log('Error', err);
    return;
  }
};
