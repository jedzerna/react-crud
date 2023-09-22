<?php

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/techP.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Pending = new Pending($db);

// read all products
$Pending->id = $_POST['prod_id'];
$results = $Pending->readOne();

// output in json format
echo $results;
