from Transaction import Transaction


class Wallet:
    def __init__(self):
        self.publicKey = hex(123456789)

    def createTransaction(self, recipient, data):
        transaction = Transaction.newTransaction(self, recipient, data)
        return transaction



