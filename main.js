const express = require("express");
const app = express();
const routes = require("./src/routes");
const Blockchain = require("./src/blockchain");
const bc = new Blockchain();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const nodeId = 1;

app.get("/mining", (req, res) => {

    let lastBlock = bc.getLastBlock();
    let lastProof = bc.getLastBlock().proof;
    let proof = bc.proofOfWork(lastProof);


    bc.newTransaction("0", nodeId, 1);

    let prevHash = bc.hash(lastBlock);
    let block = bc.newBlock(proof, prevHash);

    res.status(200);

    res.json(block);
});

app.post("/transaction", (req, res) => {

    //TODO: check input data

    let transaction = {
        sender: req.body.sender,
        recipient: req.body.recepient,
        amount: req.body.amount
    };

    bc.newTransaction(transaction.sender, transaction.recipient, transaction.amount);

    res.status(200);
    res.send("Transaction confirmed");
});

app.get("/chain", (req, res) => {

    res.cookie("Content-Type", "application/json");
    let chain = bc.getChain();
    res.json(chain);
});

app.listen(8080, () => {
    console.log("API is running");
});





