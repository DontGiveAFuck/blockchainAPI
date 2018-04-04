var crypto = require("crypto");

module.exports = class Blockchain {

    constructor() {
        this.chain = [];
        this.currentTransaction = [];

        /***
         *genesis block creation
         *params: proof = 100, prevHash = 1
         */
        ;

        console.log(this.newBlock(100, 1));
    }

    getChain() {
        return this.chain;
    }

    newBlock(proof, prevHash) {

        var block = {
            index: this.chain.length + 1,
            timestamp: Date.now().toString(),
            transactions: this.currentTransaction,
            proof: proof,
            prevHash: prevHash || this.hash(this.chain[this.chain.length - 1])
        };

        this.currentTransaction = [];

        this.chain.push(block);
        return block;
    }

    newTransaction(sender, recipient, amount) {

        this.currentTransaction.push({
            sender: sender,
            recipient: recipient,
            amount: amount
        });

        return this.getLastBlock().index + 1;
    }

    hash(block) {
        console.log(block);
        var pwd = JSON.stringify(block);
        var key = crypto.createHash('sha256').update(pwd).digest('hex');
        return key;
    }

    proofOfWork(lastProof) {

        var proof = 0;
        while(!this.proofValidation(lastProof, proof)) {
            proof++;
        }

        return proof;
    }

    proofValidation(last_proof, proof) {

        var attemption = (last_proof.toString() + proof.toString());
        var attemptionHash = crypto.createHash('sha256').update(attemption).digest('hex');

        return attemptionHash.substr(attemptionHash.length - 3) == "000";
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

};



