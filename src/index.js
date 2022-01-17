//create express api
const express = require("express");
const app = express();
//configure app port
const port = process.env.PORT || 3000;
//import valid-url
const validUrl = require("valid-url");

app.listen(port, () => {
  console.log("API is Up and Running mate! Ahoy!");
});
//configure app to use json
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to the API" });
});

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  //todo verify if url is valid
  if (!validUrl.isUri(url)) {
    return res.status(400).send({ error: "Invalid URL" });
  }
  //todo make short url from seed url

  //todo assemble object

  //todo persist on mongo

  return res.status(200).send({ url: url });
});
