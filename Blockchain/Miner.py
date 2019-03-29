from Block import Block
from BlockChain import BlockChain
from Wallet import Wallet


class Miner:
    def __init__(self, blockChain):
        self.blockChain = blockChain

    def mine(self, transactions):
        self.transactions = transactions
        block = self.blockChain.addBlock(transactions)
        return block


blockChain = BlockChain()
miner = Miner(blockChain)
wallet = Wallet()
recipientWallet = Wallet()
recipientWallet.publicKey = hex(987654321)

# Yeni transaction oluşturma yolu
transaction1 = wallet.createTransaction(recipientWallet, {
    "10 adet çadır", "50 adet künefe", "20 adet sprite"
})

transaction2 = wallet.createTransaction(recipientWallet, {
    "2 adet çadır", "elma", "şeker"
})

# Transactionlardan block mine edilmesi
minedBlock = miner.mine(
    {"transactions": [transaction1.toDict(), transaction2.toDict()]})


for block in blockChain.chain:
    print(block)
