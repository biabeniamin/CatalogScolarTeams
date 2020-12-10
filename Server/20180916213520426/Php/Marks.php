<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Mark.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'Users.php';
function ConvertListToMarks($data)
{
	$marks = [];
	
	foreach($data as $row)
	{
		$mark = new Mark(
		$row["UserId"], 
		$row["Value"] 
		);
	
		$mark->SetMarkId($row["MarkId"]);
		$mark->SetCreationTime($row["CreationTime"]);
	
		$marks[count($marks)] = $mark;
	}
	
	return $marks;
}

function GetMarks($database)
{
	$data = $database->ReadData("SELECT * FROM Marks");
	$marks = ConvertListToMarks($data);
	$marks = CompleteUsers($database, $marks);
	return $marks;
}

function GetMarksByMarkId($database, $markId)
{
	$data = $database->ReadData("SELECT * FROM Marks WHERE MarkId = $markId");
	$marks = ConvertListToMarks($data);
	if(0== count($marks))
	{
		return [GetEmptyMark()];
	}
	CompleteUsers($database, $marks);
	return $marks;
}

function CompleteMarks($database, $marks)
{
	$marksList = GetMarks($database);
	foreach($marks as $mark)
	{
		$start = 0;
		$end = count($marksList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($mark->GetMarkId() > $marksList[$mid]->GetMarkId())
			{
				$start = $mid + 1;
			}
			else if($mark->GetMarkId() < $marksList[$mid]->GetMarkId())
			{
				$end = $mid - 1;
			}
			else if($mark->GetMarkId() == $marksList[$mid]->GetMarkId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$mark->SetMark($marksList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $marks;
}

function AddMark($database, $mark)
{
	$query = "INSERT INTO Marks(UserId, Value, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetUserId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetValue()).", ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$mark->SetMarkId($id);
	$mark->SetCreationTime(date('Y-m-d H:i:s'));
	$mark->SetUser(GetUsersByUserId($database, $mark->GetUserId())[0]);
	return $mark;
	
}

function DeleteMark($database, $markId)
{
	$mark = GetMarksByMarkId($database, $markId)[0];
	
	$query = "DELETE FROM Marks WHERE MarkId=$markId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$mark->SetMarkId(0);
	}
	
	return $mark;
	
}

function UpdateMark($database, $mark)
{
	$query = "UPDATE Marks SET ";
	$query = $query . "UserId=" . $mark->GetUserId().", ";
	$query = $query . "Value=" . $mark->GetValue()."";
	$query = $query . " WHERE MarkId=" . $mark->GetMarkId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$mark->SetMarkId(0);
	}
	return $mark;
	
}

function TestAddMark($database)
{
	$mark = new Mark(
		0,//UserId
		0//Value
	);
	
	AddMark($database, $mark);
}

function GetEmptyMark()
{
	$mark = new Mark(
		0,//UserId
		0//Value
	);
	
	return $mark;
}

if(CheckGetParameters(["cmd"]))
{
	if("getMarks" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetMarks($database));
	}

	if("getLastMark" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastMark($database));
	}

	else if("getMarksByMarkId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'markId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetMarksByMarkId($database, 
				$_GET["markId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addMark" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'userId'
		]))
		{
			$database = new DatabaseOperations();
			$mark = new Mark(
				IssetValueNull($_POST['userId']),
				IssetValueNull($_POST['value'])
			);
	
			echo json_encode(AddMark($database, $mark));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateMark" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$mark = new Mark(
			$_POST['userId'],
			$_POST['value']
		);
		$mark->SetMarkId($_POST['markId']);
		$mark->SetCreationTime($_POST['creationTime']);
		
		$mark = UpdateMark($database, $mark);
		echo json_encode($mark);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteMark" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$markId = $_GET['markId'];
		
		$mark = DeleteMark($database, $markId);
		echo json_encode($mark);

	}
}


function GetLastMark($database)
{
	$data = $database->ReadData("SELECT * FROM Marks ORDER BY CreationTime DESC LIMIT 1");
	$marks = ConvertListToMarks($data);
	$marks = CompleteUsers($database, $marks);
	return $marks;
}

?>
