const request = require("request");
const cheerio = require("cheerio");
const AllMatchObj = require("./AllMatch");
const url =
  "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038";

request(url, cb);

function cb(err, res, html) {
  if (err) {
    console.log(err);
  } else {
    extractlink(html);
  }
}

function extractlink(html) {
  let $ = cheerio.load(html);
  let link = $("a[title='View All Results']").attr("href");
  let fullLink = "https://www.espncricinfo.com" + link;
  AllMatchObj.gAllMatches(fullLink);
  // console.log(fullLink);
}
