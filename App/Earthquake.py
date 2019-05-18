import random
from math import radians, cos, sin, asin, sqrt, log


class Earthquake:
    def __init__(self, randomSeed):
        
        fDiri = open("points\dirifaylar.txt", "r")
        fFay = open("points\\aktiffay.txt", "r")
        
        r = random.random()
        if r < 0.6:
            self.lines = fDiri.readlines()
        else:
            self.lines = fFay.readlines()
        self.randCoordinate = random.choice(self.lines)

        self.coordinate = {"lat": 10, "lng": 10}

        random.seed(1)
        #   üstel dağılıuma uygun bul
        self.magnitude = random.random() * 5 + 4

        random.seed(1)
        #   influence değerini magnitude kullanarak tekrar bul
        self.influence = random.random() * 80 + 20
        self.influenceList = [self.influence * 0.2]
        self.influenceList.append(self.influence * 0.5)
        self.influenceList.append(self.influence)
        self.disasterCenter = {"lat":0,"lng":0}

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
        r = 6371  # Radius of earth in kilometers. Use 3956 for miles
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
        self.disasterCenter={"lat":lat,"lng":lng}

#   Mahalle bilgisinden depremde etkilenecek kişi sayısını bulmak
        f = open("points\Mahalle_Bilgileri.txt", "r", encoding='utf-8')
        populationLines = f.readlines()
        for population in populationLines:
            populationInfo = population.split(",")
            populationCount = int(populationInfo[2])
            populationLat = float(populationInfo[3])
            populationLng = float(populationInfo[4])
            distance = Earthquake.haversine(
                populationLng, populationLat, lng, lat)
            if populationCount != 0:
                if (distance <= self.influence):
                    if (distance <= self.influenceList[0]):
                        self.populationAffected += populationCount
                        self.populationInjured += int(
                            populationCount * ((self.magnitude * 10) / populationCount))

                    elif (distance > self.influenceList[0] and distance <= self.influenceList[1]):
                        self.populationAffected += int(populationCount * 0.5)
                        self.populationInjured += int(
                            populationCount * 0.5 * ((self.magnitude * 10) / populationCount * 0.5))

                    elif (distance > self.influenceList[1] and distance <= self.influenceList[2]):
                        self.populationAffected += int(populationCount * 0.1)
                        self.populationInjured += int(
                            populationCount * 0.1 * ((self.magnitude * 10) / populationCount * 0.1))


        self.findGatheringPoints()

        print("Coordinate: "+str(self.disasterCenter))
        print("Magnitude: "+str(self.magnitude))
        print("Influence: "+str(self.influenceList))
        print("AffectedPeople: "+str(self.populationAffected))
        print("InjuredPeople: "+str(self.populationInjured))

    def findGatheringPoints(self):
#   Toplanma noktalarının seçilmesi
        f = open("points\Toplanma_Alarları_ve_Kapasiteler.txt", "r", encoding='utf-8')
        distancesBetweenPoints=[]    #  deprem merkezine uzaklığı hesaplanmış toplanma noktaları
        gatheringPoints = f.readlines()
        for point in gatheringPoints:
            p = point.split(",")
            name = p[0]
            lat = float(p[1])
            lng = float(p[2])
            capacity = int(p[3])
            distance  = Earthquake.haversine(self.disasterCenter["lng"],self.disasterCenter["lat"],lng,lat)
            distancesBetweenPoints.append([name,lat,lng,capacity,distance])
        
        distancesBetweenPoints.sort(key= lambda x:x[4])
        for d in distancesBetweenPoints:
            print(d)

    
        
