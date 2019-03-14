class Earthquake extends Disaster {



    start() {

        var latitude = document.getElementById("koordinatX").value;
        var longitude = document.getElementById("koordinatY").value;
        var disasterOrigin = { name: "origin", lat: parseFloat(latitude), lng: parseFloat(longitude) };
        var i, j;
        var gatheringPoints = getGatheringPoints();
        var stockPoints = stocks;

        var nearstStock;

        var p1 = disasterOrigin;
        var p2 = gatheringPoints[0];
        var disasterGatheringPoints = [{ name: "", lat: 0, lng: 0, dist: 1000 },
        { name: "", lat: 0, lng: 0, dist: 1000 }, { name: "", lat: 0, lng: 0, dist: 1000 }];

        var stock = stockPoints[0];
        var stockDistance = Math.sqrt(Math.pow((disasterOrigin.lat - stock.lat), 2) + Math.pow((disasterOrigin.lng - stock.lng), 2));
        nearstStock = stock;
        for (j = 0; j < stockPoints.length; j++) {
            stock = stockPoints[j];
            var d = Math.sqrt(Math.pow((disasterOrigin.lat - stock.lat), 2) + Math.pow((disasterOrigin.lng - stock.lng), 2));
            if (d < stockDistance) {
                nearstStock = stock;
                stockDistance = d;
            }
        }


        for (i = 0; i < gatheringPoints.length; i++) {

            p2 = gatheringPoints[i];
            var distance = Math.sqrt(Math.pow((p1.lat - p2[1]), 2) + Math.pow((p1.lng - p2[2]), 2));
            if (distance < disasterGatheringPoints[0].dist) {
                disasterGatheringPoints[0].name = p2[0];
                disasterGatheringPoints[0].lat = p2[1];
                disasterGatheringPoints[0].lng = p2[2];
                disasterGatheringPoints[0].dist = distance;
            }
            else if (distance < disasterGatheringPoints[1].dist) {
                disasterGatheringPoints[1].name = p2[0];
                disasterGatheringPoints[1].lat = p2[1];
                disasterGatheringPoints[1].lng = p2[2];
                disasterGatheringPoints[1].dist = distance;
            }
            else if (distance < disasterGatheringPoints[2].dist) {
                disasterGatheringPoints[2].name = p2[0];
                disasterGatheringPoints[2].lat = p2[1];
                disasterGatheringPoints[2].lng = p2[2];
                disasterGatheringPoints[2].dist = distance;
            }
        }


        alert(disasterGatheringPoints[0].lat);
        alert(disasterGatheringPoints[1].lng);
        alert(disasterGatheringPoints[2].lat);
        addGatheringPointsToMap(disasterGatheringPoints);

        var animStartPoint = { lat: parseFloat(nearstStock.lat), lng: parseFloat(nearstStock.lng) };
        var animEndPoint = { lat: parseFloat(disasterGatheringPoints[0].lat), lng: parseFloat(disasterGatheringPoints[0].lng) };


        calcRoute(animStartPoint, animEndPoint);

        animStartPoint = animEndPoint;
        animEndPoint = { lat: parseFloat(disasterGatheringPoints[1].lat), lng: parseFloat(disasterGatheringPoints[1].lng) };
        calcRoute(animStartPoint, animEndPoint);

        animStartPoint = animEndPoint;
        animEndPoint = { lat: parseFloat(disasterGatheringPoints[2].lat), lng: parseFloat(disasterGatheringPoints[2].lng) };
        calcRoute(animStartPoint, animEndPoint);


    }





}