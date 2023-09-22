<?php
// include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

// product object
    include_once '../../objects/achievements.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Achievements = new Achievements($db);

$results = $Achievements->gethighestid();

// output in json format
echo $results;
