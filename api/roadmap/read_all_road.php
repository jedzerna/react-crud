<?php

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/roadmap.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$RoadMap = new RoadMap($db);

// $results = $product->readAll();
$results = $RoadMap->readAll();

// output in json format
echo $results;
