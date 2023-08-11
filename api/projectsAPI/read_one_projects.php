<?php
    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/projects.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Projects = new Projects($db);

// read all products
$Projects->id = $_POST['prod_id'];
$results = $Projects->readOne();

// output in json format
echo $results;