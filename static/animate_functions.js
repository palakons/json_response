


function m2Deg(d) {
    var D = 12744000;
    return 360 * d / (2 * Math.PI * D / 2);

}
function deg2M(deg) {
    var D = 12744000;
    return deg * (2 * Math.PI * D / 2) / 360;

}

function myStroke(ctx, thickW, thinW) {

    //ctx.strokeStyle = 'rgba(255, 255, 255, 255)';
    //ctx.lineWidth = thickW;
    //ctx.stroke();
    ctx.strokeStyle = 'rgba(25, 25, 25, 70)';
    ctx.lineWidth = thinW;
    ctx.stroke();
}
function myFill(ctx, status, offset = 0) {
    var period = 2000; //millisec		
    switch (status) {
        case 0:
            ctx.fillStyle = 'rgba(255, 255, 255, .5)';
            ctx.fill();
            break;
        case 1:
            var millisec = Date.now();
            ctx.fillStyle = 'rgba(0,102,0,' + fillIntensity(millisec % period, period, offset) + ')';
            ctx.fill();
            break;
        case 2:
            ctx.fillStyle = 'rgba(255, 0, 0, .5)';
            ctx.fill();
            break;
        default:
            break;
    }

}
function fillIntensity(pos, period, offset = 0) {
    pos = (pos + offset) % period;
    var t = Math.PI / 4 * (1 - pos / period);
    return Math.sin(t);
    return pos / period;
    return pos > period / 2 ? 1 : 0;
}
function drawPatch(canvas, patch, mapImage) {
    var ctx = canvas.getContext('2d');
    var scale = mapImage.pixelPerMeter;
    //console.log(scale);
    /*

latitude: "1",
longitude: "1",
theta: "30",
width: "5", // m
length: "20", //m
number_of_slots_by_the_length: "10",
offset_angle: "45",
	
	
center_latitude: 13.738883272086257,
center_longitude: 100.56115252956917,
pixelPerMeter: 0.5 / 0.09065750491789616,
bearing: -84,*/

    for (var i in patch) {
        ctx.save();
        //translate
        //rotate
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(- mapImage.bearing / 180 * Math.PI);

        ctx.translate(mapImage.pixelPerMeter * deg2M(patch[i].center_longitude - mapImage.center_longitude),
            mapImage.pixelPerMeter * -deg2M(patch[i].center_latitude - mapImage.center_latitude));
        ctx.rotate(patch[i].theta / 180 * Math.PI);
        ctx.translate(mapImage.pixelPerMeter * -patch[i].length / 2,
            mapImage.pixelPerMeter * -patch[i].width / 2);

        var n = patch[i].number_of_slots_by_the_length;

        for (var j = 0; j < n; j++) { //draw each spot

            drawSpot(ctx, scale * (j / n * patch[i].length),
                scale * patch[i].length / n,
                scale * patch[i].width,
                patch[i].offset_angle,
                2, 1, patch[i]);
        }
        ctx.restore();

    }
}

function drawSpot(ctx, pos, width, length, deg, offset, fill_status, patch = undefined) {
    if (width > 2 * offset && length > 2 * offset) {
        ctx.beginPath();
        ctx.moveTo(pos + offset * (1 + Math.sin(deg / 180 * Math.PI)),
            offset);
        ctx.lineTo(pos + offset + (length - offset) * Math.sin(deg / 180 * Math.PI),
            length * Math.cos(deg / 180 * Math.PI) - offset);
        ctx.lineTo(pos + width - offset + (length - offset) * Math.sin(deg / 180 * Math.PI),
            length * Math.cos(deg / 180 * Math.PI) - offset);

        ctx.lineTo(pos + width - offset * (1 - Math.sin(deg / 180 * Math.PI)),
            offset);
        ctx.closePath();

        //right top
        var offset = (patch.center_latitude + patch.center_longitude) /m2Deg(.1);

        myFill(ctx, fill_status, offset);
    }
}

function haversineDistance(lat1, lon1, lat2, lon2) { //angles in degree
    try {
        var R = 6371e3; // metres
        var phi1 = lat1 * Math.PI / 180;
        var phi2 = lat2 * Math.PI / 180;
        var deltaPhi = (lat2 - lat1) * Math.PI / 180;
        var deltaLambda = (lon2 - lon1) * Math.PI / 180;

        var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
        //console.log(lat1, lon1, lat2, lon2,R, phi1, phi2, deltaPhi, deltaLambda, a, c, d);
    } catch (e) {
        console.log("Error: ", e);
    }
    return d;
}