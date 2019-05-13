
//  Harita işlemleri

var map;
var marker, i;
var markers = [];


function createMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.44400454326597, lng: 27.25335135275259 },
        zoom: 13,
        mapTypeId: 'terrain',
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });

    var faultLayer1 = new google.maps.KmlLayer({
        url: 'https://raw.githubusercontent.com/hbsrnr/asaly/updates/App/points/dirifaylar.kml?token=ABZQTONKERRXXXL3VVXTV5C44KHZU',
        map: map
    });

    var faultLayer2 = new google.maps.KmlLayer({
        url: 'https://raw.githubusercontent.com/hbsrnr/asaly/updates/App/points/fay2.kml?token=ABZQTOJNIS6VJRMU4O73MCC44KHX4',
        map: map
    });

  

    var infowindow = new google.maps.InfoWindow();

    /*

    //  Toplanma alanları haritada çok yer kapladığı için ve kastırdığı için deprem olan yere en yakın
    //  toplanma alanları haritaya eklenecektir. Bunun için ayrı bir fonksiyon yazılmıştır.

    var gatheringImage = 'https://cdn4.iconfinder.com/data/icons/6x16-free-application-icons/16/Flag.png';
    for (i = 0; i < gatheringPoints.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(gatheringPoints[i][1], gatheringPoints[i][2]),
            title: gatheringPoints[i][0],
            map: map,
            icon: gatheringImage
        });
    }
    */

    var stockImage = 'icons/warehouse.png';
    for (i = 0; i < stocks.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(stocks[i].lat, stocks[i].lng),
            title: stocks[i][0],
            map: map,
            icon: stockImage
        });
    }


    map.addListener('click', function (e) {
        placeMarkerAndPan(e.latLng, map)
    });

    return map;
}

function placeMarkerAndPan(latLng, map) {
    if (markers.length === 0) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        markers.push(marker);
        marker.setMap(map);
        map.panTo(latLng);
        document.getElementById("koordinatX").value = latLng.lat();
        document.getElementById("koordinatY").value = latLng.lng();
    }
    else {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        markers.push(marker);
        marker.setMap(map);
        map.panTo(latLng);
        document.getElementById("koordinatX").value = latLng.lat();
        document.getElementById("koordinatY").value = latLng.lng();
    }
    showOnTextbox();
}

function addGatheringPointsToMap(gatheringPoints) {
    var gatheringImage = 'icons/meet_point.png'; // Toplanma yerlerini gostermede sorun var !!!!
    for (i = 0; i < gatheringPoints.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(gatheringPoints[i].lat, gatheringPoints[i].lng),
            title: gatheringPoints[i].name,
            map: map,
            icon: gatheringImage
        });
    }
}

