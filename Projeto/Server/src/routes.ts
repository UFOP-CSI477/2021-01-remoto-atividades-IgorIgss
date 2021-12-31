import express from "express";

import ClassesController from "./controllers/ClassesController";

const routes = express.Router();
const classesControllers = new ClassesController();

routes.get("/vacancy", classesControllers.index);
routes.post("/vacancy", classesControllers.create);

export default routes;
