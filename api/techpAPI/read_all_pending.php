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

// $results = $product->readAll();
$results = $Pending->readAll();

// output in json format
echo $results;
