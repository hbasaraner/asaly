import random
from math import radians, cos, sin, asin, sqrt

class Earthquake:
    def __init__(self, randomSeed):
        self.f = open("points\Faylar.txt", "r")
        self.lines = self.f.readlines()
        self.randCoordinate = random.choice(self.lines)

        self.coordinate = {"lat": 10, "lng": 10}

        self.magnitude = random.random() * 3 + 3
        self.influence = random.random() * 5 + 1
        self.influence2 = self.influence + self.influence * random.random() * 25 
        self.populationAffected = 0
        self.populationInjured = 0

    @staticmethod
    def haversine(lon1, lat1, lon2, lat2):
            """
            Calculate the great circle distance between two points 
            on the earth (specified in decimal degrees)
            """
            # convert decimal degrees to radians 
            lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

            # haversine formula 
            dlon = lon2 - lon1 
            dlat = lat2 - lat1 
            a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
            c = 2 * asin(sqrt(a)) 
            r = 6371 # Radius of earth in kilometers. Use 3956 for miles
            return c * r
    def start(self):
        
        
        lat = 0
        lng = 0
        coordinates = self.randCoordinate.split(' ')
        for coordinate in coordinates:
            coordinate = coordinate.split(',')
            lat += float(coordinate[1])
            lng += float(coordinate[0])

        lat /= len(coordinates)
        lng /= len(coordinates)
        
        f = open("points\Mahalle_Bilgileri.txt","r", encoding = 'utf-8')
        populationLines = f.readlines()
        for population in populationLines:
            populationInfo = population.split(",")
            populationCount = int (populationInfo[2])
            populationLat = float(populationInfo[3])
            populationLng = float(populationInfo[4])
            if (Earthquake.haversine(populationLng, populationLat,lng,lat) <= self.influence):
                self.populationAffected += populationCount
        
        if self.populationAffected != 0:
            self.populationInjured =int(self.populationAffected * ((self.magnitude * 10 ) / self.populationAffected))
        

        print("Coordinate: "+str(self.randCoordinate))
        print("Magnitude: "+str(self.magnitude))
        print("Influence: "+str(self.influence))
        print("AffectedPeople: "+str(self.populationAffected))
        print("InjuredPeople: "+str(self.populationInjured))
        

