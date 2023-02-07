let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv", "jpg", "jpeg"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "txt",
    "ps",
    "tex",
    "odg",
    "odf",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};
function organizeFn(directoryPath) {
  // console.log("Organize function implemented for ", directoryPath);
  //pseudo code for this function
  // 1. input -> directory path given
  // create a directory having name organized_files inside the directory which is taken input as aggument and create the folders of categoirs inside that directory.
  // identify categories of all files present in that input directory i.e directoryPath
  // copy/cut files to that organized directory inside of any of category folder.
  let destPath;
  if (directoryPath == undefined) {
    // console.log("Kindly enter the path");

    let directoryPath = process.cwd();
    destPath = path.join(directoryPath, "organized_files");
    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
      // console.log(destPath);
      // return;
    } else {
      let doesExist = fs.existsSync(directoryPath);
      if (doesExist) {
        destPath = path.join(directoryPath, "organized_files");
        if (fs.existsSync(destPath) == false) {
          fs.mkdirSync(destPath);
        }
        // console.log("The given path exists");
      } else {
        console.log("Plese enter the correct path.");
        return;
      }
    }
    organizeHelper(directoryPath, destPath);
  }
}

function organizeHelper(src, dest) {
  let fileNames = fs.readdirSync(src);
  // console.log(fileNames);
  for (let i = 0; i < fileNames.length; i++) {
    let fileAddress = path.join(src, fileNames[i]);
    let isFile = fs.lstatSync(fileAddress).isFile();

    if (isFile) {
      // console.log(fileNames[i]);
      let category = getCategory(fileNames[i]);
      if (category != undefined) {
        console.log(fileNames[i], "belongs to ", category);
        sendFiles(fileAddress, dest, category);
      }
      // console.log(fileNames[i], "belongs to ", category);
      // sendFiles(fileAddress, dest, category);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    let cTypeArr = types[type];
    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return type;
      }
    }
  }
}
function sendFiles(srcFilePath, destFiles, categoryFiles) {
  let categoryPath = path.join(destFiles, categoryFiles);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  // console.log(srcFilePath);
  fs.copyFileSync(srcFilePath, destFilePath);
  console.log(fileName, "copied to ", categoryPath);
}

module.exports = {
  organizeKey: organizeFn,
};
