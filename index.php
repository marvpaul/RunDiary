<?php
// Gemeinsame genutzte Dinge sind dorthin ausgelagert
require_once 'bootstrap.php';
$json_data = file_get_contents('data.json');
$json_data = json_decode($json_data, true);

reset($json_data);
$start_date = strtotime(key($json_data));
end($json_data);
$end_date = strtotime(key($json_data));
$days_between = floor(abs($start_date - $end_date) / 86400);

echo $twig->render('app.twig');
