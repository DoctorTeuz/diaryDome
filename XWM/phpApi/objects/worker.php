<?php


class Worker{
	// connessione al database e nome della tabella
   private $conn;

   	// proprietà dell'oggetto
	public $ID;
	public $Name;

	public function __construct($db){
	   $this->conn = $db;
	}

	//GENERAL
	function getWorker(){
		$sql = "SELECT * 
				FROM WWETeuz_Worker
				
				ORDER BY Ringname ASC 
				LIMIT 1000";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	

	function getDivision(){
		$sql = "SELECT DISTINCT workerId, Division
				FROM (SELECT * FROM WWETeuz_WorkerDivisions ORDER BY ID DESC) AS T
				GROUP BY workerId
				ORDER BY workerId ASC
				LIMIT 1000";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}



	function getBrand(){
		$sql = "SELECT DISTINCT workerId, Brand
				FROM (SELECT * FROM WWETeuz_WorkerBrands ORDER BY ID DESC) AS T
				GROUP BY workerId
				ORDER BY workerId ASC
				LIMIT 1000";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}
	
	function getChampions(){
		$sql = "SELECT * 
				FROM WWETeuz_Albo 
				WHERE 
					Duration IS NULL AND 
					RunnerUp IS NULL AND 
					CashIn IS NULL
				ORDER BY Importance ASC;";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getSingleWorker($id){
		$sql = "SELECT * 
				FROM WWETeuz_Worker
				WHERE ID = $id
				LIMIT 1";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getDivisionSingleWorker($id){
		$sql = "SELECT Division
				FROM WWETeuz_WorkerDivisions
				WHERE workerId = $id
				ORDER BY ID DESC
				LIMIT 1";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getBrandSingleWorker($id){
		$sql = "SELECT Brand
				FROM WWETeuz_WorkerBrands
				WHERE workerId = $id
				ORDER BY ID DESC
				LIMIT 1";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getAlbo($ringName, $aliases){
		$aliasSql = "";
		for($i=0; $i<count($aliases); $i++){
			$aliasSql .= "OR Champion = '$aliases[$i]' OR
			TagPartner1 = '$aliases[$i]' OR
			TagPartner2 = '$aliases[$i]' OR
			TagPartner3 = '$aliases[$i]'";
		}
		$sql = "SELECT *, COUNT(*) as Reign, SUM(Duration) AS Tot
		FROM (SELECT * FROM WWETeuz_Albo 
			WHERE 
				Champion = '$ringName' OR
				TagPartner1 = '$ringName' OR
				TagPartner2 = '$ringName' OR
				TagPartner3 = '$ringName' 
				$aliasSql
				ORDER BY ID DESC
			 ) AS t
		GROUP BY Title 
		ORDER BY Importance ASC
		";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getWorkerAliases($id){
		$sql = "SELECT AlterEgo AS Alias
				FROM WWETeuz_AlterEgoes
				WHERE workerId = $id";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getWorkerFinishers($id){
		$sql = "SELECT Finisher
				FROM WWETeuz_Finishers
				WHERE workerId = $id";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getWorkerSignatures($id){
		$sql = "SELECT Trademark
				FROM WWETeuz_Signatures
				WHERE workerId = $id";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getWorkerNicknames($id){
		$sql = "SELECT Nickname
				FROM WWETeuz_NickNames
				WHERE workerId = $id";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function getAlumniByUser($userId){
		$sql = "SELECT *
				FROM 
					DiaryDome_Alumni 
				WHERE 
					userId = $userId;";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}
}

?>