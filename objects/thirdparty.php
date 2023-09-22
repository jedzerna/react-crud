<?php
class ThirdParty{

    // database connection and table name
    private $conn;
    private $table_name = "thirdparty";

    // object properties
    public $id;
    public $Team;
    public $Purpose;
    public $SoftwareName;
    public $Details;
    public $License;
    public $site;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO thirdparty
                SET Team=:Team, Purpose=:Purpose, SoftwareName=:SoftwareName, Details=:Details, License=:License, site=:site";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $Team=rawurldecode($this->Team);
            $Purpose=rawurldecode($this->Purpose);
            $SoftwareName=rawurldecode($this->SoftwareName);
            $Details=rawurldecode($this->Details);
            $License=rawurldecode($this->License);
            $site=rawurldecode($this->site);

            // bind the parameters
            $stmt->bindParam(':Team', $Team);
            $stmt->bindParam(':Purpose', $Purpose);
            $stmt->bindParam(':SoftwareName', $SoftwareName);
            $stmt->bindParam(':Details', $Details);
            $stmt->bindParam(':License', $License);
            $stmt->bindParam(':site', $site);

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

        $query = "SELECT id, Team, Purpose, SoftwareName, Details, License, site 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.Team, p.Purpose, p.SoftwareName, p.Details, p.License, p.site
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
    public function gethighestid(){
        $query = "SELECT MAX(id) AS max_id FROM " . $this->table_name;
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return json_encode($result['max_id']);
    }

    public function delete($ins){

        // query to delete multiple records
        //$query = "DELETE FROM products WHERE id IN (:ins)";

        // sanitize
        $ins=rawurldecode($ins);

        // bind the parameter
        //$stmt->bindParam(':ins', $ins);
        $query = "DELETE FROM thirdparty WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $query = "UPDATE thirdparty
                SET Team=:Team, Purpose=:Purpose, SoftwareName=:SoftwareName, Details=:Details, License=:License, site=:site
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $Team=rawurldecode($this->Team);
        $Purpose=rawurldecode($this->Purpose);
        $SoftwareName=rawurldecode($this->SoftwareName);
        $Details=rawurldecode($this->Details);
        $License=rawurldecode($this->License);
        $site=rawurldecode($this->site);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':Team', $Team);
        $stmt->bindParam(':Purpose', $Purpose);
        $stmt->bindParam(':SoftwareName', $SoftwareName);
        $stmt->bindParam(':Details', $Details);
        $stmt->bindParam(':License', $License);
        $stmt->bindParam(':site', $site);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}