
#   Simülasyon işlemlerinin yönetimi
#   1 -> Deprem, 2->Sel, 3-> Heyelan, 4-> Yangın
#   Simülasyon oluşturan sınıf

import random
from Earthquake import Earthquake


def earthquake():
    Earthquake(1).start()


def flood():
    print("sel")


def landslide():
    print("heyelan")


def fire():
    print("yangın")


def switchSimulation(a):
    switcher = {
        1: earthquake,
        2: flood,
        3: landslide,
        4: fire,
    }
    simulationFunction = switcher.get(a, "Invalid simulation")
    return simulationFunction()



simulationNumber = random.randint(1, 4)
switchSimulation(1)
