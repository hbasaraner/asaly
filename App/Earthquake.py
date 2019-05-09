import random


class Earthquake:
    def __init__(self, randomSeed):
        random.seed(randomSeed)
        self.coordinate =  {"lat":10,"lng":10}

        self.magnitude = random.random()*10
        self.influence = random.random()*20
        

    def start(self):
        print("Magnitude: "+str(self.magnitude))
        print("Influence: "+str(self.influence))
