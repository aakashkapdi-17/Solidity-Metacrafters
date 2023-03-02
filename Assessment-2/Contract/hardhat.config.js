require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();

const APIKEY = process.env.REACT_APP_API_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

module.exports = {
  networks: {
    goelri: {
      url: `https://eth-goerli.g.alchemy.com/v2/${APIKEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.17",
};
