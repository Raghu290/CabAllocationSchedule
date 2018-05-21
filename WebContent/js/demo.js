var iconObject = L.icon({
    iconUrl: './img/marker-icon.png',
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    iconAnchor: [12, 40]
});

$(document).ready(function (e) {
    jQuery.support.cors = true;

    $(".tab-content").css("display", "none");
    $(".tabs-menu a").click(function (event) {
        // event.preventDefault();
        showTab($(this));
    });

    function showTab(thisDiv) {
        thisDiv.parent().addClass("current");
        thisDiv.parent().siblings().removeClass("current");
        var tab = thisDiv.attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();

        // a bit hackish to refresh the map
            vrpMap.invalidateSize(false);
     
    }

    var host;

    //
    // Sign-up for free and get your own key: https://graphhopper.com/#directions-api
    //
 ///   var defaultKey = "bd5f8b44-bfa8-407a-b868-7f2efc1146d9";
  ///  var profile = "car";

    // create a routing client to fetch real routes, elevation.true is only supported for vehicle bike or foot
    //key: defaultKey,host: host,{  vehicle: profile, elevation: false}
    var ghRouting = new GraphHopperRouting();
    var vrpMap = createMap('vrp-map');
    setupRouteOptimizationAPI(vrpMap, ghRouting);

    var tmpTab = window.location.hash;
    if (!tmpTab)
        tmpTab = "#routing";

    showTab($(".tabs-menu li > a[href='" + tmpTab + "']"));
});


