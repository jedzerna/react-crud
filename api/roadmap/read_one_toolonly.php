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

// read all products
$RoadMap->id = $_POST['prod_id'];
$results = $RoadMap->readOneOnly();

// output in json format
echo $results;
