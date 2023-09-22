<?php

    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/mastertools.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$master = new MasterTools($db);

// $results = $product->readAll();
$results = $master->readAll();

// output in json format
echo $results;
