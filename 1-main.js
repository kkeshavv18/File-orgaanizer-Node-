#!/usr/bin/env node
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");

//process.argv is used to create an array of command we input. The array of command is stored in variable "inputArr" in below case.
let inputArr = process.argv.slice(2);
//Here we use slice(2) because the first 2 index of inputArr array contains commands "node" and "1-main.js" which we donot need. so we slice them and make an array of remaining input.
// console.log(inputArr);

let command = inputArr[0];
// console.log(command);
let dirPath = inputArr[1];
// console.log(dirPath);

switch (command) {
  case "tree":
    treeObj.treeKey(dirPath);
    break;
  case "organize":
    organizeObj.organizeKey(dirPath);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("Please enter the right command.");
    break;
}

// help function implememnted
function helpFn() {
  console.log(`
  List of all Commands:
  node 1-main.js tree "directoryPath"
  node 1-main.js organize "directoryPath"
  node 1-main.js help
  `);
}
