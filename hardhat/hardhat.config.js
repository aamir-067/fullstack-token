require("@nomicfoundation/hardhat-toolbox");
const { API_URL, PRIVATE_KEY  } = require("./secrets.json");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks : {
    sepolia : {
      accounts : [PRIVATE_KEY],
      url : API_URL
    }
  }
};
