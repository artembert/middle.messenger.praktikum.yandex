const express = require("express");
const path = require("path");

const PORT = 3000;
const ARTIFACTS_FOLDER = "dist";
const INDEX_HTML = "index.html";

const app = express();

app.use(express.static(path.join(__dirname, ARTIFACTS_FOLDER)));
app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, ARTIFACTS_FOLDER, INDEX_HTML));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
