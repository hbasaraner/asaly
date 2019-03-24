from Transaction import Transaction


class Wallet:
    def __init__(self):
        self.publicKey = hex(123456789)

    def createTransaction(self, recipient, data):
        transaction = Transaction.newTransaction(self, recipient, data)
        return transaction


wallet = Wallet()
recipientWallet = Wallet()
recipientWallet.publicKey = hex(987654321)
transaction = wallet.createTransaction(recipientWallet, {
    "10 adet çadır", "50 adet künefe", "20 adet sprite"
})

#   Transaction Test
print(transaction.id)
print(transaction.input)
print(transaction.outputs)
