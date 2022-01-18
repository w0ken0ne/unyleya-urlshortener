//create express api
const express = require("express");
const connectDB = require("./data/db.config");
const app = express();
const utils = require("./utils/utils");
//configure app port
const port = process.env.PORT || 3000;
connectDB();

app.listen(port, () => {
  console.log("API is Up and Running mate! Ahoy!");
});
//configure app to use json
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to the API" });
});

app.post("/short", async (req, res) => {
  const { url } = req.body;
  if (utils.validateUrl(url)) {
    try {
      let url = await Url.findOne({ seedUrl: url });
      if (url) {
        return res.status(200).send({
          message: "Url already has been shortened",
          url: url.shortUrl,
        });
      }
    } catch (e) {}
  }
});
