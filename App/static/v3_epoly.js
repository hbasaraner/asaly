var map;
var directionDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];
var position;
var marker = null;
var polyline = null;
var poly2 = null;
var speed = 0.000005, wait = 1;
var infowindow = null;

var myPano;
var panoClient;
var nextPanoId;
var timerHandle = null;

function createMarker(latlng, label, html) {
  // alert("createMarker("+latlng+","+label+","+html+","+color+")");
  var contentString = '<b>' + label + '</b><br>' + html;
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: label,
    zIndex: Math.round(latlng.lat() * -100000) << 5
  });
  marker.myname = label;
  // gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
  return marker;
}


function initialize(_map) {
  infowindow = new google.maps.InfoWindow(
    {
      size: new google.maps.Size(150, 50)
    });
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on Manhattan.
  var myOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = _map;

  address = 'new york'
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    map.setCenter(results[0].geometry.location);
  });

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();

  polyline = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
  });
  poly2 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
  });
  return map;
}



var steps = []

function calcRoute(animStartPos, animStopPos) {

  if (timerHandle) { clearTimeout(timerHandle); }
  if (marker) { marker.setMap(null); }
  polyline.setMap(null);
  poly2.setMap(null);
  directionsDisplay.setMap(null);
  polyline = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
  });
  poly2 = new google.maps.Polyline({
    path: [],
    strokeColor: '#FF0000',
    strokeWeight: 3
  });
  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var travelMode = google.maps.DirectionsTravelMode.DRIVING

  var request = {
    origin: animStartPos,
    destination: animStopPos,
    travelMode: travelMode
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

      var bounds = new google.maps.LatLngBounds();
      var route = response.routes[0];
      startLocation = new Object();
      endLocation = new Object();

      // For each route, display summary information.
      var path = response.routes[0].overview_path;
      var legs = response.routes[0].legs;
      for (i = 0; i < legs.length; i++) {
        if (i == 0) {
          startLocation.latlng = legs[i].start_location;
          startLocation.address = legs[i].start_address;
          // marker = google.maps.Marker({map:map,position: startLocation.latlng});
          marker = createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
        }
        endLocation.latlng = legs[i].end_location;
        endLocation.address = legs[i].end_address;
        var steps = legs[i].steps;
        for (j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          for (k = 0; k < nextSegment.length; k++) {
            polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);



          }
        }
      }

      polyline.setMap(map);
      map.fitBounds(bounds);
      //        createMarker(endLocation.latlng,"end",endLocation.address,"red");
      map.setZoom(18);
      startAnimation();
    }
  });
}



var step = 10; // 5; // metres
var tick = 30; // milliseconds
var eol;
var k = 0;
var stepnum = 0;
var speed = "";
var lastVertex = 1;


//=============== animation functions ======================
function updatePoly(d) {
  // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
  if (poly2.getPath().getLength() > 20) {
    poly2 = new google.maps.Polyline([polyline.getPath().getAt(lastVertex - 1)]);
    // map.addOverlay(poly2)
  }

  if (polyline.GetIndexAtDistance(d) < lastVertex + 2) {
    if (poly2.getPath().getLength() > 1) {
      poly2.getPath().removeAt(poly2.getPath().getLength() - 1)
    }
    poly2.getPath().insertAt(poly2.getPath().getLength(), polyline.GetPointAtDistance(d));
  } else {
    poly2.getPath().insertAt(poly2.getPath().getLength(), endLocation.latlng);
  }
}


function animate(d) {
  // alert("animate("+d+")");
  if (d > eol) {
    map.panTo(endLocation.latlng);
    marker.setPosition(endLocation.latlng);
    return;
  }
  var p = polyline.GetPointAtDistance(d);
  map.panTo(p);
  marker.setPosition(p);
  updatePoly(d);
  timerHandle = setTimeout("animate(" + (d + step) + ")", tick);
}


function startAnimation() {
  eol = polyline.Distance();
  map.setCenter(polyline.getPath().getAt(0));
  // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
  // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
  // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
  // map.addOverlay(marker);
  poly2 = new google.maps.Polyline({ path: [polyline.getPath().getAt(0)], strokeColor: "#0000FF", strokeWeight: 10 });
  // map.addOverlay(poly2);
  setTimeout("animate(50)", 2000);  // Allow time for the initial map display
}


//=============== ~animation funcitons =====================

