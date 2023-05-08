const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  // ...
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider("", "8d32b66208044b5f9a1399bd6a52a50f"),
      network_id: "11155111",
      gas: 4465030,
    },
    // ...
  },
  // ...
};
