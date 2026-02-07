import express from "express";
import { MahasiswaController } from "../controllers/mahasiswa.controller";
import { MahasiswaRepository } from "../repositories/mahasiswa.repository";
import { MahasiswaService } from "../services/mahasiswa.service";

const route = express.Router();

const repository = new MahasiswaRepository();
const service = new MahasiswaService(repository);
const controller = new MahasiswaController(service);

route.post("/", controller.create);
route.patch("/:id", controller.update);
route.delete("/:id", controller.remove);
route.get("/average", controller.getAverage);

export default route;
