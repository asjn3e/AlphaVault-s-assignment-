const ethers = require('ethers');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blockchain-watcher');

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
const Block = mongoose.model('Block', BlockSchema);

// Create the Transaction model
const Transaction = mongoose.model('Transaction', TransactionSchema);
