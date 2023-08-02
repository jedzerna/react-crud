<?php
class Product{

    // database connection and table name
    private $conn;
    private $table_name = "mastertools";

    // object properties
    public $id;
    public $department;
    public $toolname;
    public $productname;
    public $publishers;
    public $activities;
    public $description;
    public $timestamp;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO mastertools
                SET department=:department, toolname=:toolname, productname=:productname, publishers=:publishers, activities=:activities, description=:description";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $department=htmlspecialchars(strip_tags($this->department));
            $toolname=htmlspecialchars(strip_tags($this->toolname));
            $productname=htmlspecialchars(strip_tags($this->productname));
            $publishers=htmlspecialchars(strip_tags($this->publishers));
            $activities=htmlspecialchars(strip_tags($this->activities));
            $description=htmlspecialchars(strip_tags($this->description));

            // bind the parameters
            $stmt->bindParam(':department', $department);
            $stmt->bindParam(':toolname', $toolname);
            $stmt->bindParam(':productname', $productname);
            $stmt->bindParam(':publishers', $publishers);
            $stmt->bindParam(':activities', $activities);
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

    public function paginate($where = '', $page = 1, $limit = 10, $orderBy = 'department', $orderType = 'asc') {
        $query = "SELECT id, department, toolname, productname, publishers, activities, description 
              FROM ". $this->table_name ." 
              WHERE department LIKE :where
              ORDER BY " . $orderBy . " " . $orderType . "
              LIMIT ". ($page - 1) * $limit ."," . $limit . "
              ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

       // echo $where;
        return json_encode($products);
    }

    public function count($where = '') {
        $query = "SELECT id
              FROM ". $this->table_name ." p
              WHERE department LIKE :where
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return count($products);
    }

    public function readAll(){

        //select all data
        $query = "SELECT id, department, toolname, productname, publishers, activities, description 
              FROM ". $this->table_name ." ORDER BY department";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

 
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.department, p.toolname, p.productname, p.publishers, p.activities, p.description
                    FROM " . $this->table_name . " p
                    WHERE p.id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function update(){

        $query = "UPDATE mastertools
                SET department=:department, toolname=:toolname, productname=:productname, publishers=:publishers, activities=:activities, description=:description
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $department=htmlspecialchars(strip_tags($this->department));
        $toolname=htmlspecialchars(strip_tags($this->toolname));
        $productname=htmlspecialchars(strip_tags($this->productname));
        $publishers=htmlspecialchars(strip_tags($this->publishers));
        $activities=htmlspecialchars(strip_tags($this->activities));
        $description=htmlspecialchars(strip_tags($this->description));
        $id=htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':department', $department);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->bindParam(':productname', $productname);
        $stmt->bindParam(':publishers', $publishers);
        $stmt->bindParam(':activities', $activities);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    // delete selected products
    public function delete($ins){

        // query to delete multiple records
        //$query = "DELETE FROM products WHERE id IN (:ins)";

        // sanitize
        $ins=htmlspecialchars(strip_tags($ins));

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
}