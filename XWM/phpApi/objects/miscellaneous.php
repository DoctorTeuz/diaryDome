<?php


class Misc{
	// connessione al database e nome della tabella
   private $conn;


	public function __construct($db){
	   $this->conn = $db;
	}
	
	function getTeuzLastShowDateQuery(){
		$sql = "SELECT *
					FROM WWETeuz_Show 
					JOIN 
						WWETeuz_Format ON (WWETeuz_Show.formatId = WWETeuz_Format.ID) 
					JOIN 
						WWETeuz_BridgeUserShow ON (WWETeuz_Show.ID = WWETeuz_BridgeUserShow.showId) 
					WHERE 
						WWETeuz_BridgeUserShow.userId = '1'
					ORDER BY WWETeuz_Show.ID DESC
					LIMIT 1"; 
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getMenu(){
		$sql = "SELECT *
					FROM DiaryDome_Menu 
					ORDER BY 
						Padre ASC,
						Posizione ASC"; 
		$stmt = $this->conn->query($sql);
		return $stmt;
	}
}

?>