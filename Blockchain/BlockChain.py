from Block import Block


class BlockChain:

    def __init__(self):
        self.chain = [Block.genesis()]

    def addBlock(self, data):
        self.chain.append(Block.mineBlock(
            self.chain[len(self.chain) - 1], data))

    def isValidChain(self, chain):
        if (str(chain[0]) != str(Block.genesis())):
            return False
        for i in range(1, len(chain)):
            block = chain[i]
            lastBlock = chain[i-1]
            if(block.lastHash != lastBlock.currentHash or
               lastBlock.currentHash != Block.blockHash(lastBlock) or
               block.currentHash != Block.blockHash(block)):
                return False
        return True


#   blockChain.addBlock() metodu ile zincire yeni bloklar eklenebilir.

blockChain = BlockChain()
blockChain.addBlock("Efendi nasiboğlu sent 5 dollars to Uğur eliiyi")
blockChain.addBlock("Uğur eliiyi sent 5 dollars to Efendi nasiboğlu")
blockChain.addBlock("Donald trump sent 5 dollars to Efendi nasiboğlu")


for block in blockChain.chain:
    print(block)


if(blockChain.isValidChain(blockChain.chain)):
    print("true")
