
//  Simülasyon işlemlerinin yönetimi
//  0 -> Deprem, 1->Sel, 2-> Heyelan, 3-> Yangın
//  Simülasyona ait bilgilerin toplanıp server'a yollanacağı sınıf

var simulationNumber = Math.floor(Math.random() * 4);

switch (simulationNumber) {
    case 0:
        earthquake();
        break;
    case 1:

        break;
    case 2:

        break;
    case 3:

        break;

}

function createSimulation(disaster) {
    showEarthquakeEffect();
    disaster.start();

}

function showEarthquakeEffect() {
    var element = document.getElementById("map");
    element.classList.add("shake-opacity");
    element.classList.add("shake-constant");
    setTimeout(function () {
        element.classList.remove("shake-opacity");
        element.classList.remove("shake-opacity");
    }, 1500);
    
}

