//create express api
const express = require("express");
const shortid = require("shortid");
const connectDB = require("./data/db.config");
const app = express();
const utils = require("./utils/utils");
const Url = require("./data/models/url");
const { endOfDay, parseISO, format, startOfDay } = require("date-fns");
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

app.get("/short/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let exists = await Url.findOne({ urlId: id }).exec();
    if (exists) {
      return res.status(200).send({
        message: "URL found",
        shortUrl: exists.shortUrl,
        seedUrl: exists.seedUrl,
      });
    } else {
      return res.status(404).send({
        message: "URL not found in database",
      });
    }
  } catch (e) {}
});
app.get("/shortenedAt/:date", async (req, res) => {
  const { date } = req.params;
  try {
    let exists = await Url.find({
      createdAt: {
        $gte: startOfDay(parseISO(date)),
        $lte: endOfDay(parseISO(date)),
      },
    }).exec();
    if (exists) {
      return res.status(200).send({
        message: `URLs shortened at ${date}`,
        urls: exists,
      });
    } else {
      return res.status(404).send({
        message: "URLs not found in database",
      });
    }
  } catch (e) {}
});
