const express = require("express");
// Import Moralis
const Moralis = require("moralis").default;
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 5000;

// Add a variable for the api key, address and chain
const MORALIS_API_KEY =
  "f3pTmwFHKJJ00wZfvNSQfQGwQM9c6kFA1CZiISy3IQBRC5HbfMNvEpA1ADwYM0oM";
const address = "0x5199d6204B788016353A201b8DAd4668a71F1A8a";
const chain = EvmChain.ETHEREUM;

app.get("/wallet/:walletAddress/:chain", async (req, res) => {
  try {
    // Get and return the crypto data
    const data = await getData();

    res.status(200);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

// Add this a startServer function that initialises Moralis
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

// Call startServer()
startServer();

//Getting the data (balance and price of the coin)
async function getData() {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });
  let token = tokenBalances.raw.filter((token) => token.possible_spam != true);
  for (let i = 0; i <= token.length; i++) {
    if (token[i]) {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address: token[i].token_address,
        chain,
      });
      token[i].price = response.raw.usdPrice;
    }
  }

  //Getting tokens balances

  return token;
}
