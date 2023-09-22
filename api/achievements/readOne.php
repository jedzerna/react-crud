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
$achievements = new Achievements($db);

// read all products
$achievements->id = $_POST['prod_id'];
$results = $achievements->readOne();

// output in json format
echo $results;
