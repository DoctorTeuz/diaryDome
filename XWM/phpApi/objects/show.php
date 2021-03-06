<?php


class Show{
	// connessione al database e nome della tabella
   private $conn;

	public function __construct($db){
	   $this->conn = $db;
	}

	//GENERAL
	function readShowList($userId){
		$sql = "SELECT 
			 	WWETeuz_Show.Label AS Label,
				Posted,
				WWETeuz_Show.DayWeek AS DayWeek,
				WWETeuz_Show.Week AS Week,
				WWETeuz_Show.`Month` AS M,
				WWETeuz_Show.`Year` AS Y,
				Attendance,
				Arena,
				City,
				SoldOut,
				Graduation,
				WWETeuz_Show.Picture,
				WWETeuz_Show.EventType AS EventType,
				WWETeuz_Show.ID AS ID,
				WWETeuz_Format.ID AS formatId,
				soldOutColor
				FROM WWETeuz_Show 
				JOIN WWETeuz_Format 
					ON (WWETeuz_Show.formatId = WWETeuz_Format.ID) 
				JOIN WWETeuz_BridgeUserShow 
					ON (WWETeuz_Show.ID = WWETeuz_BridgeUserShow.showId) 
				WHERE WWETeuz_BridgeUserShow.userId = '$userId'
				ORDER BY WWETeuz_Show.ID DESC";
		$stmt = $this->conn->query($sql);
		return $stmt;
	}

	function createShow($sh){
		$sql ="INSERT INTO 
					`WWETeuz_Show`(`Label`, `Posted`, `Year`, `EventType`, `formatId`, 
							`DayWeek`, `Week`, `Month`, `Attendance`, `Arena`, `City`, 
							`SoldOut`, `Graduation`, `Picture`) 
					VALUES 
					(
						'$sh->showLabel',
						0,
						'$sh->year',
						'$sh->eventType',
						'$sh->formatID',
						'$sh->dayWeek',
						'$sh->week',
						'$sh->month',
						$sh->attendance,
						'$sh->arena',
						'$sh->city',
						$sh->soldout,
						'$sh->rating',
						'$sh->showPicture'
						)";
						
		$stmt = $this->conn->query($sql);
		$last_Id = mysql_insert_id();
		return $last_Id;
	}

	function createBridge($userId, $last_id){
		$sql ="INSERT INTO 
					`WWETeuz_BridgeUserShow` 
						(`userId`, `showId`) 
					VALUES 
						('$userId','$last_id')";
						
		$stmt = $this->conn->query($sql);
		$last_Id = mysql_insert_id();
		return $last_Id;
	}

	function delete($userId, $id){
		$showQuery = "SELECT * 
						FROM 
							WWETeuz_BridgeUserShow 
						WHERE 
							userId = '$userId' AND 
							showId = '$id';";
		$shows = $this->conn->query($showQuery);
		if(mysql_num_rows($shows)>0){
			try {
				$query = "DELETE FROM `WWETeuz_Show` WHERE `ID` = '$id'";
				$delete = $this->conn->query($query);
				$query = "DELETE FROM `WWETeuz_ShowAngles` WHERE `ID_Show` = '$id'";
				$delete = $this->conn->query($query);
				return true;
			} catch (\Throwable $th) {
				return false;
			}
		}
		else{
			return false;
		}
	}

