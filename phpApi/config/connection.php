<?php


class Connection{
	//connessione site by site
	private $host = "localhost";
	private $db_name = "my_wrestlingdiaries";
	private $username = "wrestlingdiaries";
	private $password = "";
/* 	private $host = "http://wrestlingdiaries.altervista.org/DiaryDome"; //nome dell'host o indirizzo IP del server
	private $db_name = "my_wrestlingdiaries"; //nome del DB
	private $username = "wrestlingdiaries"; //username
	private $password = ""; */
	
	public $conn; //contiene la connessione

	// controllo sulle connessioni attive
	private $attiva = false;

	public function connetti(){
		if(!$this->attiva){
			if($connessione = mysql_connect($this->host,$this->username,$this->password) 
				or die (mysql_error())){
			// selezione del database
				$selezione = mysql_select_db($this->db_name, $connessione) 
							or die (mysql_error());
			}
		}else{
			return true;
		}
	}
	
	public function disconnetti(){
		if($this->attiva){
			if(mysql_close()){
				$this->attiva = false;
				return true;
			}else{
				return false;
			}
		}
	}

	public function query($sql){
		if(isset($this->attiva)){
			$sql = mysql_query($sql) or die (mysql_error());
			return $sql;
		}else{
			return false;
		}
	}

	public function estraiArray($risultato){
		if(isset($this->attiva)){
			$array = [];
			while($r = mysql_fetch_array($risultato)){
				array_push($array, $r);
			};
			return $array;
		}else{
			return false;
		}
	}

	public function estraiAssoc($risultato){
		if(isset($this->attiva)){
			$r = mysql_fetch_assoc($risultato);
			return $r;
		}else{
			return false;
		}
	}
}

?>