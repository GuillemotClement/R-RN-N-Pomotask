import express from "express";
import path from "node:path";
import { handleCreateUser, handleLoginUser } from "./controllers/auth.js";
import { errorMiddleware } from "./middlewares/handleError.js";
import { handleCreateTask, handleListTask, handleSetStatutTask } from "./controllers/tasks.js";
import cors from "cors";
import { checkToken } from "./middlewares/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

const staticPath = path.resolve("src/static");
const distPath = path.resolve("dist/static");

app.use("/", express.static(staticPath)); // permet de servir les fichier statiques
app.use("/js", express.static(distPath)); // permet de servir le ts compiler pour les fichiers statiques.

app.post("/register", handleCreateUser);
app.post("/login", handleLoginUser);

app.post("/tasks", checkToken, handleCreateTask);
app.get("/tasks", checkToken, handleListTask);
app.put("/tasks/status/:id", checkToken, handleSetStatutTask);

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log("Serveur is listen on http://localhost:8080");
});