	function publishShow($userId, $id, $posted){
		$showQuery = "SELECT * 
						FROM 
							WWETeuz_BridgeUserShow 
						WHERE 
							userId = '$userId' AND 
							showId = '$id';";
		$shows = $this->conn->query($showQuery);
		if(mysql_num_rows($shows)>0){
			try {
				$sql ="UPDATE `WWETeuz_Show` 
						SET 
							`Posted`=$posted 
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

	function update($sh){
		$showQuery = "SELECT * 
		FROM 
			WWETeuz_BridgeUserShow 
		WHERE 
			userId = '$sh->userId' AND 
			showId = '$sh->showId';";
		$shows = $this->conn->query($showQuery);
		
		if(mysql_num_rows($shows)>0){
			$sql ="UPDATE `WWETeuz_Show` 
					SET 
						`Year`='$sh->year',
						`Week`='$sh->week',
						`Month`='$sh->month',
						`Attendance`=$sh->attendance,
						`Arena`='$sh->arena',
						`City`='$sh->city',
						`SoldOut`=$sh->soldout,
						`Graduation`='$sh->rating' 
					WHERE 
						ID = '$sh->showId'";
					
			try {
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

	function getShowDetail($userId, $showId){
		$showQuery = "SELECT * 
		FROM 
			WWETeuz_BridgeUserShow 
		WHERE 
			userId = '$userId' AND 
			showId = '$showId';";
		$shows = $this->conn->query($showQuery);
		if(mysql_num_rows($shows)>0){
			$sql = "SELECT
						`WWETeuz_ShowAngles`.`SegmentID` AS segmentId,
						`ID_Show` AS showId,
						`Number` AS orderAppear,
						`Placement` AS placement,
						`SegmentTitle` AS title,
						`SegmentRating` AS rating,
						`WWETeuz_ShowAngles`.`Type` AS segmentType,
						`Zona` AS shownTitle,
						Content AS content,
						`GraphicColor` AS graphicColor,
						Workers AS workers,
						MatchTitle AS championship,
						StartingChamp AS champion,
						ChampionsAdvantage AS championshipAdv,
						MatchType AS matchType,
						MatchScheme AS matchScheme,
						MatchWorker AS matchWorkers,
						MatchWinner AS matchWinner,
						TitleChange AS titleChange,
						WWETeuz_Show.Label AS showName,
						Posted AS confirmed,
						WWETeuz_Show.formatId AS formatId,
						WWETeuz_Show.DayWeek AS DayWeek,
						WWETeuz_Show.Week AS Week,
						WWETeuz_Show.`Month` AS M,
						WWETeuz_Show.`Year` AS Y,
						Attendance AS pubblico,
						Arena AS arena,
						City AS citta,
						SoldOut AS soldOut,
						Graduation AS showRating,
						WWETeuz_BridgeUserShow.userId AS userId
					FROM 
						WWETeuz_ShowAngles 
						JOIN WWETeuz_Show 
							ON (WWETeuz_ShowAngles.ID_Show = WWETeuz_Show.ID) 
						JOIN WWETeuz_Format 
							ON (WWETeuz_Show.formatId = WWETeuz_Format.ID) 
						JOIN WWETeuz_BridgeUserShow 
							ON (WWETeuz_BridgeUserShow.showId = WWETeuz_Show.ID)
						WHERE 
							ID_Show = $showId 
						ORDER BY 
							orderAppear ASC;";

			$stmt = $this->conn->query($sql);
			return $stmt;
		}
		else{
			return "NO DATA";
		}
	}

	function createSegment($segment){
		$rating = $segment->rating ? "'".$segment->rating."'" : "NULL";
		$graphicColor = $segment->graphicColor ? "'".$segment->graphicColor."'" : "NULL";
		$matchTitle = $segment->championship ? "'".$segment->championship."'" : "NULL";
		$StartingChamp = $segment->champion ? "'".$segment->champion."'" : "NULL";
		$MatchType = $segment->matchType ? "'".$segment->matchType."'" : "NULL";
		$MatchScheme = $segment->matchScheme ? "'".$segment->matchScheme."'" : "NULL";
		$MatchWorker = $segment->matchWorkers ? "'".$segment->matchWorkers."'" : "NULL";
		$MatchWinner = $segment->matchWinner ? "'".$segment->matchWinner."'" : "NULL";
		$showId = $segment->showId;
		$orderAppear = $segment->orderAppear;
		$placement = $segment->placement ? "'".$segment->placement."'" : "NULL";
		$title = $segment->title ? "'".$segment->title."'" : "NULL";
		$segmentType = $segment->segmentType ? "'".$segment->segmentType."'" : "NULL";
		$shownTitle = $segment->shownTitle ? "'".$segment->shownTitle."'" : "''";
		$content = $segment->content ? "'".$segment->content."'" : "''";
		$titleChange = $segment->titleChange;
		$championshipAdv = $segment->championshipAdv;

		$sql = "INSERT INTO 
						`WWETeuz_ShowAngles` 
						(`ID_Show`, `Number`, `Placement`, `SegmentTitle`, `SegmentRating`, `Type`, 
						`Zona`, `Content`, `GraphicColor`, `Workers`, `MatchTitle`, `StartingChamp`, 
						`MatchType`, `MatchScheme`, `MatchWorker`, `MatchWinner`, `TitleChange`, 
						`ChampionsAdvantage`) 
					VALUES (
						$showId,
						$orderAppear,
						$placement,
						$title,
						$rating,
						$segmentType,
						$shownTitle,
						$content,
						$graphicColor,
						'NULL',
						$matchTitle,
						$StartingChamp,
						$MatchType,
						$MatchScheme,
						$MatchWorker,
						$MatchWinner,
						$titleChange,
						$championshipAdv
						)
						";
		try {
			$stmt = $this->conn->query($sql);
			return true;
		} catch (\Throwable $th) {
			return false;
		}

	}
	
	function editSegment($segment){
		
		$rating = $segment->rating ? "'".$segment->rating."'" : "NULL";
		$graphicColor = $segment->graphicColor ? "'".$segment->graphicColor."'" : "NULL";
		$matchTitle = $segment->championship ? "'".$segment->championship."'" : "NULL";
		$StartingChamp = $segment->champion ? "'".$segment->champion."'" : "NULL";
		$MatchType = $segment->matchType ? "'".$segment->matchType."'" : "NULL";
		$MatchScheme = $segment->matchScheme ? "'".$segment->matchScheme."'" : "NULL";
		$MatchWorker = $segment->matchWorkers ? "'".$segment->matchWorkers."'" : "NULL";
		$MatchWinner = $segment->matchWinner ? "'".$segment->matchWinner."'" : "NULL";

		$sql = "UPDATE 
					`WWETeuz_ShowAngles` 
				SET 
					`Placement` = '$segment->placement',
					`SegmentTitle` = '$segment->title',
					`SegmentRating` = $rating,
					`Type` = '$segment->segmentType',
					`Zona` = '$segment->shownTitle',
					`Content` = '$segment->content',
					`GraphicColor` = $graphicColor,
					`MatchTitle` = $matchTitle,
					`StartingChamp` = $StartingChamp,
					`MatchType` = $MatchType,
					`MatchScheme` = $MatchScheme,
					`MatchWorker` = $MatchWorker,
					`MatchWinner` = $MatchWinner,
					`TitleChange` = $segment->titleChange,
					`ChampionsAdvantage` = $segment->championshipAdv
				WHERE
					`SegmentID` = $segment->segmentId;";
		try {	
			$stmt = $this->conn->query($sql);
			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}

	function deleteSeg($userId, $segmentId){
		try {
			$query = "DELETE FROM `WWETeuz_ShowAngles` WHERE `SegmentID` = '$segmentId'";
			$delete = $this->conn->query($query);
			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}

	function moveSeg($segmentA, $segmentB, $segAnewPos, $segBnewPos){
		$sql = "UPDATE 
					`WWETeuz_ShowAngles` 
				SET 
					`Number` = '$segAnewPos'
					
				WHERE
					`SegmentID` = $segmentA;";
		$sql1 = "UPDATE 
					`WWETeuz_ShowAngles` 
				SET 
					`Number` = '$segBnewPos'
					
				WHERE
					`SegmentID` = $segmentB;";
		try {	
			$stmt = $this->conn->query($sql);
			$stmt = $this->conn->query($sql1);
			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}
}

?>