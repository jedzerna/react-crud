<?php
// if the form was submitted
if($_POST){

  // include core configuration
  include_once '../../config/core.php';

  // include database connection
  include_once '../../config/database.php';

  // product object
  include_once '../../objects/position.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$Position = new Position($db);

    $ins = "";
    foreach($_POST['del_ids'] as $id){
        $ins.="{$id},";
    }
    $ins = trim($ins, ",");

    //echo $product->delete($ins) ;
    // delete the product
    echo $Position->delete($ins) ? "true" : "false";
}

