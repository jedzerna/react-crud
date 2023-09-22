<?php
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
$forecast->id = $_POST['prod_id'];
$results = $forecast->readOneOnly();

// output in json format
echo $results;
