<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Classe.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'Authentication.php';
require_once 'ClassRooms.php';
require_once 'Teachers.php';
function ConvertListToClasses($data)
{
	$classes = [];
	
	foreach($data as $row)
	{
		$classe = new Classe(
		$row["TeacherId"], 
		$row["ClassRoomId"], 
		$row["Name"] 
		);
	
		$classe->SetClasseId($row["ClasseId"]);
		$classe->SetCreationTime($row["CreationTime"]);
	
		$classes[count($classes)] = $classe;
	}
	
	return $classes;
}

function GetClasses($database)
{
	$data = $database->ReadData("SELECT * FROM Classes");
	$classes = ConvertListToClasses($data);
	$classes = CompleteClassRooms($database, $classes);
	$classes = CompleteTeachers($database, $classes);
	return $classes;
}

function GetClassesByClassRoomId($database, $classRoomId)
{
	$data = $database->ReadData("SELECT * FROM Classes WHERE ClassRoomId = $classRoomId");
	$classes = ConvertListToClasses($data);
	if(0== count($classes))
	{
		return [GetEmptyClasse()];
	}
	CompleteClassRooms($database, $classes);
	CompleteTeachers($database, $classes);
	return $classes;
}
function GetClassesByClasseId($database, $classeId)
{
	$data = $database->ReadData("SELECT * FROM Classes WHERE ClasseId = $classeId");
	$classes = ConvertListToClasses($data);
	if(0== count($classes))
	{
		return [GetEmptyClasse()];
	}
	CompleteClassRooms($database, $classes);
	CompleteTeachers($database, $classes);
	return $classes;
}

function CompleteClasses($database, $classes)
{
	$classesList = GetClasses($database);
	foreach($classes as $classe)
	{
		$start = 0;
		$end = count($classesList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($classe->GetClasseId() > $classesList[$mid]->GetClasseId())
			{
				$start = $mid + 1;
			}
			else if($classe->GetClasseId() < $classesList[$mid]->GetClasseId())
			{
				$end = $mid - 1;
			}
			else if($classe->GetClasseId() == $classesList[$mid]->GetClasseId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$classe->SetClasse($classesList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $classes;
}

function AddClasse($database, $classe)
{
	$query = "INSERT INTO Classes(TeacherId, ClassRoomId, Name, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$classe->GetTeacherId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$classe->GetClassRoomId()).", ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$classe->GetName()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$classe->SetClasseId($id);
	$classe->SetCreationTime(date('Y-m-d H:i:s'));
	$classe->SetClassRoom(GetClassRoomsByClassRoomId($database, $classe->GetClassRoomId())[0]);
	$classe->SetTeacher(GetTeachersByTeacherId($database, $classe->GetTeacherId())[0]);
	return $classe;
	
}

function DeleteClasse($database, $classeId)
{
	$classe = GetClassesByClasseId($database, $classeId)[0];
	
	$query = "DELETE FROM Classes WHERE ClasseId=$classeId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$classe->SetClasseId(0);
	}
	
	return $classe;
	
}

function UpdateClasse($database, $classe)
{
	$query = "UPDATE Classes SET ";
	$query = $query . "TeacherId=" . $classe->GetTeacherId().", ";
	$query = $query . "ClassRoomId=" . $classe->GetClassRoomId().", ";
	$query = $query . "Name='" . $classe->GetName() . "'";
	$query = $query . " WHERE ClasseId=" . $classe->GetClasseId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$classe->SetClasseId(0);
	}
	return $classe;
	
}

function TestAddClasse($database)
{
	$classe = new Classe(
		0,//TeacherId
		0,//ClassRoomId
		'Test'//Name
	);
	
	AddClasse($database, $classe);
}

function GetEmptyClasse()
{
	$classe = new Classe(
		0,//TeacherId
		0,//ClassRoomId
		''//Name
	);
	
	return $classe;
}

if(CheckGetParameters(["cmd"]))
{
	if("getClasses" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetClasses($database));
	}

	if("getLastClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastClasse($database));
	}

	else if("getClassesByClassRoomId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'classRoomId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetClassesByClassRoomId($database, 
				$_GET["classRoomId"]
			));
		}
	
	}
	else if("getClassesByClasseId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'classeId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetClassesByClasseId($database, 
				$_GET["classeId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addClasse" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'teacherId',
			'classRoomId'
		]))
		{
			$database = new DatabaseOperations();
			$classe = new Classe(
				IssetValueNull($_POST['teacherId']),
				IssetValueNull($_POST['classRoomId']),
				IssetValueNull($_POST['name'])
			);
	
			echo json_encode(AddClasse($database, $classe));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$classe = new Classe(
			$_POST['teacherId'],
			$_POST['classRoomId'],
			$_POST['name']
		);
		$classe->SetClasseId($_POST['classeId']);
		$classe->SetCreationTime($_POST['creationTime']);
		
		$classe = UpdateClasse($database, $classe);
		echo json_encode($classe);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$classeId = $_GET['classeId'];
		
		$classe = DeleteClasse($database, $classeId);
		echo json_encode($classe);

	}
}


function GetLastClasse($database)
{
	$data = $database->ReadData("SELECT * FROM Classes ORDER BY CreationTime DESC LIMIT 1");
	$classes = ConvertListToClasses($data);
	$classes = CompleteClassRooms($database, $classes);
	$classes = CompleteTeachers($database, $classes);
	return $classes;
}

?>
