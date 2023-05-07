const ethers = require("ethers");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/blockchain-watcher");

// Create the Block schema
const BlockSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  block_hash: { type: String, required: true },
  prev_hash: { type: String, required: true },
  timestamp: { type: Date, required: true },
  process: { type: Number, default: 0 },
});

// Create the Transaction schema
const TransactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  tx_hash: { type: String, required: true },
  from_address: { type: String, required: true },
  to_address: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

// Create the Block model
const Block = mongoose.model("Block", BlockSchema);

// Create the Transaction model
const Transaction = mongoose.model("Transaction", TransactionSchema);

// Create the Metamask wallet
const mnemonic =
  "report slender song fault addict shock purpose weird crime blush stage blanket";
const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(
  new ethers.providers.JsonRpcProvider("https://sepolia.testnet.ethereum.org")
);

// Generate 100 new addresses from the wallet
const addresses = Array.from(Array(100).keys()).map(
  (i) => wallet.derivePath(`m/44'/60'/0'/0/${i}`).address
);

// Listen for new blocks and transactions
const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.testnet.ethereum.org"
);
provider.on("block", async (blockNumber) => {
  const block = await provider.getBlock(blockNumber);
  const timestamp = new Date(block.timestamp * 1000);

  // Insert the block into the database
  const existingBlock = await Block.findOne({ id: block.number });
  if (!existingBlock) {
    const newBlock = new Block({
      id: block.number,
      block_hash: block.hash,
      prev_hash: block.parentHash,
      timestamp,
    });
    await newBlock.save();
  }

  // Check each transaction in the block
  for (const tx of block.transactions) {
    const txInfo = await provider.getTransaction(tx);

    // If the transaction is to one of our addresses, insert it into the database
    if (addresses.includes(txInfo.to)) {
      const existingTx = await Transaction.findOne({ tx_hash: tx });
      if (!existingTx) {
        const newTx = new Transaction({
          id: Date.now(),
          tx_hash: tx,
          from_address: txInfo.from,
          to_address: txInfo.to,
          amount: ethers.utils.formatEther(txInfo.value),
          timestamp,
        });
        await newTx.save();
      }
    }
  }
});

// Start the provider
provider.start();
