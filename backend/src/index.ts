import express from "express";
import path from "node:path";
import { handleCreateUser } from "./controllers/auth.js";

const app = express();

app.use(express.json());

const staticPath = path.resolve("src/static");
const distPath = path.resolve("dist/static");

app.use("/", express.static(staticPath)); // permet de servir les fichier statiques
app.use("/js", express.static(distPath)); // permet de servir le ts compiler pour les fichiers statiques.

app.post("/register", handleCreateUser);

app.listen(8080, () => {
  console.log("Serveur is listen on http://localhost:8080");
});
