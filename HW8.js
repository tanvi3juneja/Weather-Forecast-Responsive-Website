$("#Clear").click(function (event) {
    $("#data").hide();
});

$("#Search").click(function (event) {
        
   if ($("#f1").valid()) {
        var arg_address = $("#street").val()+","+$("#city").val()+","+$("#state").val();
        if ($('input[name=Degree]:checked', '#f1').val() == "Fahrenheit")
            var units = "us";
        else
            var units = "si";
        
      $.getJSON("http://tanvisapps-env.elasticbeanstalk.com/?address="+arg_address+"&units="+units, function(r){
            if (!jQuery.isEmptyObject(r))
                loadData(r,units);
            else
                alert("empty");
        }).error(function(){
		  console.log("ERROR");
        }); 
  }
    
}); 

var ig, temp, summary, mapInitialized;

function loadData(json, units){
    
     $("#data").show();
     mapInitialized = false;
    
    $('.nav-tabs a[href="#current"]').tab('show');
    
    $('a[href=#current]').on('shown.bs.tab', function (e) {
  if (!mapInitialized) {
    var lat=json.latitude;
        var lon=json.longitude;
        showMap(lat,lon);
    mapInitialized = true;
   }
});
    
          var lat=json.latitude;
        var lon=json.longitude;
        showMap(lat,lon);
    summary = json.currently.summary;
    
    var deg = "&#176";
    if (units == 'us')
    temp = Math.round(json.currently.temperature) + String.fromCharCode(176) + "F";
    else
        temp = Math.round(json.currently.temperature) + String.fromCharCode(176) + "C";  
    if(json.currently.icon == "clear-day"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png';
    }
    else if(json.currently.icon == "clear-night"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png';
    }
    else if(json.currently.icon == "rain"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/rain.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png';
    }
    else if(json.currently.icon == "snow"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/snow.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/snow.png";
    }
    else if(json.currently.icon == "sleet"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png";
    }
    else if(json.currently.icon == "wind"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/wind.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/wind.png";
    }
    else if(json.currently.icon == "fog"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/fog.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/fog.png";
    }
    else if(json.currently.icon == "cloudy"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png";
    }
    else if(json.currently.icon == "partly-cloudy-day"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig="http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png";
    }
    else if(json.currently.icon == "partly-cloudy-night"){
        $(".icon").attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png");
        $(".icon").attr("alt", json.currently.summary);
        $(".icon").attr("title", json.currently.summary);
        ig= "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png";
    }
    
    $(".tempvalue").html(Math.round(json.currently.temperature));
    
    $(".summary").html(json.currently.summary + " in " + $("#city").val()+ "," + $("#state").val());
    $(".low").html("L: " + Math.round(json.daily.data[0].temperatureMin) + "&#176 | ");
    $(".high").html("H: " + Math.round(json.daily.data[0].temperatureMax) + "&#176");
    
    if (units == "us") {
        $(".s").html(" &#x2109");
        
        if (json.currently.precipIntensity < 0.002)
            $(".precipitation").html('None');
        else if (json.currently.precipIntensity < 0.017)
            $(".precipitation").html('Very Light');
        else if (json.currently.precipIntensity < 0.1)
            $(".precipitation").html('Light');
        else if (json.currently.precipIntensity < 0.4)
            $(".precipitation").html('Moderate');
        else
            $(".precipitation").html('Heavy');
        
        $(".wind").html(Number((json.currently.windSpeed).toFixed(2)) + ' mph');
        $(".dew").html(json.currently.dewPoint + " &#176F");
        if (json.currently.visibility)
        $(".visibility").html(Number((json.currently.visibility).toFixed(2)) + ' mi');
        else
            $(".visibility").html("NA");
    }
    
    else {
        $(".s").html(" &#x2103");
        
        if (json.currently.precipIntensity < 0.0508)
            $(".precipitation").html('None');
        else if (json.currently.precipIntensity < 0.4318)
            $(".precipitation").html('Very Light');
        else if (json.currently.precipIntensity < 2.54)
            $(".precipitation").html('Light');
        else if (json.currently.precipIntensity < 10.16)
            $(".precipitation").html('Moderate');
        else
            $(".precipitation").html('Heavy');
        
        $(".wind").html(Number((json.currently.windSpeed).toFixed(2)) + ' m/s');
        $(".dew").html(json.currently.dewPoint + " &#176C");
        if (json.currently.visibility)
        $(".visibility").html(Number((json.currently.visibility).toFixed(2)) + ' km');
        else
            $(".visibility").html("NA");
    }
    
    $(".rain").html(Math.round(json.currently.precipProbability * 100) + '%');
    $(".humidity").html(Math.round(json.currently.humidity * 100) + '%');
    
    moment.tz.setDefault(json.timezone);
    var sunrise_time = moment(json.daily.data[0].sunriseTime * 1000).format("hh:mm A");
    $(".sunrise").html(sunrise_time);
    var sunset_time = moment(json.daily.data[0].sunsetTime * 1000).format("hh:mm A");
    $(".sunset").html(sunset_time);
    
    if(units == 'us')
        $("#temphead").html("Temp (&#176F)");
    else
        $("#temphead").html("Temp (&#176C)");
    
    $(".data").each(function(i){
        $(this).children().each(function(j){
            if(j==0)         $(this).html(moment(json.hourly.data[i].time * 1000).format("hh:mm A"));
            else if(j==2)    $(this).html(Math.round(json.hourly.data[i].cloudCover*100) + '%');
            else if(j==3)    $(this).html(json.hourly.data[i].temperature);
        });
    });
    
    $(".img_summary").each(function(i){
        if(json.hourly.data[i].icon == "clear-day"){
            $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear.png");
            $(this).attr("alt", json.hourly.data[i].summary);
            $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "clear-night"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "rain"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/rain.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "snow"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/snow.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "sleet"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "wind"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/wind.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "fog"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/fog.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "cloudy"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "partly-cloudy-day"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
        else if(json.hourly.data[i].icon == "partly-cloudy-night"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png");
             $(this).attr("alt", json.hourly.data[i].summary);
             $(this).attr("title", json.hourly.data[i].summary);
        }
    });
    
     $(".table-striped").each(function(i){
        $(':nth-child(2)', this).children().each(function(j){
            if(j==0 && units == 'us')         $(this).html(Number((json.hourly.data[i].windSpeed).toFixed(2)) + ' mph');
            else if(j==0 && units == 'si')    $(this).html(Number((json.hourly.data[i].windSpeed).toFixed(2)) + ' m/s');
            else if(j==1)                     $(this).html(Math.round(json.hourly.data[i].humidity * 100) + '%');
            else if(j==2 && units == 'us' && json.hourly.data[i].visibility)    $(this).html(Math.round(json.hourly.data[i].visibility) + ' mi');
            else if(j==2 && units == 'si' && json.hourly.data[i].visibility)    $(this).html(Math.round(json.hourly.data[i].visibility) + ' km');
            else if(j==3 && units == 'us')    $(this).html(Number((json.hourly.data[i].pressure).toFixed(2)) + ' mb');
            else if(j==3 && units == 'si')    $(this).html(Number((json.hourly.data[i].pressure).toFixed(2)) + ' hPa');
            else                              $(this).html("NA");
        });
    });
    
    $("div.t3").each(function(i){
        $(this).children().children().each(function(j){
            if(j==0)         $(this).html(moment(json.daily.data[i+1].time * 1000).format("dddd"));
            else if(j==1)         $(this).html(moment(json.daily.data[i+1].time * 1000).format("MMM DD"));
            else if(j==5)         $(this).html(Math.round(json.daily.data[i+1].temperatureMin) + "&#176");
            else if(j==8)         $(this).html(Math.round(json.daily.data[i+1].temperatureMax) + "&#176");
        });
    });
    
    $(".tab3_icon").each(function(i){
        if(json.daily.data[i+1].icon == "clear-day"){
            $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear.png");
            $(this).attr("alt", json.daily.data[i+1].summary);
            $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "clear-night"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "rain"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/rain.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "snow"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/snow.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "sleet"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "wind"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/wind.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "fog"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/fog.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "cloudy"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "partly-cloudy-day"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
        else if(json.daily.data[i+1].icon == "partly-cloudy-night"){
             $(this).attr("src", "http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png");
             $(this).attr("alt", json.daily.data[i+1].summary);
             $(this).attr("title", json.daily.data[i+1].summary);
        }
    });
    
  
}

$('#f1').validate({
    
        rules: {
            street: "required",
            city: "required",
            state: "required",
        },
         messages: {
            street: "Please enter the street address",
            city: "Please enter the city",
            state: "Please select the state",
        },
    errorPlacement: function(error, element) {
    if (element.attr("name") == "street")
        $("div#street_error").html(error);
    else if  (element.attr("name") == "city" )
        $("div#city_error").html(error);
    else
        $("div#state_error").html(error);
}
});
function showMap(latitude,longitude){
		$("#map").html('');
		try{
		var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position       = new OpenLayers.LonLat(longitude,latitude).transform( fromProjection, toProjection);
        
    var map = new OpenLayers.Map("map");
    // Create OSM overlays
    var mapnik = new OpenLayers.Layer.OSM();

	   var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.5,
            sphericalMercator: true
        }
    );
	
	var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.5,
            sphericalMercator: true
        }
    );
	
	
