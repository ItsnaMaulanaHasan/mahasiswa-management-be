import express from "express";
import * as controller from "../controllers/mahasiswa.controller";

const route = express.Router();

route.post("/", controller.create);
route.patch("/:id", controller.update);
route.delete("/:id", controller.remove);
route.get("/average", controller.getAverage);

export default route;
