<?php

    header("Access-Control-Allow-Origin: *");

    $request_url = "https://maps.googleapis.com/maps/api/geocode/xml?address=".$_GET["address"]."&key=AIzaSyBRL08amg82y5jS1Wn7p28mwYxfsdLkz0o";
        $xml = simplexml_load_file($request_url) or die("url not loading");
        $status = $xml->status;
    
        if ($status=="OK"){
        
            $Lat = $xml->result->geometry->location->lat;
            $Lon = $xml->result->geometry->location->lng;
            $LatLng = "$Lat".","."$Lon";
            $Latitude = "$Lat";
            $Longitude = "$Lon";
            
            $request_url = "https://api.forecast.io/forecast/1b77c7041b563e171d899e095f3fc294/".$LatLng."?units=".$_GET["units"]."&exclude=flags";
            $response = file_get_contents($request_url);
        }

        else {
            $response = json_encode (json_decode ("{}"));
        }

        echo $response;
?>