const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function handleError(error) {
  throw new Error(chalk.red(error));
}

function extractLinks(text) {
  const regex = /\[([^\]]*)]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const linksExtracteds = [];
  let temp;

  while ((temp = regex.exec(text)) !== null) {
    const [_, key, link] = temp;
    linksExtracteds.push({ [key]: link });
  }

  return linksExtracteds.length ? linksExtracteds : "There are no links";
}

async function readFile(filePath) {
  const absoluteFilePath = path.join(__dirname, filePath);
  try {
    const encoding = "utf-8";
    const dirContent = await fs.promises.readdir(absoluteFilePath, encoding);

    const result = Promise.all(
      dirContent.map(async (file) => {
        const content = await fs.promises.readFile(
          `${filePath}/${file}`,
          encoding
        );
        return extractLinks(content);
      })
    );

    return result;
  } catch (error) {
    handleError(error);
  } finally {
    console.log(chalk.yellow("Operation finished"));
  }
}

module.exports = readFile;
