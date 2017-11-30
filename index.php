<?php
/**
 * Shows the main app
 */
// Gemeinsame genutzte Dinge sind dorthin ausgelagert
require_once 'bootstrap.php';
echo $twig->render('app.twig');
