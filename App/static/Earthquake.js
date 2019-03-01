class Earthquake extends Disaster {



    start() {

        var lat = document.getElementById("koordinatX").value;
        var lng = document.getElementById("koordinatY").value;
        var disasterOrigin = ["origin", lat, lng];
        var i;
        var gatheringPoints = getGatheringPoints();
        var nearstGatheringPoints = gatheringPoints[0];

        var p1 = disasterOrigin;
        var p2 = gatheringPoints[0];


        var distance = Math.sqrt(Math.pow((p1[1] - p2[1]), 2) + Math.pow((p1[2] - p2[2]), 2));

        for (i = 0; i < gatheringPoints.length; i++) {

            p2 = gatheringPoints[i];
            var d = Math.sqrt(Math.pow((p1[1] - p2[1]), 2) + Math.pow((p1[2] - p2[2]), 2));
            if (d < distance) {
                nearstGatheringPoints = gatheringPoints[i];
                distance = d;
            }
        }

        var animStartPoint = { lat: parseFloat(disasterOrigin[1]), lng: parseFloat(disasterOrigin[2]) };
        var animEndPoint = { lat: parseFloat(nearstGatheringPoints[1]), lng: parseFloat(nearstGatheringPoints[2]) };


        calcRoute(animStartPoint, animEndPoint);
        //playAnimation({ lat: disasterOrigin[1], lng: disasterOrigin[2] }, { lat: nearstGatheringPoints[1], lng: nearstGatheringPoints[2] });

    }





}