import random


class Earthquake:
    def __init__(self, randomSeed):
        self.f = open("points\Faylar.txt", "r")
        self.lines=self.f.readlines()
        self.randCoordinate=random.choice(self.lines)
        
        self.coordinate =  {"lat":10,"lng":10}

        self.magnitude = random.random() * 6
        self.influence = random.random() * 20
        

    def start(self):
        print("Coordinate: "+str(self.randCoordinate))
        print("Magnitude: "+str(self.magnitude))
        print("Influence: "+str(self.influence))

