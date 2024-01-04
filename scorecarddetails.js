const request = require("request");
const cheerio = require("cheerio");

const url =
  "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/gujarat-titans-vs-chennai-super-kings-final-1370353/full-scorecard";

function processURL(url) {
  request(url, cb);
}

function cb(err, res, html) {
  if (err) {
    console.log(err);
  } else {
    extractMatchDetails(html);
  }
}

function extractMatchDetails(html) {
  let $ = cheerio.load(html);
  let descelem = $(
    ".ds-grow .ds-text-tight-m.ds-font-regular.ds-text-typo-mid3"
  );
  let result = $(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo");
  let strArr = descelem.text().split(",");
  let Venue = strArr[1].trim();
  let Date = (strArr[2] + strArr[3]).trim();
  result = result.text().trim();
  let innings = $(".ds-rounded-lg.ds-mt-2");
  for (let i = 0; i < innings.length; i++) {
    let TeamName = $(innings[i])
      .find(".ds-text-title-xs.ds-font-bold.ds-capitalize")
      .text()
      .trim();

    let OpponentIndex = i == 0 ? 1 : 0;

    let OpponentName = $(innings[OpponentIndex])
      .find(".ds-text-title-xs.ds-font-bold.ds-capitalize")
      .text()
      .trim();

    console.log(`${OpponentName} ${TeamName}, ${Venue}, ${Date}, ${result}`);

    let allrows = $(
      ".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody>tr"
    );

    for (let j = 0; j < allrows.length; j++) {
      const allcols = $(allrows[j]).find("td");
      if (allcols.length == 8) {
        // console.log(allcols.text());
        let PlayerName = $(allcols[0]).text().trim();
        let runs = $(allcols[2]).text().trim();
        let balls = $(allcols[3]).text().trim();
        let fours = $(allcols[5]).text().trim();
        let sixes = $(allcols[6]).text().trim();
        let strike_rate = $(allcols[7]).text().trim();
        console.log(
          `${PlayerName} made runs ${runs}, ${balls}  in balls with ${fours} fours and ${sixes} sixes with strike-rate of ${strike_rate}`
        );
      }
    }
  }
}

module.exports = {
  ps: processURL,
};
