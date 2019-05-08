import hashlib
import time


class Block:
    def __init__(self, _timeStamp, _lastHash, _hash, _data):
        self.timeStamp = _timeStamp
        self.lastHash = _lastHash
        self.currentHash = _hash
        self.data = _data

    def __str__(self):
        return """
        TimeStamp: {timeStamp}
        Lasthash: {lastHash}
        Currenthash: {currentHash}
        Data: {data}
        """.format(timeStamp=self.timeStamp, lastHash=self.lastHash, currentHash=self.currentHash, data=str(self.data))

    @staticmethod
    def genesis():
        timeStamp = "MÖ:1234"
        lastHash = "asaly"
        data = {"transactions": [{'ID': "donald",
                                  'Input': {
                                      "TimeStamp": "00",
                                      "Address": "asaly"
                                  },
                                  'Outputs': "Çikolatalaaarr Püskevitleer"
                                  }]}
        block = Block(timeStamp, lastHash, "", data)
        currentHash = Block.blockHash(block)
        block.currentHash = currentHash
        return block

    @staticmethod
    def blockHash(block):
        return hashlib.sha256((block.timeStamp+block.lastHash+str(block.data)).encode()).hexdigest()

    @staticmethod
    def mineBlock(_lastBlock, _data):
        timeStamp = str(time.time())
        lastHash = _lastBlock.currentHash
        data = _data
        block = Block(timeStamp, lastHash, "", data)
        currentHash = Block.blockHash(block)
        block.currentHash = currentHash
        return block
