import express from "express";
import { connectToDb } from "./src/config/db.config.js";
import projectRouter from "./src/routes/project.routes.js";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(expressEjsLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// use express router
app.use('/', projectRouter);

app.listen(8000, async () => {
    await connectToDb();
    console.log(`Server is listening on port 8000`);
});
