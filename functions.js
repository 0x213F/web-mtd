function getStopsAndBuses() {

    // create # of boxes for the # of stops requested

    console.log('### load frequentStops ###');
    var name = $("#profile").val();
    name = name.toUpperCase();
    var valid = isValidName(name);
    if ( valid == 1 ) {
    var codeStops = new String(), codeBuses = new String(), stopQueue = new String(), tileCount = 0, urlCount = 2;
    $.ajax({
        url: "apiurl.js",
        async: false,
        dataType: 'json',
        success: function(urlAndName) {
            console.log('// success loading url 1');
            for (var n in urlAndName[name]){
                codeStops += "<div class=\"stop\" id=\"stop" + n + "\"></div>";
            }
            document.getElementById("frequentStops").innerHTML=codeStops;

    // create # of cells for the # of buses coming at each stop requested.
            for (var x in urlAndName[name]) {
                codeBuses = "<p>" + urlAndName[name][x].stopname + "</p>";
                $.ajax({
                    url: urlAndName[name][x].url,
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        console.log('// success loading url ' + urlCount);
                        codeBuses += "<div class=\"scroll\">"
                        for (var i in data.departures) {
                            codeBuses += "<div class=\"tile bus" + i + "\" style=\"background-color:\
                                #" + data.departures[i].route.route_color + "\"><div class=\"header\"><p>";
                            var c = 0;
                            var char = data.departures[i].headsign.charAt(c);
                            while( char != ' ' ) {
                              codeBuses += char;
                              c++;
                              char = data.departures[i].headsign.charAt(c);
                            }
                            codeBuses += "</p></div><div class=\"info\"><p>" + data.departures[i].expected_mins + "</p></div></div>";
                            if ( i > tileCount ) {
                              tileCount = i;
                            }
                        }
                        codeBuses += "</div>"
                        stopQueue = "stop" + x;
                        urlCount++;
                        document.getElementById(stopQueue).innerHTML=codeBuses;
                    }
                });
            }
        }
    });

    // animate the tiles coming in
    $(".tile").delay(500).animate(
        { 'marginLeft' : "-=230px" }, {
            duration: 1000,
            easing: 'easeOutQuart',
    });

    /*
    $(".tile").delay(117000).animate(
        { 'marginLeft' : "-=250px" }, {
            duration: 2000,
            easing: 'easeInQuart',
    });
                                                    // uncomment for auto-refresh every 2 min
    setInterval(getStopsAndBuses,120000);
    */

    } else {
        console.log('// failed to load; invalid name')
    }
}

function isValidName(name) {
    name = name.toUpperCase();
    if ( name == 'HOME' || name ==  'ISR' || name ==  'COUNTY' ) {
        console.log('$ ' + name + ' is valid');
        return 1;
    } else {
        console.log('$ ' + name + ' is invalid');
        return 0;
    }
}

function getShape(shapeID) {
    console.log('### load getShape ###');
    $.ajax({
        url: 'http://developer.cumtd.com/api/v2.2/json/getshape?key=9f3c24bffb434aafb15b66f6e0f29ba4&shape_id=' + shapeID,
        async: false,
        dataType: 'json',
        success: function(shape) {
            var newHTML;
            for (var k in shape.shapes) {
                newHTML += "<p>" + shape.shapes[k].shape_pt_lat + ' ' + shape.shapes[k].shape_pt_lon + "</p>";
            }
            // TODO: graph lat-lon of route on a map
        }
    });
}
