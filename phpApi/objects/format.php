<?php


class Format{
	// connessione al database e nome della tabella
   private $conn;

	public function __construct($db){
	   $this->conn = $db;
	}

	//GENERAL
	function readFormats($userId){
		$sql = "SELECT * 
				FROM 
					WWETeuz_BridgeUserFormat 
				JOIN 
					WWETeuz_Format 
					ON (WWETeuz_BridgeUserFormat.formatId = WWETeuz_Format.ID)  
				WHERE 
					WWETeuz_BridgeUserFormat.userId = '$userId'
				ORDER BY 
					WWETeuz_Format.Attivo DESC, 
					WWETeuz_Format.Name ASC;";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function activeFormat($userId, $id, $active){
		$showQuery = "SELECT * 
						FROM 
							WWETeuz_BridgeUserFormat 
						WHERE 
							userId = '$userId' AND 
							formatId = '$id';";
		$shows = $this->conn->query($showQuery);
		if(mysql_num_rows($shows)>0){
			try {
				$sql ="UPDATE `WWETeuz_Format` 
						SET 
							`Attivo`=$active 
						WHERE 
							ID = $id";
				$stmt = $this->conn->query($sql);
				return true;
			} catch (\Throwable $th) {
				return false;
			}
		}
		else{
			return false;
		}
	}

	
}

?>