const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { printToPdfFromString } = require("./print-to-pdf");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const port = 3000;

app.post("/render-pdf", async (request, response) => {
  html = request.body.html;
  const pdfBuffer = await printToPdfFromString(html);
  console.log("print to pdf");
  response.send({
    pdfBuffer: pdfBuffer
  });
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
