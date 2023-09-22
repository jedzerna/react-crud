<?php
class Forecast{

    // database connection and table name
    private $conn;
    private $table_name = "tblforecast";
    private $table_namesec = "tblproducttools";

    // object properties
    public $id;
    public $refid;
    public $columnid;
    public $title;
    public $createdby;
    public $tool;
    public $description;
    public $addedby;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            // $query = "SELECT id
            // FROM " . $this->table_name . "
            // WHERE title = :title";

            // //prepare query for execution
            // $stmt = $this->conn->prepare($query);

            // $title=rawurldecode($this->title));
            // $stmt->bindParam(':title', $title);
            // $stmt->execute();

            // $user = null;
            // $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            // if(count($results) >= 1) {
            //     return false;
            //     // return 'Your title has been added. Please pick another title.';
            // } else {
                // insert query
                $query = "INSERT INTO tblforecast
                    SET title=:title, createdby=:createdby, tool=:tool, description=:description, addedby=:addedby";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $title=rawurldecode($this->title);
                $createdby=rawurldecode($this->createdby);
                $tool=rawurldecode($this->tool);
                $description=rawurldecode($this->description);
                $addedby=rawurldecode($this->addedby);

                // bind the parameters
                $stmt->bindParam(':title', $title);
                $stmt->bindParam(':createdby', $createdby);
                $stmt->bindParam(':tool', $tool);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':addedby', $addedby);


                   


                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }
            // }
        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function createData(){

        try{
            $query = "SELECT id
            FROM " . $this->table_name . "
            WHERE title = :title AND tool=:tool";

            //prepare query for execution
            $stmts = $this->conn->prepare($query);

            $title=rawurldecode($this->title);
            $tool=rawurldecode($this->tool);

            $stmts->bindParam(':title', $title);
            $stmts->bindParam(':tool', $tool);

            $stmts->execute();

            $user = null;
            $results=$stmts->fetchAll(PDO::FETCH_ASSOC);

            if(count($results) > 0) {
                return false;
            } else {
                // insert query
                $query = "INSERT INTO tblforecast
                    SET title=:title, createdby=:createdby, tool=:tool, description=:description, addedby=:addedby";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $title=rawurldecode($this->title);
                $createdby=rawurldecode($this->createdby);
                $tool=rawurldecode($this->tool);
                $description=rawurldecode($this->description);
                $addedby=rawurldecode($this->addedby);

                // bind the parameters
                $stmt->bindParam(':title', $title);
                $stmt->bindParam(':createdby', $createdby);
                $stmt->bindParam(':tool', $tool);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':addedby', $addedby);


                   


                if($stmt->execute()){
                    return 'true';
                }else{
                    return 'false';
                }
            }
        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    
    public function createTool(){
      
 $query = "SELECT id
            FROM tblproducttools
            WHERE toolname=:toolname";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $tool=rawurldecode($this->tool);
            $stmt->bindParam(':toolname', $tool);
            $stmt->execute();
            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($results) >= 1) {
                return false;
                // return 'Your title has been added. Please pick another title.';
            } else {


                $query = "INSERT INTO tblproducttools
                    SET toolname=:toolname";
                $stmt = $this->conn->prepare($query);
                $tool=rawurldecode($this->tool);
                $stmt->bindParam(':toolname', $tool);
                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }
            }
       
    }
    public function readAllCat(){
        $query = "SELECT id, categoryname
        FROM categories ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }   
    public function readAll(){
        $query = "SELECT id, title,createdby
        FROM ". $this->table_name ."
        WHERE id IN (
            SELECT MIN(id)
            FROM ". $this->table_name ."
            GROUP BY title)";
     
        // $query = "SELECT DISTINCT title, createdby ,id
        //       FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }     
    public function readAllHori()
    {
        $query = "SELECT title, tool, description,id
        FROM tblforecast
        ORDER BY id asc";
        $result = $this->conn->query($query);
  
            $products = array();
  
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $categoryName = $row["tool"];
                $title = $row["title"];
                $description = $row["description"];
                $ids = $row["id"];
            
                if (!isset($transformedData[$title])) {
                    $transformedData[$title] = array();
                }
            
            // $transformedData[$title][$categoryName] = $description;
            
            // $transformedData[$title][$categoryName] = 
            //     // "description" => $description,
            //     $description => $ids
            // $combinedData = "$description, {id:$ids}";

            if (!isset($transformedData[$title])) {
                $transformedData[$title] = array();
            }
    
            // Store the combined data in the array
            $transformedData[$title][$categoryName] = $description;

            }
            return json_encode($transformedData);


    }     
    public function readAllDisctincttitle(){
        
        $query = "SELECT DISTINCT title
              FROM ". $this->table_name ." ORDER BY title asc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }
    public function readOnlyTool(){

        $query = "SELECT id,title,createdby,tool,description,addedby
              FROM " . $this->table_name . " WHERE title=:title ORDER BY id desc";

        $stmt = $this->conn->prepare($query);

        $title = rawurldecode($this->title);
        $stmt->bindParam(':title', $title);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT title, createdby,addedby
                    FROM " . $this->table_name . "
                    WHERE title=:title";

        $stmt = $this->conn->prepare($query);
        $title = rawurldecode($this->title);
        $stmt->bindParam(':title', $title);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function readOneOnly(){

        $query = "SELECT title,createdby,tool,description,addedby
              FROM " . $this->table_name . " WHERE id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=rawurldecode($this->id);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function delete($ins){

        $ins = rawurldecode($ins);

        $query = "DELETE FROM tblforecast WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }
    public function deleteToolOnly($ins){

        $ins = rawurldecode($ins);

        $query = "DELETE FROM " . $this->table_name . " WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }

    public function deleteAllTool($ins){

        $ins = rawurldecode($ins);
        $query = "DELETE FROM tblforecast WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function update(){

        $query = "UPDATE tblforecast
                SET title=:title, createdby=:createdby, tool=:tool, description=:description, addedby=:addedby
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $title=rawurldecode($this->title);
        $createdby=rawurldecode($this->createdby);
        $tool=rawurldecode($this->tool);
        $description=rawurldecode($this->description);
        $addedby=rawurldecode($this->addedby);
        $id=rawurldecode($this->id);

        // bind the parameters
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':createdby', $createdby);
        $stmt->bindParam(':tool', $tool);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':addedby', $addedby);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    } public function updateToolOnly(){

        $query = "UPDATE " . $this->table_name . "
                SET description=:description, addedby=:addedby, tool=:tool
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        $description=rawurldecode($this->description);
        $addedby=rawurldecode($this->addedby);
        $tool=rawurldecode($this->tool);
        $id=rawurldecode($this->id);

        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':addedby', $addedby);
        $stmt->bindParam(':tool', $tool);
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
    public function readAllDisctinctToolname(){
        
        $query = "SELECT id,toolname
              FROM tblproducttools ORDER BY id asc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);

      
    }
    public function readToDelete(){

        // select one record
        $query = "SELECT id
                    FROM " . $this->table_name . "
                    WHERE title=:title";

        $stmt = $this->conn->prepare($query);
        $title = rawurldecode($this->title);
        $stmt->bindParam(':title', $title);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function readToToolDelete(){

        $query = "SELECT id
                    FROM " . $this->table_name . "
                    WHERE tool=:tool";

        $stmt = $this->conn->prepare($query);
        $tool = rawurldecode($this->tool);
        $stmt->bindParam(':tool', $tool);
        $stmt->execute();
        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function deleteColumn($ins){
        
        $ins = rawurldecode($ins);
        $query = "DELETE FROM tblforecast WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function deleteColumnByName(){
        
        $query = "DELETE FROM " . $this->table_namesec . " WHERE toolname=:toolname";
        $stmt = $this->conn->prepare($query);
        $tool = rawurldecode($this->tool);
        $stmt->bindParam(':toolname', $tool);
        
        if ($stmt->execute()) {

            return true;
        } else {
            return false;
        }
    }
}