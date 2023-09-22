<?php
class Pending{

    // database connection and table name
    private $conn;
    private $table_name = "techpending";

    // object properties
    public $id;
    public $Team;
    public $Publisher;
    public $ProjectDetails;
    public $ReceivedDate;
    public $DueDate;
    public $CurrentStatus;
    public $Remarks;
    

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO techpending
                SET Team=:Team, Publisher=:Publisher, ProjectDetails=:ProjectDetails, ReceivedDate=:ReceivedDate, DueDate=:DueDate, CurrentStatus=:CurrentStatus, Remarks=:Remarks";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $Team=htmlspecialchars(strip_tags($this->Team));
            $Publisher=htmlspecialchars(strip_tags($this->Publisher));
            $ProjectDetails=htmlspecialchars(strip_tags($this->ProjectDetails));
            $ReceivedDate=htmlspecialchars(strip_tags($this->ReceivedDate));
            $DueDate=htmlspecialchars(strip_tags($this->DueDate));
            $CurrentStatus=htmlspecialchars(strip_tags($this->CurrentStatus));
            $Remarks=htmlspecialchars(strip_tags($this->Remarks));


            // bind the parameters
            $stmt->bindParam(':Team', $Team);
            $stmt->bindParam(':Publisher', $Publisher);
            $stmt->bindParam(':ProjectDetails', $ProjectDetails);
            $stmt->bindParam(':ReceivedDate', $ReceivedDate);
            $stmt->bindParam(':DueDate', $DueDate);
            $stmt->bindParam(':CurrentStatus', $CurrentStatus);
            $stmt->bindParam(':Remarks', $Remarks);

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

        $query = "SELECT id, Team, Publisher, ProjectDetails, ReceivedDate, DueDate, CurrentStatus, Remarks 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.Team, p.Publisher, p.ProjectDetails, p.ReceivedDate, p.DueDate, p.CurrentStatus, p.Remarks
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

    public function delete($ins){

        // query to delete multiple records
        //$query = "DELETE FROM products WHERE id IN (:ins)";

        // sanitize
        $ins=htmlspecialchars(strip_tags($ins));

        // bind the parameter
        //$stmt->bindParam(':ins', $ins);
        $query = "DELETE FROM techpending WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $query = "UPDATE techpending
                SET Team=:Team, Publisher=:Publisher, ProjectDetails=:ProjectDetails, ReceivedDate=:ReceivedDate, DueDate=:DueDate, CurrentStatus=:CurrentStatus, Remarks=:Remarks
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $Team=urldecode($this->Team);
        $Publisher=urldecode($this->Publisher);
        $ProjectDetails=urldecode($this->ProjectDetails);
        $ReceivedDate=urldecode($this->ReceivedDate);
        $DueDate=urldecode($this->DueDate);
        $CurrentStatus=urldecode($this->CurrentStatus);
        $Remarks=urldecode($this->Remarks);
        $id=urldecode($this->id);
        

        // bind the parameters
        $stmt->bindParam(':Team', $Team);
        $stmt->bindParam(':Publisher', $Publisher);
        $stmt->bindParam(':ProjectDetails', $ProjectDetails);
        $stmt->bindParam(':ReceivedDate', $ReceivedDate);
        $stmt->bindParam(':DueDate', $DueDate);
        $stmt->bindParam(':CurrentStatus', $CurrentStatus);
        $stmt->bindParam(':Remarks', $Remarks);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function pgethighestid(){
        $query = "SELECT MAX(id) AS max_id FROM " . $this->table_name;
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return json_encode($result['max_id']);
    }
}