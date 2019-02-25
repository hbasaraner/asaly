
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

function earthquake(params) {

}