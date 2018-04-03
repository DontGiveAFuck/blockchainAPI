module.exports = {

    create: function () {

        this.chain = [];
        this.currentTransaction = [];
        //  this.lastBlock;

        this.newBlock()
    },

    newBlock: function (proof, prevHash = null) {

        var block = {
            index: this.chain.length + 1,
            timestamp: new Date.now(),
            transactions: this.currentTransaction,
            proof: proof,
            prevHash: prevHash || this.hash(this.chain[-1])
        };

        this.currentTransaction = [];

        this.chain.push(block);
        return block;

    },

    newTransaction: function (sender, recipient, amount) {
        this.currentTransaction.push({
            sender: sender,
            recipient: recipient,
            amount: amount
        });

        this.lastBlock.index++;
    },

    hash: function () {

    },

};