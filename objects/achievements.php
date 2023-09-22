<?php
class Achievements{

    // database connection and table name
    private $conn;
    private $table_name = "tblachievements";

    // object properties
    public $id;
    public $date;
    public $month;
    public $year;
    public $team;
    public $achievements;
    public $challenges;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            $date =  $this->year . ' ' . $this->month;
           // insert query
           $query = "INSERT INTO ". $this->table_name ."
           SET date=:date,team=:team, achievements=:achievements, challenges=:challenges";

            $stmt = $this->conn->prepare($query);

            $date=rawurldecode($date);
            $team=rawurldecode($this->team);
            $achievements=rawurldecode($this->achievements);
            $challenges=rawurldecode($this->challenges);
            
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':team', $team);
            $stmt->bindParam(':achievements', $achievements);
            $stmt->bindParam(':challenges', $challenges);
           
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
    public function count($where = '') {
        $query = "SELECT id
              FROM ". $this->table_name ." p
              WHERE date LIKE :where
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return count($products);
    }

    public function readAll(){

        //select all data
        $query = "SELECT id,date,  team, achievements, challenges
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

    public function readAllMonths(){
        
        $query = "SELECT DISTINCT date
              FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }



    public function readAllbyMonth(){

        //select all data
        $query = "SELECT id,date,  team, achievements, challenges
              FROM ". $this->table_name ." WHERE date=:date ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        
        $date=rawurldecode($this->date);
        $stmt->bindParam(':date', $date);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

 
    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.date, p.team, p.achievements, p.challenges
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

        $date =  $this->year . ' ' . $this->month;
        $query = "UPDATE ". $this->table_name ."
                SET date=:date,team=:team, achievements=:achievements, challenges=:challenges
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $date=rawurldecode($date);
        $team=rawurldecode($this->team);
        $achievements=rawurldecode($this->achievements);
        $challenges=rawurldecode($this->challenges);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':team', $team);
        $stmt->bindParam(':achievements', $achievements);
        $stmt->bindParam(':challenges', $challenges);
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
        $query = "DELETE FROM ". $this->table_name ." WHERE id IN ($ins)";
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