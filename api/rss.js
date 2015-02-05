import {Router} from "express";
import request from "request";
import cheerio from "cheerio";
import _ from "lodash";
import RSS from "rss";

var url = 'http://cultureexpress.taipei/eventstype.aspx';
var rss = Router();
var feed = new RSS({
    title: '文化快遞活動',
    description: '活動專區',
    ttl: '60',
});

rss.get('/', (req, res) => {
  request.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36"
    }
  },(err, response, body) => {
    var $ = cheerio.load(body);
    var row = $('.listTable tr');
    var list = _.chunk(row.children('td').map((i, e) => {return $(e).text().trim();}).toArray(), 4);
    var session, title, category, location;
    list.forEach((item, index) => {
      [session, title, category, location] = item;
      feed.item({
        title: title,
        description: session + ' ' + location,
        categories: [category]
      });
    });
    res.send(feed.xml());

  });
});

export default rss;