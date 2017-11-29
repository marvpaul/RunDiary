<?php echo 1+2 ?>

<?php
// Gemeinsame genutzte Dinge sind dorthin ausgelagert
require_once 'bootstrap.php';
$name = "Marvin";

echo $twig->render('app.twig', array(
    'name' => $name
));
