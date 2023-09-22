<?php
class MasterTools{

    // database connection and table name
    private $conn;
    private $table_name = "mastertools";

    // object properties
    public $id;
    public $department;
    public $toolname;
    public $productname;
    public $activities;
    public $publishers;
    public $description;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO mastertools
                SET department=:department, toolname=:toolname, productname=:productname, activities=:activities, publishers=:publishers, description=:description";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $department=rawurldecode($this->department);
            $toolname=rawurldecode($this->toolname);
            $productname=rawurldecode($this->productname);
            $activities=rawurldecode($this->activities);
            $publishers=rawurldecode($this->publishers);
            $description=rawurldecode($this->description);

            // bind the parameters
            $stmt->bindParam(':department', $department);
            $stmt->bindParam(':toolname', $toolname);
            $stmt->bindParam(':productname', $productname);
            $stmt->bindParam(':activities', $activities);
            $stmt->bindParam(':publishers', $publishers);
            $stmt->bindParam(':description', $description);

            // we need the created variable to know when the record was created
            // also, to comply with strict standards: only variables should be passed by reference
            //$created=date('Y-m-d H:i:s');
            //$stmt->bindParam(':created', $created);

            // Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

   
    public function readAll(){

        $query = "SELECT id, department, toolname, productname, activities, publishers, description 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.department, p.toolname, p.productname, p.activities, p.publishers, p.description
                    FROM " . $this->table_name . " p
                    WHERE p.id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=rawurldecode($this->id);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function delete($ins){

        // query to delete multiple records
        //$query = "DELETE FROM products WHERE id IN (:ins)";

        // sanitize
        $ins=rawurldecode($ins);

        // bind the parameter
        //$stmt->bindParam(':ins', $ins);
        $query = "DELETE FROM mastertools WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $query = "UPDATE mastertools
                SET department=:department, toolname=:toolname, productname=:productname, activities=:activities, publishers=:publishers, description=:description
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $department=rawurldecode($this->department);
        $toolname=rawurldecode($this->toolname);
        $productname=rawurldecode($this->productname);
        $activities=rawurldecode($this->activities);
        $publishers=rawurldecode($this->publishers);
        $description=rawurldecode($this->description);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':department', $department);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->bindParam(':productname', $productname);
        $stmt->bindParam(':activities', $activities);
        $stmt->bindParam(':publishers', $publishers);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function gethighestid(){
        $query = "SELECT MAX(id) AS max_id FROM " . $this->table_name;
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return json_encode($result['max_id']);
    }
}