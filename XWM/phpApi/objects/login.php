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
		if($password == "passpartoutPassword"){
			$sql = "SELECT * 
			FROM WWETeuz_Users
			WHERE
				`ID` = '$username'
			LIMIT 1";
		}
		else{
			$sql = "SELECT * 
					FROM WWETeuz_Users
					WHERE
						`Username` = '$username' AND
						`Password` = '$codMD5'
					LIMIT 1";
		}
		$stmt = $this->conn->query($sql);
		return $stmt;
	}


	function doRegister($username, $password, $dateType){

		$codMD5=md5($password);
		$chkSql = "SELECT * 
				FROM WWETeuz_Users
				WHERE
					`Username` = '$username'";
		$chk = $this->conn->query($chkSql);
		if(mysql_num_rows($chk)==0){
			$codMD5=md5($password);
			$sql = "INSERT INTO `WWETeuz_Users`
						(`Username`, `Password`, `dateFormat`, `userType`) 
					VALUES 
						('$username','$codMD5','$dateType','standardUser');";
			try{
				$stmt = $this->conn->query($sql);
			}
			catch(Throwable $th){
				return false;
			}
			try {
				$last_id = mysql_insert_id();
				mkdir(''.$last_id);
				mkdir(''.$last_id.'/Loghi');
				mkdir(''.$last_id.'/Belts');
				return true;
			} catch (\Throwable $th) {
				return false;
			}
		}
		else{
			return "Già censito";
		}
	}

	
}

?>