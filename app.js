const express = require("express");
const app = express();
const scrapSite = require("./scraper");

app.get("/deals", async function (req, res) {
  const result = await scrapSite();
  res.status(200).json(result);
});

app.listen(3000, () => {
  console.log("Application listening on port 3000");
});
