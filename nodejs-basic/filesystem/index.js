const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "todo.txt");

const data = fs.readFileSync(filePath, "UTF-8");
console.log(data);