/*********************************************************************\
*                                                                     *
* epolys.js                                          by Mike Williams *
* updated to API v3                                  by Larry Ross    *
*                                                                     *
* A Google Maps API Extension                                         *
*                                                                     *
* Adds various Methods to google.maps.Polygon and google.maps.Polyline *
*                                                                     *
* .Contains(latlng) returns true is the poly contains the specified   *
*                   GLatLng                                           *
*                                                                     *
* .Area()           returns the approximate area of a poly that is    *
*                   not self-intersecting                             *
*                                                                     *
* .Distance()       returns the length of the poly path               *
*                                                                     *
* .Bounds()         returns a GLatLngBounds that bounds the poly      *
*                                                                     *
* .GetPointAtDistance() returns a GLatLng at the specified distance   *
*                   along the path.                                   *
*                   The distance is specified in metres               *
*                   Reurns null if the path is shorter than that      *
*                                                                     *
* .GetPointsAtDistance() returns an array of GLatLngs at the          *
*                   specified interval along the path.                *
*                   The distance is specified in metres               *
*                                                                     *
* .GetIndexAtDistance() returns the vertex number at the specified    *
*                   distance along the path.                          *
*                   The distance is specified in metres               *
*                   Returns null if the path is shorter than that      *
*                                                                     *
* .Bearing(v1?,v2?) returns the bearing between two vertices          *
*                   if v1 is null, returns bearing from first to last *
*                   if v2 is null, returns bearing from v1 to next    *
*                                                                     *
*                                                                     *
***********************************************************************
*                                                                     *
*   This Javascript is provided by Mike Williams                      *
*   Blackpool Community Church Javascript Team                        *
*   http://www.blackpoolchurch.org/                                   *
*   http://econym.org.uk/gmap/                                        *
*                                                                     *
*   This work is licenced under a Creative Commons Licence            *
*   http://creativecommons.org/licenses/by/2.0/uk/                    *
*                                                                     *
***********************************************************************
*                                                                     *
* Version 1.1       6-Jun-2007                                        *
* Version 1.2       1-Jul-2007 - fix: Bounds was omitting vertex zero *
*                                add: Bearing                         *
* Version 1.3       28-Nov-2008  add: GetPointsAtDistance()           *
* Version 1.4       12-Jan-2009  fix: GetPointsAtDistance()           *
* Version 3.0       11-Aug-2010  update to v3                         *
*                                                                     *
\*********************************************************************/


// === first support methods that don't (yet) exist in v3
google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
  var EarthRadiusMeters = 6378137.0; // meters
  var lat1 = this.lat();
  var lon1 = this.lng();
  var lat2 = newLatLng.lat();
  var lon2 = newLatLng.lng();
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = EarthRadiusMeters * c;
  return d;
}

google.maps.LatLng.prototype.latRadians = function () {
  return this.lat() * Math.PI / 180;
}

google.maps.LatLng.prototype.lngRadians = function () {
  return this.lng() * Math.PI / 180;
}

// === A method for testing if a point is inside a polygon
// === Returns true if poly contains point
// === Algorithm shamelessly stolen from http://alienryderflex.com/polygon/ 
google.maps.Polygon.prototype.Contains = function (point) {
  var j = 0;
  var oddNodes = false;
  var x = point.lng();
  var y = point.lat();
  for (var i = 0; i < this.getPath().getLength(); i++) {
    j++;
    if (j == this.getPath().getLength()) { j = 0; }
    if (((this.getPath().getAt(i).lat() < y) && (this.getPath().getAt(j).lat() >= y))
      || ((this.getPath().getAt(j).lat() < y) && (this.getPath().getAt(i).lat() >= y))) {
      if (this.getPath().getAt(i).lng() + (y - this.getPath().getAt(i).lat())
        / (this.getPath().getAt(j).lat() - this.getPath().getAt(i).lat())
        * (this.getPath().getAt(j).lng() - this.getPath().getAt(i).lng()) < x) {
        oddNodes = !oddNodes
      }
    }
  }
  return oddNodes;
}

// === A method which returns the approximate area of a non-intersecting polygon in square metres ===
// === It doesn't fully account for spherical geometry, so will be inaccurate for large polygons ===
// === The polygon must not intersect itself ===
google.maps.Polygon.prototype.Area = function () {
  var a = 0;
  var j = 0;
  var b = this.Bounds();
  var x0 = b.getSouthWest().lng();
  var y0 = b.getSouthWest().lat();
  for (var i = 0; i < this.getPath().getLength(); i++) {
    j++;
    if (j == this.getPath().getLength()) { j = 0; }
    var x1 = this.getPath().getAt(i).distanceFrom(new google.maps.LatLng(this.getPath().getAt(i).lat(), x0));
    var x2 = this.getPath().getAt(j).distanceFrom(new google.maps.LatLng(this.getPath().getAt(j).lat(), x0));
    var y1 = this.getPath().getAt(i).distanceFrom(new google.maps.LatLng(y0, this.getPath().getAt(i).lng()));
    var y2 = this.getPath().getAt(j).distanceFrom(new google.maps.LatLng(y0, this.getPath().getAt(j).lng()));
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a * 0.5);
}

