<?php
class RoadMap{

    // database connection and table name
    private $conn;
    private $table_name = "tblroadmap";
    private $table_nameweekly = "tblroadmapweekly";

    // object properties
    public $id;
    public $refid;
    public $createdby;
    public $quarter;
    public $description;
    public $developby;


    public $toolname;
    public $quarterid;
    public $status;
    public $startdate;
    public $enddate;
    public $userstory;
    public $inchargeby;
    public $weeklydescription;
    public $madeby;


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

            $toolname=rawurldecode($this->toolname);
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
                $toolname=rawurldecode($this->toolname);
                $createdby=rawurldecode($this->createdby);
                $quarter=rawurldecode($this->quarter);
                $description=rawurldecode($this->description);
                $developby=rawurldecode($this->developby);

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

    public function createWeekly(){
        try{
            $query = "SELECT id
            FROM " . $this->table_name . "
            WHERE toolname = :toolname";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $toolname=rawurldecode($this->toolname);
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
                $toolname=rawurldecode($this->toolname);
                $createdby=rawurldecode($this->createdby);
                $quarter=rawurldecode($this->quarter);
                $description=rawurldecode($this->description);
                $developby=rawurldecode($this->developby);

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
    public function readAllHori()
    {
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


    }     
    public function readAllDisctinctToolname(){
        
        $query = "SELECT DISTINCT toolname
              FROM ". $this->table_name ." ORDER BY toolname asc";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
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

        $id=rawurldecode($this->id);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function delete($ins){

        $ins = rawurldecode($ins);

        $query = "DELETE FROM tblroadmap WHERE id IN ($ins)";
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
        $query = "DELETE FROM tblroadmap WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function update(){

        $query = "UPDATE tblroadmap
                SET toolname=:toolname, createdby=:createdby, quarter=:quarter, description=:description, developby=:developby
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $toolname=rawurldecode($this->toolname);
        $createdby=rawurldecode($this->createdby);
        $quarter=rawurldecode($this->quarter);
        $description=rawurldecode($this->description);
        $developby=rawurldecode($this->developby);
        $id=rawurldecode($this->id);

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
                SET description=:description, developby=:developby, quarter=:quarter
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        $description=rawurldecode($this->description);
        $developby=rawurldecode($this->developby);
        $quarter=rawurldecode($this->quarter);
        $id=rawurldecode($this->id);

        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':developby', $developby);
        $stmt->bindParam(':quarter', $quarter);
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
    
    public function createDatafromToolname(){

        try{
            $query = "INSERT INTO tblroadmap
            SET toolname=:toolname, createdby=:createdby, quarter=:quarter, description=:description, developby=:developby";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $toolname=rawurldecode($this->toolname);
            $createdby=rawurldecode($this->createdby);
            $quarter=rawurldecode($this->quarter);
            $description=rawurldecode($this->description);
            $developby=rawurldecode($this->developby);

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

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function createData(){

        try{
            $sduedate = empty($this->enddate) ? null : $this->enddate;
                // insert query
                $query = "INSERT INTO " . $this->table_nameweekly . "
                    SET toolname=:toolname, quarterid=:quarterid, status=:status, startdate=:startdate, enddate=:enddate, userstory=:userstory, developby=:developby, description=:description, createdby=:createdby";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $toolname=rawurldecode($this->toolname);
                $quarterid=rawurldecode($this->quarterid);
                $status=rawurldecode($this->status);
                $startdate=rawurldecode($this->startdate);
                $userstory=rawurldecode($this->userstory);
                $developby=rawurldecode($this->developby);
                $description=rawurldecode($this->description);
                $createdby=rawurldecode($this->createdby);

                // bind the parameters
                
                if ($sduedate === null) {
                    $stmt->bindValue(':enddate', null, PDO::PARAM_NULL);
                } else {
                    $sduedate = rawurldecode($sduedate);
                    $stmt->bindParam(':enddate', $sduedate);
                }

                $stmt->bindParam(':toolname', $toolname);
                $stmt->bindParam(':quarterid', $quarterid);
                $stmt->bindParam(':status', $status);
                $stmt->bindParam(':startdate', $startdate);
                $stmt->bindParam(':userstory', $userstory);
                $stmt->bindParam(':developby', $developby);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':createdby', $createdby);


                   


                if($stmt->execute()){
                    return 'true';
                }else{
                    return 'false';
                }
            
        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }
    public function getWeeklyByQuarterToolname() {
        // Select one record based on toolname and quarter
        $query = "SELECT id
                  FROM " . $this->table_name . "
                  WHERE toolname=:toolname AND quarter=:quarter";
    
        $stmt = $this->conn->prepare($query);
        $toolname = rawurldecode($this->toolname);
        $quarter = rawurldecode($this->quarter);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->bindParam(':quarter', $quarter);
        $stmt->execute();
    
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Check if any results were found
        if (count($results) > 0) {
            // Get the first result's id
            $firstResultId = $results[0]['id'];
    
            // Now you can add another query that references the id
            $secondQuery = "SELECT *
                            FROM " . $this->table_nameweekly . "
                            WHERE quarterid=:quarterid";
    
            $stmt = $this->conn->prepare($secondQuery);
            $stmt->bindParam(':quarterid', $firstResultId);
            $stmt->execute();
    
            $secondResults = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            
            return json_encode($secondResults);
        }
    
        // If no results found, return an empty array or handle it accordingly
        
        return json_encode([]);
    }

    public function readOneWeeklyStatus(){
        $query = "SELECT *
        FROM " . $this->table_nameweekly . " WHERE id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=rawurldecode($this->id);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function updateWeeklyStatus(){

        $sduedate = empty($this->enddate) ? null : $this->enddate;
        $query = "UPDATE " . $this->table_nameweekly . "
                SET toolname=:toolname, quarterid=:quarterid, status=:status, startdate=:startdate, enddate=:enddate, userstory=:userstory, developby=:developby, description=:description
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        $toolname=rawurldecode($this->toolname);
        $quarterid=rawurldecode($this->quarterid);
        $status=rawurldecode($this->status);
        $startdate=rawurldecode($this->startdate);
        $userstory=rawurldecode($this->userstory);
        $developby=rawurldecode($this->developby);
        $description=rawurldecode($this->description);


        $id=rawurldecode($this->id);

        if ($sduedate === null) {
            $stmt->bindValue(':enddate', null, PDO::PARAM_NULL);
        } else {
            $sduedate = rawurldecode($sduedate);
            $stmt->bindParam(':enddate', $sduedate);
        }


        $stmt->bindParam(':toolname', $toolname);
        $stmt->bindParam(':quarterid', $quarterid);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':startdate', $startdate);
        $stmt->bindParam(':userstory', $userstory);
        $stmt->bindParam(':developby', $developby);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
    public function deleteWeeklyStatus($ins){

        $ins = rawurldecode($ins);
        $query = "DELETE FROM tblroadmapweekly WHERE id IN ($ins)";
        $stmt = $this->conn->prepare($query);
        
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function getrecentdate(){
        $query = "SELECT MAX(id) AS max_id FROM " . $this->table_nameweekly . " WHERE toolname=:toolname AND quarterid=:quarterid AND enddate IS NOT NULL";
    
        $stmt = $this->conn->prepare($query);
        
        $quarterid=rawurldecode($this->quarterid);
        $toolname=rawurldecode($this->toolname);
        $stmt->bindParam(':quarterid', $quarterid);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->execute();
    
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    

        if (count($result) > 0) {
            // Get the first result's id
            $firstResultId = $result['max_id'];
    
            // Now you can add another query that references the id
            $secondQuery = "SELECT *
                            FROM " . $this->table_nameweekly . "
                            WHERE id=:id";
    
            $stmt = $this->conn->prepare($secondQuery);
            $stmt->bindParam(':id', $firstResultId);
            $stmt->execute();
    
            $secondResults = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            
            return json_encode($secondResults);
        }
    }
    public function getquateranddescription(){

        $query = "SELECT 
        s.id AS weekly_id
        , s.description AS description_det
        , s.quarter AS quarter_det
        , s.developby AS developby_det
        , s.createdby AS createdby_det
        FROM " . $this->table_name . " s";
    
        $data = array();
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        foreach ($results as $row) {
            
            $weekly_id = $row["weekly_id"];
            $quarter_det = $row["quarter_det"];
            $description_det = $row["description_det"];
            $createdby_det = $row["createdby_det"];


            $query2 = "SELECT 
            s.id AS weekly_id
            , c.userstory AS userstory_det
            , c.description AS description_det
            FROM " . $this->table_nameweekly . " c";
        
            $data2 = array();
        
            $stmt2 = $this->conn->prepare($query2);
            $stmt2->execute();
    
            $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
              if (count($results2) > 0) {
                foreach ($results2 as $row2) {
                    
                    $userstory_det = $row["userstory_det"];
                    $description_det = $row["description_det"];
                    

                    $data2[] = array(
                        "userstory_det" => $userstory_det,
                        "description_det" => $description_det
                    );
                }
            }

            $toolname_name = array($data2
            );
            
            // Add data to the array
            $data[] = array(
                "weekly_id" => $weekly_id,
                "quarter_det" => $quarter_det,
                "description_det" => $description_det,
                "createdby_det" => $createdby_det,
                "toolname_name" => $toolname_name
            );
        }
    }

    return json_encode($data);
    }




    public function getquateranddescription2() {


       $query = "SELECT 
        s.id AS id
        , s.description AS description_det
        , s.quarter AS quarter_det
        , s.developby AS developby_det
        , s.createdby AS createdby_det
        , s.toolname AS toolname_det
        FROM " . $this->table_name . " s WHERE toolname=:toolname";
    
        $data = array();
    
        $stmt = $this->conn->prepare($query);
        $toolname=rawurldecode($this->toolname);
        $stmt->bindParam(':toolname', $toolname);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if (count($results) > 0) {
            foreach ($results as $row) {
                // Consider validating and sanitizing data here if needed.
                $id = $row["id"];
                $toolname_det = $row["toolname_det"];
                $quarter_det = $row["quarter_det"];
                $description_det = $row["description_det"];
                $developby_det = $row["developby_det"];
                $createdby_det = $row["createdby_det"];
                // $toolname_name = array(
                //     "toolname" => $row["toolname_name"],
                //     "nestedArray" => array(
                //         // Add nested array data here
                //         "nestedField1" => "Value1",
                //         "nestedField2" => "Value2",
                //     ),
                // );
    
                // Execute another query
                $query2 = "SELECT id,quarterid,userstory, description,developby,startdate,enddate,status,createdby FROM " . $this->table_nameweekly . " WHERE quarterid=:quarter_id"; // Corrected placeholder name

                $stmt2 = $this->conn->prepare($query2);
                
                // Bind the correct placeholder name and value
                $stmt2->bindParam(':quarter_id', $id); // Corrected placeholder name
                $stmt2->execute();
    
                $nestedData = array();
    
                $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
                foreach ($results2 as $row2) {
                    // Consider validating and sanitizing data here if needed.
                    $field1 = $row2["id"];
                    $field2 = $row2["quarterid"];
                    $field3 = $row2["userstory"];
                    $field4 = $row2["description"];
                    $field5 = $row2["developby"];
                    $field6 = $row2["startdate"];
                    $field7 = $row2["enddate"];
                    $field8 = $row2["status"];
                    $field9 = $row2["createdby"];
    
                    // Add data to the nested array
                    $nestedData[] = array(
                        "id" => (int)$field1,
                        "quarterid" => (int)$field2,
                        "userstory" => $field3,
                        "description" => $field4,
                        "developby" => $field5,
                        "startdate" => $field6,
                        "enddate" => $field7,
                        "status" => $field8,
                        "createdby" => $field9,
                    );
                }
    
                // Add the nested data to the $toolname_name array
                $toolname_name["nestedArray2"] = $nestedData;
                
                // Add data to the main data array
                $data[] = array(
                    "id" => (int)$id,
                    "toolname_det" => $toolname_det,
                    "quarter_det" => $quarter_det,
                    "description_det" => $description_det,
                    "developby_det" => $developby_det,
                    "createdby_det" => $createdby_det,
                    "weeklylist" => $nestedData,
                    "isExpanded" => false
                );
            }
        }
    
        return json_encode($data);
    }
    
}
