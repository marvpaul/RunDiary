<?php
// __DIR__ ist das Verzeichnis in dem diese Datei (bootstrap) liegt, dadurch
// wird hier ein absoluter Pfad drauf.
// (Bei relativen Pfaden ist sonst das Einstiegsskript der Ausgangspunkt!)
require_once __DIR__ . '/vendor/autoload.php';
// Twig mitteilen, dass die Templates als Dateien vorliegen (könnten sonst auch
// direkt hier definiert werden, dann wäre das ein anderer "Loader") und zwar im
// "templates"-Ordner.
// (Der liegt absichtlich außerhalb des "web"-Ordners.)
$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
$twig = new Twig_Environment($loader);