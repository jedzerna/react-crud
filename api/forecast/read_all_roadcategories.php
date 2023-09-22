<?php
// include core configuration
    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/forecast.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $forecast = new Forecast($db);

// read all products
$results=$forecast->readAllCat();

// output in json format
echo $results;