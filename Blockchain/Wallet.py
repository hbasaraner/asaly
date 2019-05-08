from Transaction import Transaction


class Wallet:
    def __init__(self):
        self.publicKey = hex(123456789)

    def createTransaction(self, recipient, data):
        transaction = Transaction.newTransaction(self, recipient, data)
        return transaction

    def getTransaction(self, blockChain, timeStamp):
        targetTransaction = Transaction()
        for block in blockChain.chain:
            for transaction in block.data["transactions"]:
                if transaction["Input"]["Address"] == str(self.publicKey):
                    if transaction["Input"]["TimeStamp"] == str(timeStamp):
                        targetTransaction.id = transaction["ID"]
                        targetTransaction.input = transaction["Input"]
                        targetTransaction.outputs = transaction["Outputs"]
                        return targetTransaction

    def getAllTransactions(self, blockChain, wallet):
        targetTransaction = Transaction()
        targetTransactionList = []
        for block in blockChain.chain:
            for transaction in block.data["transactions"]:
                if transaction["Input"]["Address"] == str(wallet.publicKey):
                    targetTransaction.id = transaction["ID"]
                    targetTransaction.input = transaction["Input"]
                    targetTransaction.outputs = transaction["Outputs"]
                    targetTransactionList.append(targetTransaction)
        return targetTransactionList
