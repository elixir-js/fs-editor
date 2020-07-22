import express from "express";
import * as path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import * as fs from "fs";

const app = express();

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/static", express.static(path.resolve(__dirname, "../../files")))
  .get("/", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../../files/index.html"));
  })
  .post("/writeFIle", (req, res) => {
    fs.writeFile(
      path.resolve(__dirname, "../../files/main.js"),
      req.body.outputText,
      function (err) {
        if (err) {
          return console.log(err);
        }
        res.send("Hello world");
      }
    );
  });

app.listen(3000, () => {
  console.log("Launched");
});
