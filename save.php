<?php
    function sortFunction( $a, $b ) {
        return strtotime($a) - strtotime($b);
    }

    function getAvgSpeed($time, $distance){
        return round($distance / ($time/60/60), 2);
    }

    function TimeToSec($time) {
        $sec = 0;
        foreach (array_reverse(explode(':', $time)) as $k => $v) $sec += pow(60, $k) * $v;
        return $sec;
    }

    function loadJSON(){
        //Load json from data.json and decode to assoc array
        $json_data = file_get_contents('data.json');
        return json_decode($json_data, true);

    }

    function saveJSON($json_data){
        file_put_contents("data.json", json_encode($json_data));
    }


    $json_data = loadJSON();

    //Parse form data and convert the time
    $time_in_sec = TimeToSec($_POST["time"]);
    $distance = $_POST["distance"];
    $date = $_POST["date"];
    $entry = array(
        "time" =>  $time_in_sec,
        "distance" => $distance,
        "avgSpeed" => getAvgSpeed($time_in_sec, $distance)
    );
    $entry_with_date = array(
        $date => $entry
    );

    //Check if there is any other entry
    if($json_data == null){
        file_put_contents("data.json", json_encode($entry_with_date));
    } else{
        $setted = false;
        //Replace old entry?
        foreach ($json_data as $key => $act_entry){
            if(strtotime($_POST["date"]) == strtotime($key)){
                $json_data[$key] = $entry;
                $setted = true;
                break;
            }
        }
        //Set new entry instead of replacing one
        if(!$setted){
            $json_data[$date] = $entry;
            uksort($json_data, "sortFunction");
        }
        saveJSON($json_data);
    }
    echo "true";