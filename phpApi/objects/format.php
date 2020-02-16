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
					WWETeuz_Format.Label ASC;";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	
}

?>