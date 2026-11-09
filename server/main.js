import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { readFile } from "node:fs/promises";

dotenv.config({ quiet: true });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const publicPath = path.join(import.meta.dirname, "..", "public");


app.set("view engine", "html");
app.set("views", publicPath);

app.use('/assets', express.static(path.join(publicPath, 'assets')));

app.engine("html", async function (filePath, _options, callback) {
  try {

    const pagina = await readFile(filePath, "utf8");


    const headerPath = path.join(
      import.meta.dirname,
      "partials",
      "header.html"
    );

    const header = await readFile(headerPath, "utf8");


    const paginaCompleta = pagina.replace("<!-- shared-header -->", header);


    callback(null, paginaCompleta);

  } catch (erro) {
    callback(erro);
  }
});


app.get("/", function (_req, res) {
 res.render("index.html");
});

app.get("/1dsm", function (_req, res) {
  res.render("pages/1dsm.html");
});

app.get("/2dsm", function (_req, res) {
  res.render("pages/2dsm.html");
});

app.get("/3dsm", function (_req, res) {
  res.render("pages/3dsm.html");
});

app.get("/4dsm", function (_req, res) {
  res.render("pages/4dsm.html");
});

app.get("/5dsm", function (_req, res) {
  res.render("pages/5dsm.html");
});

app.get("/6dsm", function (_req, res) {
  res.render("pages/6dsm.html");
});

app.use(function (_req, res) {
  res.status(404).send("Página não encontrada");
});

app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