function setupRouteOptimizationAPI(map,  ghRouting) {
    map.setView([12.8956, 80.2293], 12);

    L.NumberedDivIcon = L.Icon.extend({
        options: {
            iconUrl: './img/marker-icon.png',
            number: '',
            shadowUrl: null,
            iconSize: new L.Point(25, 41),
            iconAnchor: new L.Point(13, 41),
            popupAnchor: new L.Point(0, -33),
            className: 'leaflet-div-icon'
        },
        createIcon: function () {
            var div = document.createElement('div');
            var img = this._createImg(this.options['iconUrl']);
            var numdiv = document.createElement('div');
            numdiv.setAttribute("class", "number");
            numdiv.innerHTML = this.options['number'] || '';
            div.appendChild(img);
            div.appendChild(numdiv);
            this._setIconStyles(div, 'icon');
            return div;
        },
        // you could change this to add a shadow like in the normal marker if you really wanted
        createShadow: function () {
            return null;
        }
    });

    var addPointToMap = function (lat, lng, index) {
        index = parseInt(index);
        if (index === 0) {
            new L.Marker([lat, lng], {
                icon: new L.NumberedDivIcon({iconUrl: './img/marker-icon-green.png', number: '1'}),
                bounceOnAdd: true,
                bounceOnAddOptions: {duration: 800, height: 200}
            }).addTo(routingLayer);
        } else {
            new L.Marker([lat, lng], {
                icon: new L.NumberedDivIcon({number: '' + (index + 1)}),
                bounceOnAdd: true,
                bounceOnAddOptions: {duration: 800, height: 200},
            }).addTo(routingLayer);
        }
    };

/*    map.on('click', function (e) {
        addPointToMap(e.latlng.lat, e.latlng.lng, ghOptimization.points.length);
        ghOptimization.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
    });*/

    var routingLayer = L.geoJson().addTo(map);
    routingLayer.options.style = function (feature) {
        return feature.properties && feature.properties.style;
    };

    var clearMap = function () {
       // ghOptimization.clear();
        routingLayer.clearLayers();
        ghRouting.clearPoints();
        $("#vrp-response").empty();
        $("#vrp-error").empty();
    };

/*   var createSignupSteps = function () {
        return "<div style='color:black'>To test this example <br/>"
                + "1. <a href='https://graphhopper.com/#directions-api'>sign up for free</a>,<br/>"
                + "2. log in and request a free standard package then <br/>"
                + "3. copy the API key to the text field in the upper right corner<div>";
    };*/

    var optimizeResponse = function () {
        // Locate HTML DOM element with ID "somebutton" and assign the following function to its "click" event...
    	console.log("just entered");
        $.get('SimpleServlet', function(responseJson) {          // Execute Ajax GET request on URL of "someservlet" and execute the following function with Ajax response JSON...
            var $table = $('<table>').appendTo($('#somediv'));             // Create HTML <table> element and append it to HTML DOM element with ID "somediv".
     
            var cabName =null;
            var routeIndex = 0;
            var cabChanged = false;
            $.each(responseJson, function(index, product) {  
            	 if(cabName!=product.cab){
            	 ghRouting.clearPoints(); // Iterate over the JSON array.
            	cabName = product.cab;
            	var actIndex=0;
            	   $.each(responseJson, function(index, product) {    // Iterate over the JSON array.
                                        
                  if(cabName ===  product.cab){
                    	if(actIndex===0){
                    		  
                                   ghRouting.addPoint(new GHInput(12.8956, 80.2293));
                                   addPointToMap(12.8956,  80.2293, 0);
                                  
                    	}
                  actIndex = actIndex+1;
                  console.log("INdex "+ actIndex);
                  ghRouting.addPoint(new GHInput(product.latitude, product.longitude));
                  addPointToMap(product.latitude, product.longitude, actIndex);
                  
                           
                    	
                    	}
                    });
            	   console.log("Cab "+ cabName);
            	   if (routeIndex === 3) {
                       routeStyle = {color: "cyan"};
                   } else if (routeIndex === 2) {
                       routeStyle = {color: "black"};
                   } else if (routeIndex === 1) {
                       routeStyle = {color: "green"};
                   } else {
                       routeStyle = {color: "blue"};
                   }

                   routeStyle.weight = 5;
                   routeStyle.opacity = 1;

                   var ghCallback = createGHCallback(routeStyle);
                   ghRouting.doRequest(ghCallback, {instructions: false});
                   routeIndex = routeIndex+1;
             }
            });
        });
/*    console.log("done");
        for (var routeIndex = 0; routeIndex < 2; routeIndex++) {
          

            // fetch real routes from graphhopper
            ghRouting.clearPoints();
            var firstAdd;
            if(routeIndex===0){
            for (var actIndex = 0; actIndex <4; actIndex++) {
             //   var add = route.activities[actIndex].address;
                //  ghRouting.addPoint(new GHInput(add.lat, add.lon));
                if(actIndex===0){
                 ghRouting.addPoint(new GHInput(12.8956, 80.2293));
                 addPointToMap(12.8956,  80.2293, actIndex);
                }
            
                if(actIndex===1){
                ghRouting.addPoint(new GHInput(12.89199711, 80.23065183));
                addPointToMap(12.89199711, 80.23065183, actIndex);
                }
                if(actIndex===2){
                    ghRouting.addPoint(new GHInput(12.826, 80.2393));
                    addPointToMap(12.826, 80.2393, actIndex);
                    }
             
                        // if (!eqAddress(firstAdd, add))
               //     addPointToMap(add.lat, add.lon, actIndex);

              //  if (actIndex === 0)
                //    firstAdd = add;
            }
            }
       if(routeIndex === 1){
	  for (var actIndex = 0; actIndex <4; actIndex++) {
          //   var add = route.activities[actIndex].address;
             //  ghRouting.addPoint(new GHInput(add.lat, add.lon));
		   if(actIndex===0){
               ghRouting.addPoint(new GHInput(12.8956, 80.2293));
               addPointToMap(12.8956,  80.2293, actIndex);
              }
             if(actIndex===1){
             ghRouting.addPoint(new GHInput(12.9669617, 80.2551319));
             addPointToMap(12.9669617, 80.2551319, actIndex);
             }
             if(actIndex===2){
             ghRouting.addPoint(new GHInput(12.90906985, 80.19625518));
             addPointToMap(12.90906985, 80.19625518, actIndex);
             }
         
                     // if (!eqAddress(firstAdd, add))
            //     addPointToMap(add.lat, add.lon, actIndex);

           //  if (actIndex === 0)
             //    firstAdd = add;
         }
}
            var routeStyle;
            if (routeIndex === 3) {
                routeStyle = {color: "cyan"};
            } else if (routeIndex === 2) {
                routeStyle = {color: "black"};
            } else if (routeIndex === 1) {
                routeStyle = {color: "green"};
            } else {
                routeStyle = {color: "blue"};
            }

            routeStyle.weight = 5;
            routeStyle.opacity = 1;

            var ghCallback = createGHCallback(routeStyle);
            ghRouting.doRequest(ghCallback, {instructions: false});
        }*/
    };

    var eqAddress = function (add1, add2) {
        return add1 && add2
                && Math.floor(add1.lat * 1000000) === Math.floor(add2.lat * 1000000)
                && Math.floor(add1.lon * 1000000) === Math.floor(add2.lon * 1000000);
    };

    var createGHCallback = function (routeStyle) {
        return function (json) {
            if (json.message) {
                var str = "An error for the routing occurred: " + json.message;
                if (json.hints)
                    str += json.hints;
                $("#vrp-error").text(str);
                console.log(JSON.stringify(json));

            } else {
                for (var pathIndex = 0; pathIndex < json.paths.length; pathIndex++) {
                    var path = json.paths[pathIndex];
                    routingLayer.addData({
                        "type": "Feature",
                        "geometry": path.points,
                        "properties": {
                            style: routeStyle
                        }
                    });
                }
            }
        };
    };



    $("#vrp_clear_button").click(clearMap);
    $("#optimize_button").click(optimizeResponse);
}


function createMap(divId) {
    var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    var mapquest = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
       // attribution: osmAttr + ', <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>',
        subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
    });

    var openMapSurfer = L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}', {
        //attribution: osmAttr + ', <a href="http://openmapsurfer.uni-hd.de/contact.html">GIScience Heidelberg</a>'
    });

    var omniscale = L.tileLayer.wms('https://maps.omniscale.net/v1/raghupublickey-47683b08/tile', {
        layers: 'osm',
        //attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/">Omniscale</a>'
    });

    var map = L.map(divId, {layers: [omniscale]});
    L.control.layers({"MapQuest": mapquest,
        "Omniscale": omniscale,
        "OpenMapSurfer": openMapSurfer, }).addTo(map);
    return map;
}
