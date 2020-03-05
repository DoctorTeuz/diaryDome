<?php


class Albo{
	// connessione al database e nome della tabella
   private $conn;

	public function __construct($db){
	   $this->conn = $db;
	}

	//GENERAL
	function getAlbo(){
		$sql = "SELECT * 
				FROM WWETeuz_Albo
				WHERE
					Status = 1
				ORDER BY Importance ASC, ID DESC
				LIMIT 100000";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	
}

?>