<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/StudentClasse.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'Classes.php';
require_once 'Students.php';
function ConvertListToStudentClasses($data)
{
	$studentClasses = [];
	
	foreach($data as $row)
	{
		$studentClasse = new StudentClasse(
		$row["StudentId"], 
		$row["ClasseId"] 
		);
	
		$studentClasse->SetStudentClasseId($row["StudentClasseId"]);
		$studentClasse->SetCreationTime($row["CreationTime"]);
	
		$studentClasses[count($studentClasses)] = $studentClasse;
	}
	
	return $studentClasses;
}

function GetStudentClasses($database)
{
	$data = $database->ReadData("SELECT * FROM StudentClasses");
	$studentClasses = ConvertListToStudentClasses($data);
	$studentClasses = CompleteClasses($database, $studentClasses);
	$studentClasses = CompleteStudents($database, $studentClasses);
	return $studentClasses;
}

function GetStudentClassesByClasseId($database, $classeId)
{
	$data = $database->ReadData("SELECT * FROM StudentClasses WHERE ClasseId = $classeId");
	$studentClasses = ConvertListToStudentClasses($data);
	if(0== count($studentClasses))
	{
		return [GetEmptyStudentClasse()];
	}
	CompleteClasses($database, $studentClasses);
	CompleteStudents($database, $studentClasses);
	return $studentClasses;
}
function GetStudentClassesByStudentId($database, $studentId)
{
	$data = $database->ReadData("SELECT * FROM StudentClasses WHERE StudentId = $studentId");
	$studentClasses = ConvertListToStudentClasses($data);
	if(0== count($studentClasses))
	{
		return [GetEmptyStudentClasse()];
	}
	CompleteClasses($database, $studentClasses);
	CompleteStudents($database, $studentClasses);
	return $studentClasses;
}
function GetStudentClassesByStudentClasseId($database, $studentClasseId)
{
	$data = $database->ReadData("SELECT * FROM StudentClasses WHERE StudentClasseId = $studentClasseId");
	$studentClasses = ConvertListToStudentClasses($data);
	if(0== count($studentClasses))
	{
		return [GetEmptyStudentClasse()];
	}
	CompleteClasses($database, $studentClasses);
	CompleteStudents($database, $studentClasses);
	return $studentClasses;
}

function CompleteStudentClasses($database, $studentClasses)
{
	$studentClassesList = GetStudentClasses($database);
	foreach($studentClasses as $studentClasse)
	{
		$start = 0;
		$end = count($studentClassesList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($studentClasse->GetStudentClasseId() > $studentClassesList[$mid]->GetStudentClasseId())
			{
				$start = $mid + 1;
			}
			else if($studentClasse->GetStudentClasseId() < $studentClassesList[$mid]->GetStudentClasseId())
			{
				$end = $mid - 1;
			}
			else if($studentClasse->GetStudentClasseId() == $studentClassesList[$mid]->GetStudentClasseId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$studentClasse->SetStudentClasse($studentClassesList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $studentClasses;
}

function AddStudentClasse($database, $studentClasse)
{
	$query = "INSERT INTO StudentClasses(StudentId, ClasseId, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$studentClasse->GetStudentId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$studentClasse->GetClasseId()).", ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$studentClasse->SetStudentClasseId($id);
	$studentClasse->SetCreationTime(date('Y-m-d H:i:s'));
	$studentClasse->SetClasse(GetClassesByClasseId($database, $studentClasse->GetClasseId())[0]);
	$studentClasse->SetStudent(GetStudentsByStudentId($database, $studentClasse->GetStudentId())[0]);
	return $studentClasse;
	
}

function DeleteStudentClasse($database, $studentClasseId)
{
	$studentClasse = GetStudentClassesByStudentClasseId($database, $studentClasseId)[0];
	
	$query = "DELETE FROM StudentClasses WHERE StudentClasseId=$studentClasseId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$studentClasse->SetStudentClasseId(0);
	}
	
	return $studentClasse;
	
}

function UpdateStudentClasse($database, $studentClasse)
{
	$query = "UPDATE StudentClasses SET ";
	$query = $query . "StudentId=" . $studentClasse->GetStudentId().", ";
	$query = $query . "ClasseId=" . $studentClasse->GetClasseId()."";
	$query = $query . " WHERE StudentClasseId=" . $studentClasse->GetStudentClasseId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$studentClasse->SetStudentClasseId(0);
	}
	return $studentClasse;
	
}

function TestAddStudentClasse($database)
{
	$studentClasse = new StudentClasse(
		0,//StudentId
		0//ClasseId
	);
	
	AddStudentClasse($database, $studentClasse);
}

function GetEmptyStudentClasse()
{
	$studentClasse = new StudentClasse(
		0,//StudentId
		0//ClasseId
	);
	
	return $studentClasse;
}

if(CheckGetParameters(["cmd"]))
{
	if("getStudentClasses" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetStudentClasses($database));
	}

	if("getLastStudentClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastStudentClasse($database));
	}

	else if("getStudentClassesByClasseId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'classeId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetStudentClassesByClasseId($database, 
				$_GET["classeId"]
			));
		}
	
	}
	else if("getStudentClassesByStudentId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'studentId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetStudentClassesByStudentId($database, 
				$_GET["studentId"]
			));
		}
	
	}
	else if("getStudentClassesByStudentClasseId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'studentClasseId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetStudentClassesByStudentClasseId($database, 
				$_GET["studentClasseId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addStudentClasse" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'studentId',
			'classeId'
		]))
		{
			$database = new DatabaseOperations();
			$studentClasse = new StudentClasse(
				IssetValueNull($_POST['studentId']),
				IssetValueNull($_POST['classeId'])
			);
	
			echo json_encode(AddStudentClasse($database, $studentClasse));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateStudentClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$studentClasse = new StudentClasse(
			$_POST['studentId'],
			$_POST['classeId']
		);
		$studentClasse->SetStudentClasseId($_POST['studentClasseId']);
		$studentClasse->SetCreationTime($_POST['creationTime']);
		
		$studentClasse = UpdateStudentClasse($database, $studentClasse);
		echo json_encode($studentClasse);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteStudentClasse" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$studentClasseId = $_GET['studentClasseId'];
		
		$studentClasse = DeleteStudentClasse($database, $studentClasseId);
		echo json_encode($studentClasse);

	}
}


function GetLastStudentClasse($database)
{
	$data = $database->ReadData("SELECT * FROM StudentClasses ORDER BY CreationTime DESC LIMIT 1");
	$studentClasses = ConvertListToStudentClasses($data);
	$studentClasses = CompleteClasses($database, $studentClasses);
	$studentClasses = CompleteStudents($database, $studentClasses);
	return $studentClasses;
}

?>
