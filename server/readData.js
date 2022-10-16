const excelToJson = require("convert-excel-to-json");

const data = excelToJson({
  sourceFile: "data.xlsx",
  header: {
    rows: 1
  },
  columnToKey: {
    "*": "{{columnHeader}}"
  },
  sheets: [
    {
      name: "home"
    },
    {
      name: "about"
    },
    {
      name: "contact"
    }
  ]
});

module.exports = data;