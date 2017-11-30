<?php
/**
 * Shows the diary tab content
 */
require_once 'bootstrap.php';
$json_data = file_get_contents('data.json');
$json_data = json_decode($json_data, true);

echo $twig->render('diary.twig', array(
    'diary' => $json_data
));
