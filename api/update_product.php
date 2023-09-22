<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    // product object
    include_once '../objects/product.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $product = new Product($db);

    $result = 'true';
    if(is_null($_POST['department']) || empty($_POST['department'])) {
        $result = "The product department must be filled.";
    } else if(is_null($_POST['toolname']) || empty($_POST['toolname'])) {
        $result = "The toolname must be filled.";
    } else if(is_null($_POST['productname']) || empty($_POST['productname'])) {
        $result = "The productname must be filled.";
    } else if(is_null($_POST['publishers']) || empty($_POST['publishers'])) {
        $result = "The publishers must be filled.";
    } else if(is_null($_POST['activities']) || empty($_POST['activities'])) {
        $result = "The activities must be selected.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be selected.";
    } else {
        // new values
        $product->department = $_POST['department'];
        $product->toolname = $_POST['toolname'];
        $product->productname = $_POST['productname'];
        $product->publishers = $_POST['publishers'];
        $product->activities = $_POST['activities'];
        $product->description = $_POST['description'];
        $product->id = $_POST['id'];
        $result = $product->update() ? "true" : 'false';
    }

    // update the product
    echo $result;
}