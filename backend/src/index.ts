import express from "express";
import path from "node:path";

const app = express();

const staticPath = path.resolve("src/static");
const distPath = path.resolve("dist/static");

app.use("/", express.static(staticPath)); // permet de servir les fichier statiques
app.use("/js", express.static(distPath)); // permet de servir le ts compiler pour les fichiers statiques.

app.listen(8080, () => {
  console.log("Serveur is listen on http://localhost:8080");
});
