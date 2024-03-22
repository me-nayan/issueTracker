import express from "express";
import { homeController } from "../controllers/home.controller.js";
import { createProject, getProject, createIssue } from "../controllers/project.controller.js";

const router = express.Router();

// route for home page
router.route('/').get(homeController);

// route to create project
router.route('/project/create').post(createProject);

// route to get a project
router.route('/project/:id').get(getProject);

// route to create issue
router.route('/project/:id').post(createIssue);

export default router;

