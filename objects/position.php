<?php
class Position{

    // database connection and table name
    private $conn;
    private $table_name = "tblpositions";

    // object properties
    public $id;
    public $Position;
    public $Experience;
    public $PositionCount;
    public $SkillSets;
    public $Budget;
    public $ReplacementAditional;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO tblpositions
                SET Position=:Position, Experience=:Experience, PositionCount=:PositionCount, SkillSets=:SkillSets, Budget=:Budget, ReplacementAditional=:ReplacementAditional";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $Position=rawurldecode($this->Position);
            $Experience=rawurldecode($this->Experience);
            $PositionCount=rawurldecode($this->PositionCount);
            $SkillSets=rawurldecode($this->SkillSets);
            $Budget=rawurldecode($this->Budget);
            $ReplacementAditional=rawurldecode($this->ReplacementAditional);

            // bind the parameters
            $stmt->bindParam(':Position', $Position);
            $stmt->bindParam(':Experience', $Experience);
            $stmt->bindParam(':PositionCount', $PositionCount);
            $stmt->bindParam(':SkillSets', $SkillSets);
            $stmt->bindParam(':Budget', $Budget);
            $stmt->bindParam(':ReplacementAditional', $ReplacementAditional);

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

        $query = "SELECT id, Position, Experience, PositionCount, SkillSets, Budget, ReplacementAditional 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.Position, p.Experience, p.PositionCount, p.SkillSets, p.Budget, p.ReplacementAditional
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
        $query = "DELETE FROM tblpositions WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $query = "UPDATE tblpositions
                SET Position=:Position, Experience=:Experience, PositionCount=:PositionCount, SkillSets=:SkillSets, Budget=:Budget, ReplacementAditional=:ReplacementAditional
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $Position=rawurldecode($this->Position);
        $Experience=rawurldecode($this->Experience);
        $PositionCount=rawurldecode($this->PositionCount);
        $SkillSets=rawurldecode($this->SkillSets);
        $Budget=rawurldecode($this->Budget);
        $ReplacementAditional=rawurldecode($this->ReplacementAditional);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':Position', $Position);
        $stmt->bindParam(':Experience', $Experience);
        $stmt->bindParam(':PositionCount', $PositionCount);
        $stmt->bindParam(':SkillSets', $SkillSets);
        $stmt->bindParam(':Budget', $Budget);
        $stmt->bindParam(':ReplacementAditional', $ReplacementAditional);
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