<?php
class Employee{

    // database connection and table name
    private $conn;
    private $table_name = "tblemployees";

    // object properties
    public $id;
    public $EmployeeID;
    public $EmployeeName;
    public $PrimarySkillsets;
    public $SecondarySkillsets;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

           // insert query
           $query = "INSERT INTO tblemployees
           SET EmployeeID=:EmployeeID,EmployeeName=:EmployeeName, PrimarySkillsets=:PrimarySkillsets, SecondarySkillsets=:SecondarySkillsets";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $EmployeeID=rawurldecode($this->EmployeeID);
            $EmployeeName=rawurldecode($this->EmployeeName);
            $PrimarySkillsets=rawurldecode($this->PrimarySkillsets);
            $SecondarySkillsets=rawurldecode($this->SecondarySkillsets);
            

            // bind the parameters
            $stmt->bindParam(':EmployeeID', $EmployeeID);
            $stmt->bindParam(':EmployeeName', $EmployeeName);
            $stmt->bindParam(':PrimarySkillsets', $PrimarySkillsets);
            $stmt->bindParam(':SecondarySkillsets', $SecondarySkillsets);
           

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

    public function paginate($where = '', $page = 1, $limit = 10, $orderBy = 'EmployeeID', $orderType = 'asc') {
        $query = "SELECT id,EmployeeID,EmployeeName,  PrimarySkillsets, SecondarySkillsets description 
              FROM ". $this->table_name ." 
              WHERE EmployeeID LIKE :where
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
              WHERE EmployeeID LIKE :where
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return count($products);
    }

    public function readAll(){

        //select all data
        $query = "SELECT id,EmployeeID,  EmployeeName, PrimarySkillsets, SecondarySkillsets
              FROM ". $this->table_name ." ORDER BY EmployeeName";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

 
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.EmployeeID, p.EmployeeName, p.PrimarySkillsets, p.SecondarySkillsets
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

    public function update(){

        $query = "UPDATE tblemployees
                SET EmployeeID=:EmployeeID,EmployeeName=:EmployeeName, PrimarySkillsets=:PrimarySkillsets, SecondarySkillsets=:SecondarySkillsets
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $EmployeeID=rawurldecode($this->EmployeeID);
        $EmployeeName=rawurldecode($this->EmployeeName);
        $PrimarySkillsets=rawurldecode($this->PrimarySkillsets);
        $SecondarySkillsets=rawurldecode($this->SecondarySkillsets);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':EmployeeID', $EmployeeID);
        $stmt->bindParam(':EmployeeName', $EmployeeName);
        $stmt->bindParam(':PrimarySkillsets', $PrimarySkillsets);
        $stmt->bindParam(':SecondarySkillsets', $SecondarySkillsets);
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
        $ins=rawurldecode($ins);

        // bind the parameter
        //$stmt->bindParam(':ins', $ins);
        $query = "DELETE FROM tblemployees WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

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