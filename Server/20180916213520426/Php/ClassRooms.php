<?php
header('Access-Control-Allow-Origin: https://localhost:3000'); 
header('Access-Control-Allow-Credentials: true'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/ClassRoom.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
function ConvertListToClassRooms($data)
{
	$classRooms = [];
	
	foreach($data as $row)
	{
		$classRoom = new ClassRoom(
		$row["Name"] 
		);
	
		$classRoom->SetClassRoomId($row["ClassRoomId"]);
		$classRoom->SetCreationTime($row["CreationTime"]);
	
		$classRooms[count($classRooms)] = $classRoom;
	}
	
	return $classRooms;
}

function GetClassRooms($database)
{
	$data = $database->ReadData("SELECT * FROM ClassRooms");
	$classRooms = ConvertListToClassRooms($data);
	return $classRooms;
}

function GetClassRoomsByClassRoomId($database, $classRoomId)
{
	$data = $database->ReadData("SELECT * FROM ClassRooms WHERE ClassRoomId = $classRoomId");
	$classRooms = ConvertListToClassRooms($data);
	if(0== count($classRooms))
	{
		return [GetEmptyClassRoom()];
	}
	return $classRooms;
}

function CompleteClassRooms($database, $classRooms)
{
	$classRoomsList = GetClassRooms($database);
	foreach($classRooms as $classRoom)
	{
		$start = 0;
		$end = count($classRoomsList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($classRoom->GetClassRoomId() > $classRoomsList[$mid]->GetClassRoomId())
			{
				$start = $mid + 1;
			}
			else if($classRoom->GetClassRoomId() < $classRoomsList[$mid]->GetClassRoomId())
			{
				$end = $mid - 1;
			}
			else if($classRoom->GetClassRoomId() == $classRoomsList[$mid]->GetClassRoomId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$classRoom->SetClassRoom($classRoomsList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $classRooms;
}

function AddClassRoom($database, $classRoom)
{
	$query = "INSERT INTO ClassRooms(Name, CreationTime) VALUES(";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$classRoom->GetName()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$classRoom->SetClassRoomId($id);
	$classRoom->SetCreationTime(date('Y-m-d H:i:s'));
	return $classRoom;
	
}

function DeleteClassRoom($database, $classRoomId)
{
	$classRoom = GetClassRoomsByClassRoomId($database, $classRoomId)[0];
	
	$query = "DELETE FROM ClassRooms WHERE ClassRoomId=$classRoomId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$classRoom->SetClassRoomId(0);
	}
	
	return $classRoom;
	
}

function UpdateClassRoom($database, $classRoom)
{
	$query = "UPDATE ClassRooms SET ";
	$query = $query . "Name='" . $classRoom->GetName() . "'";
	$query = $query . " WHERE ClassRoomId=" . $classRoom->GetClassRoomId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$classRoom->SetClassRoomId(0);
	}
	return $classRoom;
	
}

function TestAddClassRoom($database)
{
	$classRoom = new ClassRoom(
		'Test'//Name
	);
	
	AddClassRoom($database, $classRoom);
}

function GetEmptyClassRoom()
{
	$classRoom = new ClassRoom(
		''//Name
	);
	
	return $classRoom;
}

if(CheckGetParameters(["cmd"]))
{
	if("getClassRooms" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetClassRooms($database));
	}

	if("getLastClassRoom" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastClassRoom($database));
	}

	else if("getClassRoomsByClassRoomId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'classRoomId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetClassRoomsByClassRoomId($database, 
				$_GET["classRoomId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addClassRoom" == $_GET["cmd"])
	{
		if(CheckPostParameters([
		]))
		{
			$database = new DatabaseOperations();
			$classRoom = new ClassRoom(
				IssetValueNull($_POST['name'])
			);
	
			echo json_encode(AddClassRoom($database, $classRoom));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateClassRoom" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$classRoom = new ClassRoom(
			$_POST['name']
		);
		$classRoom->SetClassRoomId($_POST['classRoomId']);
		$classRoom->SetCreationTime($_POST['creationTime']);
		
		$classRoom = UpdateClassRoom($database, $classRoom);
		echo json_encode($classRoom);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteClassRoom" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$classRoomId = $_GET['classRoomId'];
		
		$classRoom = DeleteClassRoom($database, $classRoomId);
		echo json_encode($classRoom);

	}
}


function GetLastClassRoom($database)
{
	$data = $database->ReadData("SELECT * FROM ClassRooms ORDER BY CreationTime DESC LIMIT 1");
	$classRooms = ConvertListToClassRooms($data);
	return $classRooms;
}

?>
