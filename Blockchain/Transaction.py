import time

class Transaction:
    def __init__(self):
        self.id = "deneme"
        self.input = None
        self.outputs = []

    @staticmethod
    def newTransaction(senderWallet, recipient, data):
        transaction = Transaction()
        transaction.outputs.append(data)
        Transaction.signTransaction(transaction, senderWallet)
        return transaction

    @staticmethod
    def signTransaction(transaction, senderWallet):
        transaction.input = {
            "timeStamp": time.time(),
            "address": senderWallet.publicKey
        }
