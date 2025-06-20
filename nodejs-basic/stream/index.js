const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./input.txt");
const filePath2 = path.resolve(__dirname, "./output.txt");

const readableStream = fs.createReadStream(filePath, {
  highWaterMark: 15,
});
const writableStream = fs.createWriteStream(filePath2);

readableStream.on("data", (chunk) => {
  writableStream.write(chunk + "\n");
});

readableStream.on("end", () => {
  writableStream.end();
  console.log("Done!");
});
