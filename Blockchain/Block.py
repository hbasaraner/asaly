import hashlib,time

class Block:
    def __init__(self, timeStamp, lastHash, hash, data):
        self.timeStamp = timeStamp
        self.lastHash = lastHash
        self.hash = hash
        self.data = data

    def __str__(self):
        return """
        TimeStamp: {timeStamp}
        Lasthash: {lastHash}
        Hash: {hash}
        Data: {data}
        """.format(timeStamp=self.timeStamp, lastHash=self.lastHash, hash=self.hash, data=self.data)

    @staticmethod
    def genesis():
        timeStamp = "MÖ:1234"
        lastHash = "asaly"
        data = "Çikolatalaaarr Püskevitlerr"
        block = Block(timeStamp, lastHash, "", data)
        hash = Block.blockHash(block)
        block.hash = hash
        return block

    @staticmethod
    def blockHash(block):
        return hashlib.sha256((block.timeStamp+block.lastHash+block.data).encode()).hexdigest()

    @staticmethod
    def mineBlock(_lastBlock , _data):
        timeStamp = str(time.time())
        lastHash = _lastBlock.hash
        data = _data
        block = Block(timeStamp, lastHash, "", data)
        hash = Block.blockHash(block)
        block.hash = hash
        return block


