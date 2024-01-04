const fs = require("fs");
const xlsx = require("xlsx")

// // ONE way to  read and write file
// // let Buffer = fs.readFileSync("./example.json");
// // // console.log(Buffer);

// // let data = JSON.parse(Buffer);
// // console.log(data);

// // another way 
let data = require("./example.json");
const { execFileSync } = require("child_process");

// data.push({
//     "name": "England",
//     "last Name": "Peter",
//     "isAvenger": true,
//     "friends": [
//         "Bruce",
//         "Neter",
//         "Natasha"
//     ],
//     "age": 10,
//     "address": {
//         "city": "New York",
//         "state": "manhatten"
//     }

// });

// let Strdata = JSON.stringify(data);
// //  fs.writeFileSync("example.json", Strdata);


// learning how to put data in excel files

// to write data 
// things require  wb -> filepath , ws = name , json data 
// // new Workbook 
// let newWb = xlsx.utils.book_new();
// // convert json data -> excel format 
// let newWS = xlsx.utils.json_to_sheet(data);
// // append newwb,ws,sheet name
// xlsx.utils.book_append_sheet(newWb, newWS, "SHEET-1");
// // write workbook into our fs -> file path 
// xlsx.writeFile(newWb, "abc.xlsx")


function excelWriter(filepath, json, sheetName) {
    let newWb = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWb, newWS, sheetName);
    xlsx.writeFile(newWb, filepath)
}

// // to read data
// // workbook to select require filepath 
// let WB = xlsx.readFile("abc.xlsx");
// // sheet to read require sheet path
// let exceldata = WB.Sheets["SHEET-1"];
// // sheet data to get print print
// let ans = xlsx.utils.sheet_to_json(exceldata);

function excelReader(filepath, sheetName) {
    if (fs.existsSync(filepath) == false) {
        return [];
    }
    let WB = xlsx.readFile(filepath);
    let exceldata = WB.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(exceldata);
    return ans;
}