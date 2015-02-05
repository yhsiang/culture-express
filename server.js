import express from "express";
import rss from "./api/rss";
var port = process.env.PORT || 8080;
var app = express();

app.use(rss);

app.listen(port, () => {
  console.log(`Server Listen on ${port}`)
});