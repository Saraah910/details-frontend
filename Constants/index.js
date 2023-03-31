const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const contractAbi = require("./abi.json")
console.log(typeof contractAbi)
console.log(typeof contractAddress)
module.exports = {
    contractAddress,
    contractAbi
}