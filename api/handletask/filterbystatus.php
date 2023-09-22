<?php
    // include core configuration
    include_once '../../config/core.php';

    // include database connection
    include_once '../../config/database.php';

    // product object
    include_once '../../objects/handletask.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $handle = new HandleTask($db);

// read all products
$handle->status = $_POST['prod_status'];
$results = $handle->filterByStatus();

// output in json format
echo $results;