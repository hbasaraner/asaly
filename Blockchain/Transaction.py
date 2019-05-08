import time


class Transaction:
    def __init__(self):
        self.id = "deneme"
        self.input = None
        self.outputs = []

    def __str__(self):
        return str({'ID': self.id,
                    'Input': self.input,
                    'Outputs': self.outputs
                    })

    def toDict(self):
        return {'ID': self.id,
                'Input': self.input,
                'Outputs': self.outputs
                }

    @staticmethod
    def newTransaction(senderWallet, recipient, data):
        transaction = Transaction()
        transaction.outputs.append(data)
        Transaction.signTransaction(transaction, senderWallet)
        return transaction

    @staticmethod
    def signTransaction(transaction, senderWallet):
        transaction.input = {
            "TimeStamp": time.time(),
            "Address": senderWallet.publicKey
        }
