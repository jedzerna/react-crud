<?php
class Projects{

    // database connection and table name
    private $conn;
    private $table_name = "tblprojects";

    // object properties
    public $id;
    public $SkillSets;
    public $SrEngineers;
    public $Intermediates;
    public $JrEngineers;
    public $SubTeam;
    public $Team;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO tblprojects
                SET SkillSets=:SkillSets, SrEngineers=:SrEngineers, Intermediates=:Intermediates, JrEngineers=:JrEngineers, SubTeam=:SubTeam, Team=:Team";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $SkillSets=htmlspecialchars(strip_tags($this->SkillSets));
            $SrEngineers=htmlspecialchars(strip_tags($this->SrEngineers));
            $Intermediates=htmlspecialchars(strip_tags($this->Intermediates));
            $JrEngineers=htmlspecialchars(strip_tags($this->JrEngineers));
            $SubTeam=htmlspecialchars(strip_tags($this->SubTeam));
            $Team=htmlspecialchars(strip_tags($this->Team));

            // bind the parameters
            $stmt->bindParam(':SkillSets', $SkillSets);
            $stmt->bindParam(':SrEngineers', $SrEngineers);
            $stmt->bindParam(':Intermediates', $Intermediates);
            $stmt->bindParam(':JrEngineers', $JrEngineers);
            $stmt->bindParam(':SubTeam', $SubTeam);
            $stmt->bindParam(':Team', $Team);

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

        $query = "SELECT id, SkillSets, SrEngineers, Intermediates, JrEngineers, SubTeam, Team 
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.SkillSets, p.SrEngineers, p.Intermediates, p.JrEngineers, p.SubTeam, p.Team
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
        $query = "DELETE FROM tblprojects WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function update(){

        $query = "UPDATE tblprojects
                SET SkillSets=:SkillSets, SrEngineers=:SrEngineers, Intermediates=:Intermediates, JrEngineers=:JrEngineers, SubTeam=:SubTeam, Team=:Team
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $SkillSets=htmlspecialchars(strip_tags($this->SkillSets));
        $SrEngineers=htmlspecialchars(strip_tags($this->SrEngineers));
        $Intermediates=htmlspecialchars(strip_tags($this->Intermediates));
        $JrEngineers=htmlspecialchars(strip_tags($this->JrEngineers));
        $SubTeam=htmlspecialchars(strip_tags($this->SubTeam));
        $Team=htmlspecialchars(strip_tags($this->Team));
        $id=htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':SkillSets', $SkillSets);
        $stmt->bindParam(':SrEngineers', $SrEngineers);
        $stmt->bindParam(':Intermediates', $Intermediates);
        $stmt->bindParam(':JrEngineers', $JrEngineers);
        $stmt->bindParam(':SubTeam', $SubTeam);
        $stmt->bindParam(':Team', $Team);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}