// === A method which returns the length of a path in metres ===
google.maps.Polygon.prototype.Distance = function () {
  var dist = 0;
  for (var i = 1; i < this.getPath().getLength(); i++) {
    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
  }
  return dist;
}

// === A method which returns the bounds as a GLatLngBounds ===
google.maps.Polygon.prototype.Bounds = function () {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < this.getPath().getLength(); i++) {
    bounds.extend(this.getPath().getAt(i));
  }
  return bounds;
}

// === A method which returns a GLatLng of a point a given distance along the path ===
// === Returns null if the path is shorter than the specified distance ===
google.maps.Polygon.prototype.GetPointAtDistance = function (metres) {
  // some awkward special cases
  if (metres == 0) return this.getPath().getAt(0);
  if (metres < 0) return null;
  if (this.getPath().getLength() < 2) return null;
  var dist = 0;
  var olddist = 0;
  for (var i = 1; (i < this.getPath().getLength() && dist < metres); i++) {
    olddist = dist;
    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
  }
  if (dist < metres) {
    return null;
  }
  var p1 = this.getPath().getAt(i - 2);
  var p2 = this.getPath().getAt(i - 1);
  var m = (metres - olddist) / (dist - olddist);
  return new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m);
}

// === A method which returns an array of GLatLngs of points a given interval along the path ===
google.maps.Polygon.prototype.GetPointsAtDistance = function (metres) {
  var next = metres;
  var points = [];
  // some awkward special cases
  if (metres <= 0) return points;
  var dist = 0;
  var olddist = 0;
  for (var i = 1; (i < this.getPath().getLength()); i++) {
    olddist = dist;
    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
    while (dist > next) {
      var p1 = this.getPath().getAt(i - 1);
      var p2 = this.getPath().getAt(i);
      var m = (next - olddist) / (dist - olddist);
      points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
      next += metres;
    }
  }
  return points;
}

// === A method which returns the Vertex number at a given distance along the path ===
// === Returns null if the path is shorter than the specified distance ===
google.maps.Polygon.prototype.GetIndexAtDistance = function (metres) {
  // some awkward special cases
  if (metres == 0) return this.getPath().getAt(0);
  if (metres < 0) return null;
  var dist = 0;
  var olddist = 0;
  for (var i = 1; (i < this.getPath().getLength() && dist < metres); i++) {
    olddist = dist;
    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
  }
  if (dist < metres) { return null; }
  return i;
}

// === A function which returns the bearing between two vertices in decgrees from 0 to 360===
// === If v1 is null, it returns the bearing between the first and last vertex ===
// === If v1 is present but v2 is null, returns the bearing from v1 to the next vertex ===
// === If either vertex is out of range, returns void ===
google.maps.Polygon.prototype.Bearing = function (v1, v2) {
  if (v1 == null) {
    v1 = 0;
    v2 = this.getPath().getLength() - 1;
  } else if (v2 == null) {
    v2 = v1 + 1;
  }
  if ((v1 < 0) || (v1 >= this.getPath().getLength()) || (v2 < 0) || (v2 >= this.getPath().getLength())) {
    return;
  }
  var from = this.getPath().getAt(v1);
  var to = this.getPath().getAt(v2);
  if (from.equals(to)) {
    return 0;
  }
  var lat1 = from.latRadians();
  var lon1 = from.lngRadians();
  var lat2 = to.latRadians();
  var lon2 = to.lngRadians();
  var angle = - Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
  if (angle < 0.0) angle += Math.PI * 2.0;
  angle = angle * 180.0 / Math.PI;
  return parseFloat(angle.toFixed(1));
}




// === Copy all the above functions to GPolyline ===
google.maps.Polyline.prototype.Contains = google.maps.Polygon.prototype.Contains;
google.maps.Polyline.prototype.Area = google.maps.Polygon.prototype.Area;
google.maps.Polyline.prototype.Distance = google.maps.Polygon.prototype.Distance;
google.maps.Polyline.prototype.Bounds = google.maps.Polygon.prototype.Bounds;
google.maps.Polyline.prototype.GetPointAtDistance = google.maps.Polygon.prototype.GetPointAtDistance;
google.maps.Polyline.prototype.GetPointsAtDistance = google.maps.Polygon.prototype.GetPointsAtDistance;
google.maps.Polyline.prototype.GetIndexAtDistance = google.maps.Polygon.prototype.GetIndexAtDistance;
google.maps.Polyline.prototype.Bearing = google.maps.Polygon.prototype.Bearing;




