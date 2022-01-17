//create express api
const express = require("express");
const app = express();
//configure app port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API is Up and Running mate! Ahoy!");
});
//configure app to use json
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to the API" });
});

app.post("/shorten", (req, res) => {
  console.log(req.body);
  const { url } = req.body;
  //todo make short url from seed url

  //todo assemble object

  //todo persist on mongo

  return res.status(200).send({ url: url });
});
