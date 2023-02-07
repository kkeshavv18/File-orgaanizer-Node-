let fs = require("fs");
let path = require("path");

function treeFn(directoryPath) {
  if (directoryPath == undefined) {
    // console.log("Kindly enter the path");
    treeHelper(process.cwd(), "");
    return;
  } else {
    let doesExist = fs.existsSync(directoryPath);
    if (doesExist) {
      treeHelper(directoryPath, "");
    } else {
      console.log("Plese enter the correct path.");
      return;
    }
  }
}
function treeHelper(direcPath, indent) {
  let isFile = fs.lstatSync(direcPath).isFile();
  if (isFile) {
    let fileName = path.basename(direcPath);
    console.log(indent + "|--FIle--" + fileName);
  } else {
    let dirName = path.basename(direcPath);
    console.log(indent + "|__Folder__" + dirName);
    let childrens = fs.readdirSync(direcPath);
    for (let i = 0; i < childrens.length; i++) {
      // console.log("Thease are the childrens ", childrens[i]);
      let childPath = path.join(direcPath, childrens[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}
module.exports = {
  treeKey: treeFn,
};
