//create express api
const express = require("express");
const shortid = require("shortid");
const connectDB = require("./data/db.config");
const app = express();
const utils = require("./utils/utils");
const Url = require("./data/models/url");
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
  const urlId = shortid.generate();
  if (utils.validateUrl(url)) {
    try {
      let exists = await Url.findOne({ seedUrl: url }).exec();
      console.log(exists);
      if (exists) {
        return res.status(200).send({
          message: "URL already exists",
          urlId: exists.url,
        });
      } else {
        const shortUrl = `${process.env.BASE_URL}/${urlId}`;
        console.log(shortUrl);
        exists = Url({
          seedUrl: url,
          shortUrl,
          urlId,
          createdAt: Date.now(),
        });
        await exists.save();
        return res.status(200).send({
          message: "URL created successfully",
          urlId: exists.urlId,
          shortUrl: shortUrl,
        });
      }
    } catch (e) {}
  }
});
