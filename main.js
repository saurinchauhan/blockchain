const SHA256 = require('crypto-js/sha256');
class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        } 

        console.log("Block mined: " + this.hash);
    }
}



class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5; 
    }

    createGenesisBlock() {
        return new Block(0, "2/5/2018", "Genesis","0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1;i<this.chain.length;i++) {
            const currentBlock = this.chain[i];
            const previousBlock= this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }            
        }
        return true;
    }
}

let saurinCoin = new BlockChain();
console.log('Minig block 1...');
saurinCoin.addBlock(new Block(1, "3/5/2018",{amount:5}));

console.log('Minig block 2...');
saurinCoin.addBlock(new Block(2, "12/5/2018",{amount:6}));

console.log('Minig block 3...');
saurinCoin.addBlock(new Block(3, "23/5/2018",{amount:7}));

console.log("Is blockchain vaild?");
console.log(saurinCoin.isChainValid());


/* 
saurinCoin.chain[1].data = {amount : 6};
saurinCoin.chain[1].hash = saurinCoin.chain[1].calculateHash();
*/
console.log("Is blockchain vaild?");
console.log(saurinCoin.isChainValid());


//console.log(JSON.stringify(saurinCoin, null, 4));