map.addLayers([mapnik,layer_precipitation,layer_cloud]);
map.setCenter(position,10);
		}
		catch(err){
			$("#map").html("<h2> Map is not available for this location currently</h2>");
		}
}	 

window.fbAsyncInit = function() {
    FB.init({
      appId      : '172877113059175',
      xfbml      : true,
      version    : 'v2.5',
		status      : true,
		cookie      : true
    });
  };

(function(d) {
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if(d.getElementById(id)) { return; }
	js = d.createElement('script');
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	js.async = true;
	ref.parentNode.insertBefore(js, ref);
}(document));

 function sharefb()
{	
		var city=$.trim($("#city").val());
		var state=$("#state option:selected").val();
	
		var name="Current Weather in "+city+","+state;
    
        
		var picture = ig;
    	var caption= "WEATHER INFORMATION FROM FORECAST.IO";
		var link = "http://forecast.io";
		var description =  summary +" , "+ temp;
	//alert("Stuff is"+name+picture+caption+link+description);
	
	var obj =
	{
		method: 'feed',
		link: link,
		picture: picture,
		name: name,
		caption: caption,
		description: description,
	};

	function callback(response)
	{
		if(response)
		{
			alert("Posted Successfully");
		}
		else
		{
			alert("Not Posted");
		}
	}

	FB.ui(obj, callback);	
}

$(".fb").click(function (event) {
    sharefb();
});