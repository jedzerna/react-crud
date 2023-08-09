<?php
// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

// product object
include_once '../objects/thirdparty.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$ThirdParty = new ThirdParty($db);

// $results = $product->readAll();
$results = $ThirdParty->readAll();

// output in json format
echo $results;
