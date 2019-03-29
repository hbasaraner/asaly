from Block import Block


class BlockChain:

    def __init__(self):
        self.chain = [Block.genesis()]

    def addBlock(self, data):
        block = Block.mineBlock(
            self.chain[len(self.chain) - 1], data)
        self.chain.append(block)
        return block

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
