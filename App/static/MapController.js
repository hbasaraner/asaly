
//  Harita işlemleri

var map;
var marker, i;
var markers = [];
var gatheringPoints = getGatheringPoints();


function createMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.4005984, lng: 27.1482898 },
        zoom: 15,
        mapTypeId: 'terrain',
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });



    var infowindow = new google.maps.InfoWindow();

    var image = 'https://cdn4.iconfinder.com/data/icons/6x16-free-application-icons/16/Flag.png';
    for (i = 0; i < gatheringPoints.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(gatheringPoints[i][1], gatheringPoints[i][2]),
            title: gatheringPoints[i][0],
            map: map,
            icon: image
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

