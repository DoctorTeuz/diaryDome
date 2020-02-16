<?php


class Login{
	// connessione al database e nome della tabella
   private $conn;

	public function __construct($db){
	   $this->conn = $db;
	}

	//GENERAL
	function tryLogin($username, $password){
		$codMD5=md5($password);
		$sql = "SELECT * 
				FROM WWETeuz_Users
				WHERE
					`Username` = '$username' AND
					`Password` = '$codMD5'
				LIMIT 1";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}


	function doRegister($username, $password, $dateType){
		$codMD5=md5($password);
		$sql = "INSERT INTO `WWETeuz_Users`
					(`Username`, `Password`, `dateFormat`, `userType`) 
				VALUES 
					('$username','$codMD5','$dateType','standardUser');";
		try{
			$stmt = $this->conn->query($sql);
			return true;
		}
		catch(Throwable $th){
			return false;
		}
		
	}

	
}

?>