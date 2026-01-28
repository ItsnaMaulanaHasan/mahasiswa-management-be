import "dotenv/config";
import express from "express";
import { sequelize } from "./models";
import mahasiswaRoutes from "./routes/mahasiswa.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running well!",
  });
});

app.use("/mahasiswa", mahasiswaRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

export default app;
