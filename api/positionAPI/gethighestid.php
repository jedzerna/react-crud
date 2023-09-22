<?php
// include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

// product object
    include_once '../../objects/position.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Position = new Position($db);

$results = $Position->gethighestid();

// output in json format
echo $results;
