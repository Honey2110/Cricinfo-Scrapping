const request = require("request");
const cheerio = require("cheerio");
const scorecardObj = require("./scorecarddetails")

function GetAllMatchesLink(url) {
  request(url, function (err, res, html) {
    if (err) {
      console.log(err);
    } else {
      getlinkforhome(html);
    }
  });
}

function getlinkforhome(html) {
  let $ = cheerio.load(html);
  let scorecardElem = $(
    ".ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent>a"
  );
  //   console.log(scorecardElem.length);
  for (let i = 0; i < scorecardElem.length; i++) {
    let link = $(scorecardElem[i]).attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    // console.log(fullLink);
    scorecardObj.ps(fullLink)
  }
}

module.exports = {
  gAllMatches: GetAllMatchesLink,
};
