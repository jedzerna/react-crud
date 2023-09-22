<?php
class HandleTask{

    // database connection and table name
    private $conn;
    private $table_name = "tblhandletask";

    // object properties
    public $id;
    public $action;
    public $dateraised;
    public $responsible;
    public $duedate;
    public $status;
    public $remarks;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            // If $this->duedate is empty, $sduedate will be null; otherwise, it will have a value.
            $sduedate = empty($this->duedate) ? null : $this->duedate;
    
            $query = "INSERT INTO tblhandletask
                SET action=:action, dateraised=:dateraised, responsible=:responsible, duedate=:duedate, status=:status, remarks=:remarks";
    
            $stmt = $this->conn->prepare($query);
    
            // Sanitize and validate input
            $action = rawurldecode($this->action);
            $dateraised = rawurldecode($this->dateraised);
            $responsible = rawurldecode($this->responsible);
            $status = rawurldecode($this->status);
            $remarks = rawurldecode($this->remarks);
    
            $stmt->bindParam(':action', $action);
            $stmt->bindParam(':dateraised', $dateraised);
            $stmt->bindParam(':responsible', $responsible);
    
            // Bind $sduedate, which may be null if $this->duedate is empty.
            if ($sduedate === null) {
                $stmt->bindValue(':duedate', null, PDO::PARAM_NULL);
            } else {
                $sduedate = rawurldecode($sduedate);
                $stmt->bindParam(':duedate', $sduedate);
            }
    
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':remarks', $remarks);
    
            if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        } catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

   
    public function readAll(){

        $query = "SELECT id, action, dateraised, responsible, duedate, status, remarks 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.action, p.dateraised, p.responsible, p.duedate, p.status, p.remarks
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

    public function filterByStatus(){

        // select one record
        $query = "SELECT id, action, dateraised, responsible, duedate, status, remarks
                    FROM " . $this->table_name . " 
                    WHERE status=:status";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $status=rawurldecode($this->status);
        $stmt->bindParam(':status', $status);
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
        $query = "DELETE FROM tblhandletask WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $sduedate = empty($this->duedate) ? null : $this->duedate;
        $query = "UPDATE tblhandletask
                SET action=:action, dateraised=:dateraised, responsible=:responsible, duedate=:duedate, status=:status, remarks=:remarks
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $action=rawurldecode($this->action);
        $dateraised=rawurldecode($this->dateraised);
        $responsible=rawurldecode($this->responsible);
        $status=rawurldecode($this->status);
        $remarks=rawurldecode($this->remarks);
        $id=rawurldecode($this->id);

        // bind the parameters

        if ($sduedate === null) {
            $stmt->bindValue(':duedate', null, PDO::PARAM_NULL);
        } else {
            $sduedate = rawurldecode($sduedate);
            $stmt->bindParam(':duedate', $sduedate);
        }
        $stmt->bindParam(':action', $action);
        $stmt->bindParam(':dateraised', $dateraised);
        $stmt->bindParam(':responsible', $responsible);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':remarks', $remarks);
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