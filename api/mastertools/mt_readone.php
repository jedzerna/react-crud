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

// read all products
$master->id = $_POST['prod_id'];
$results = $master->readOne();

// output in json format
echo $results;
