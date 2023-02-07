function helpFn() {
  console.log(`
    List of all Commands:
    node 1-main.js tree "directoryPath"
    node 1-main.js organize "directoryPath"
    node 1-main.js help
    `);
}
module.exports = {
  helpKey: helpFn,
};
