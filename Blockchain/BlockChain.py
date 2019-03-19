from Block import Block

class BlockChain:
    
    def __init__(self):
        self.chain = [Block.genesis()]

    def addBlock(self , data):
       self.chain.append(Block.mineBlock(self.chain[len(self.chain) - 1] , data))

#   blockChain.addBlock() metodu ile zincire yeni bloklar eklenebilir.

blockChain = BlockChain()
blockChain.addBlock("Efendi nasiboğlu sent 5 dollars to Uğur eliiyi")
blockChain.addBlock("Uğur eliiyi sent 5 dollars to Efendi nasiboğlu")
blockChain.addBlock("Donald trump sent 5 dollars to Efendi nasiboğlu")

for block in blockChain.chain: 
    print(block)