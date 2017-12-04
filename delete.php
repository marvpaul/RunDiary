<?php
/**
 * Created by IntelliJ IDEA.
 * User: marvinkruger
 * Date: 04.12.17
 * Time: 12:50
 */

function loadJSON(){
    //Load json from data.json and decode to assoc array
    $json_data = file_get_contents('data.json');
    return json_decode($json_data, true);

}

function saveJSON($json_data){
    file_put_contents("data.json", json_encode($json_data));
}
$json_data = loadJSON();

//Check if there is any entry
if(!$json_data == null){
    //Replace old entry?
    $lenArr = count($json_data);
    unset($json_data[$_POST["date"]]);
    if($lenArr != count($json_data)){
        saveJSON($json_data);
        echo 'true';
    } else{
        echo 'false';
    }
} else{
    echo 'false';
}

