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
$RoadMap->toolname = $_POST['prod_toolname'];
$RoadMap->quarter = $_POST['prod_quarter'];
$results = $RoadMap->getWeeklyByQuarterToolname();

// output in json format
echo $results;