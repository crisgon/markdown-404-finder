#!/usr/bin/env node

const chalk = require("chalk");

const readFile = require("./index.js");
const validateLinks = require("./http-validation.js");
const nodeArgv = process.argv;

async function processText(argv) {
  const filePath = argv.find((a) => a.includes("path"));
  const pathNormalized = filePath ? filePath.split("=") : [];
  const validate = argv.some((arg) => arg === "validate");

  if (!pathNormalized.length) {
    console.log(chalk.red("File path not informed"));
    return;
  }

  const result = await readFile(pathNormalized[1]);

  if (validate) {
    console.log(chalk.green("Files validated"), await validateLinks(result));
    return;
  }

  console.log(chalk.green("Files"), result);
}

processText(nodeArgv);
