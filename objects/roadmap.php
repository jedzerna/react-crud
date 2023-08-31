<?php
class RoadMap{

    // database connection and table name
    private $conn;
    private $table_name = "tblroadmap";

    // object properties
    public $id;
    public $refid;
    public $toolname;
    public $createdby;
    public $quarter;
    public $description;
    public $developby;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            $query = "SELECT id
            FROM " . $this->table_name . "
            WHERE toolname = :toolname";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $toolname=htmlspecialchars(strip_tags($this->toolname));
            $stmt->bindParam(':toolname', $toolname);
            $stmt->execute();

            $user = null;
            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($results) >= 1) {
                return false;
                // return 'Your toolname has been added. Please pick another toolname.';
            } else {
                // insert query
                $query = "INSERT INTO tblroadmap
                    SET toolname=:toolname, createdby=:createdby, quarter=:quarter, description=:description, developby=:developby";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $toolname=htmlspecialchars(strip_tags($this->toolname));
                $createdby=htmlspecialchars(strip_tags($this->createdby));
                $quarter=htmlspecialchars(strip_tags($this->quarter));
                $description=htmlspecialchars(strip_tags($this->description));
                $developby=htmlspecialchars(strip_tags($this->developby));

                // bind the parameters
                $stmt->bindParam(':toolname', $toolname);
                $stmt->bindParam(':createdby', $createdby);
                $stmt->bindParam(':quarter', $quarter);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':developby', $developby);


                   


                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }
            }
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
            WHERE toolname = :toolname AND quarter=:quarter";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $toolname=htmlspecialchars(strip_tags($this->toolname));
            $quarter=htmlspecialchars(strip_tags($this->quarter));

            $stmt->bindParam(':toolname', $toolname);
            $stmt->bindParam(':quarter', $quarter);

            $stmt->execute();

            $user = null;
            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($results) >= 1) {
                return false;
            } else {
                // insert query
                $query = "INSERT INTO tblroadmap
                    SET toolname=:toolname, createdby=:createdby, quarter=:quarter, description=:description, developby=:developby";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $toolname=htmlspecialchars(strip_tags($this->toolname));
                $createdby=htmlspecialchars(strip_tags($this->createdby));
                $quarter=htmlspecialchars(strip_tags($this->quarter));
                $description=htmlspecialchars(strip_tags($this->description));
                $developby=htmlspecialchars(strip_tags($this->developby));

                // bind the parameters
                $stmt->bindParam(':toolname', $toolname);
                $stmt->bindParam(':createdby', $createdby);
                $stmt->bindParam(':quarter', $quarter);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':developby', $developby);


                   


                if($stmt->execute()){
                    return true;
                }else{
                    return false;
                }
            }
        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
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
        $query = "SELECT id, toolname,createdby
        FROM ". $this->table_name ."
        WHERE id IN (
            SELECT MIN(id)
            FROM ". $this->table_name ."
            GROUP BY toolname)";
     
        // $query = "SELECT DISTINCT toolname, createdby ,id
        //       FROM ". $this->table_name ." ORDER BY id desc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }     
    public function readAllHori(){

        // $query = "SELECT id, toolname,createdby
        // FROM ". $this->table_name ."
        // WHERE id IN (
        //     SELECT MIN(id)
        //     FROM ". $this->table_name ."
        //     GROUP BY toolname)";
     
        // $stmt = $this->conn->prepare($query);
        // $stmt->execute();

        // $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // return json_encode($products);




        // $query = "SELECT quarter, description FROM tblroadmaplist";
        // $result =$this->conn->query($query);
        
        // $data = array();
        
        // while ($row = $result->fetch_assoc()) {
        //     $quarter = $row["quarter"];
        //     $description = $row["description"];
        
        //     if (!isset($data[$quarter])) {
        //         $data[$quarter] = array();
        //     }
        
        //     $data[$quarter][] = $description;
        // }
        
        // echo json_encode($data);



        // $query = "SELECT tools.id, tools.toolname, tools.category_name, tools.description, categories.categoryname
        //   FROM tools
        //   LEFT JOIN categories ON tools.category_name = categories.categoryname";
        //     $result = $this->conn->query($query);

        //     $data = array();

        //     while ($row = $result->fetchAll(PDO::FETCH_ASSOC)) {
        //         $category = $row["categoryname"];
        //         $toolname = $row["toolname"];
        //         $description = $row["description"];
            
        //         if (!isset($data[$category])) {
        //             $data[$category] = array();
        //         }
            
        //         $data[$category][] = array(
        //             "toolname" => $toolname,
        //             "description" => $description
        //         );
        //     }
            
        //     header("content-type:application/json");
        //     return json_encode($data);

        $query = "SELECT tblroadmap.toolname, tblroadmap.quarter, tblroadmap.description, categories.id AS category_id, categories.categoryname AS category_name
        FROM tblroadmap
        LEFT JOIN categories ON tblroadmap.quarter = categories.categoryname
        ORDER BY categories.id asc";
        $result = $this->conn->query($query);
  
            $products = array();
  
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                $categoryName = $row["quarter"];
                $toolname = $row["toolname"];
                $description = $row["description"];
            
                if (!isset($transformedData[$toolname])) {
                    $transformedData[$toolname] = array();
                }
            
            $transformedData[$toolname][$categoryName] = $description;
            }
            return json_encode($transformedData);


                // $query = "SELECT tools.toolname, tools.category_name, tools.description, categories.categoryname AS category_name
                //         FROM tools
                //         LEFT JOIN categories ON tools.category_name = categories.categoryname";
                // $result = $this->conn->query($query);

                // $data = array();

                // while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                //     $toolname = $row["toolname"];
                //     $categoryName = $row["category_name"];
                //     $description = $row["description"];

                //     if (!isset($data[$toolname])) {
                //         $data[$toolname] = array("toolname" => $toolname);
                //     }

                //     $data[$toolname][$categoryName] = $description;
                // }
                
                // $categories = array_unique(array_column($data, "category_name"));

                // return json_encode(array("categories" => $categories, "tools" => array_values($data)));
    }     
    
    public function readOnlyTool(){

        $query = "SELECT id,toolname,createdby,quarter,description,developby
              FROM " . $this->table_name . " WHERE toolname=:toolname ORDER BY id desc";

        $stmt = $this->conn->prepare($query);

        $toolname = rawurldecode($this->toolname);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }  
    public function readOne(){

        // select one record
        $query = "SELECT toolname, createdby,developby
                    FROM " . $this->table_name . "
                    WHERE toolname=:toolname";

        $stmt = $this->conn->prepare($query);
        $toolname = rawurldecode($this->toolname);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function readOneOnly(){

        $query = "SELECT toolname,createdby,quarter,description,developby
              FROM " . $this->table_name . " WHERE id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function delete($ins){

        $ins = htmlspecialchars(strip_tags($ins));

        $query = "DELETE FROM tblroadmap WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }
    public function deleteToolOnly($ins){

        $ins = htmlspecialchars(strip_tags($ins));

        $query = "DELETE FROM " . $this->table_name . " WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }

    public function deleteAllTool($ins){

        $ins = htmlspecialchars(strip_tags($ins));
        $query = "DELETE FROM tblroadmap WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        // $ins = rawurlencode(implode(",", array_map([$this->conn, 'quote'], ($ins)))); // Quote and join the values
        // $query = "DELETE FROM tblroadmap WHERE toolname IN ($ins)";
        // $stmt = $this->conn->prepare($query);
        
        // if ($stmt->execute()) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
    public function update(){

        $query = "UPDATE tblroadmap
                SET toolname=:toolname, createdby=:createdby, quarter=:quarter, description=:description, developby=:developby
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $toolname=htmlspecialchars(strip_tags($this->toolname));
        $createdby=htmlspecialchars(strip_tags($this->createdby));
        $quarter=htmlspecialchars(strip_tags($this->quarter));
        $description=htmlspecialchars(strip_tags($this->description));
        $developby=htmlspecialchars(strip_tags($this->developby));
        $id=htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':toolname', $toolname);
        $stmt->bindParam(':createdby', $createdby);
        $stmt->bindParam(':quarter', $quarter);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':developby', $developby);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    } public function updateToolOnly(){

        $query = "UPDATE " . $this->table_name . "
                SET description=:description, developby=:developby
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        $description=htmlspecialchars(strip_tags($this->description));
        $developby=htmlspecialchars(strip_tags($this->developby));
        $id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':developby', $developby);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}