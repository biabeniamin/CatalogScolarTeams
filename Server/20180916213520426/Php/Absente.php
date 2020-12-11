<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Absente.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'Teachers.php';
require_once 'Students.php';
require_once 'Classes.php';
function ConvertListToAbsente($data)
{
	$absente = [];
	
	foreach($data as $row)
	{
		$absente = new Absente(
		$row["ClasseId"], 
		$row["StudentId"], 
		$row["TeacherId"], 
		$row["Date"] 
		);
	
		$absente->SetAbsenteId($row["AbsenteId"]);
		$absente->SetCreationTime($row["CreationTime"]);
	
		$absente[count($absente)] = $absente;
	}
	
	return $absente;
}

function GetAbsente($database)
{
	$data = $database->ReadData("SELECT * FROM Absente");
	$absente = ConvertListToAbsente($data);
	$absente = CompleteTeachers($database, $absente);
	$absente = CompleteStudents($database, $absente);
	$absente = CompleteClasses($database, $absente);
	return $absente;
}

function GetAbsenteByAbsenteId($database, $absenteId)
{
	$data = $database->ReadData("SELECT * FROM Absente WHERE AbsenteId = $absenteId");
	$absente = ConvertListToAbsente($data);
	if(0== count($absente))
	{
		return [GetEmptyAbsente()];
	}
	CompleteTeachers($database, $absente);
	CompleteStudents($database, $absente);
	CompleteClasses($database, $absente);
	return $absente;
}

function CompleteAbsente($database, $absente)
{
	$absenteList = GetAbsente($database);
	foreach($absente as $absente)
	{
		$start = 0;
		$end = count($absenteList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($absente->GetAbsenteId() > $absenteList[$mid]->GetAbsenteId())
			{
				$start = $mid + 1;
			}
			else if($absente->GetAbsenteId() < $absenteList[$mid]->GetAbsenteId())
			{
				$end = $mid - 1;
			}
			else if($absente->GetAbsenteId() == $absenteList[$mid]->GetAbsenteId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$absente->SetAbsente($absenteList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $absente;
}

function AddAbsente($database, $absente)
{
	$query = "INSERT INTO Absente(ClasseId, StudentId, TeacherId, Date, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$absente->GetClasseId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$absente->GetStudentId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$absente->GetTeacherId()).", ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$absente->GetDate()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$absente->SetAbsenteId($id);
	$absente->SetCreationTime(date('Y-m-d H:i:s'));
	$absente->SetTeacher(GetTeachersByTeacherId($database, $absente->GetTeacherId())[0]);
	$absente->SetStudent(GetStudentsByStudentId($database, $absente->GetStudentId())[0]);
	$absente->SetClasse(GetClassesByClasseId($database, $absente->GetClasseId())[0]);
	return $absente;
	
}

function DeleteAbsente($database, $absenteId)
{
	$absente = GetAbsenteByAbsenteId($database, $absenteId)[0];
	
	$query = "DELETE FROM Absente WHERE AbsenteId=$absenteId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$absente->SetAbsenteId(0);
	}
	
	return $absente;
	
}

function UpdateAbsente($database, $absente)
{
	$query = "UPDATE Absente SET ";
	$query = $query . "ClasseId=" . $absente->GetClasseId().", ";
	$query = $query . "StudentId=" . $absente->GetStudentId().", ";
	$query = $query . "TeacherId=" . $absente->GetTeacherId().", ";
	$query = $query . "Date='" . $absente->GetDate() . "'";
	$query = $query . " WHERE AbsenteId=" . $absente->GetAbsenteId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$absente->SetAbsenteId(0);
	}
	return $absente;
	
}

function TestAddAbsente($database)
{
	$absente = new Absente(
		0,//ClasseId
		0,//StudentId
		0,//TeacherId
		'2000-01-01 00:00:00'//Date
	);
	
	AddAbsente($database, $absente);
}

function GetEmptyAbsente()
{
	$absente = new Absente(
		0,//ClasseId
		0,//StudentId
		0,//TeacherId
		'2000-01-01 00:00:00'//Date
	);
	
	return $absente;
}

if(CheckGetParameters(["cmd"]))
{
	if("getAbsente" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetAbsente($database));
	}

	if("getLastAbsente" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastAbsente($database));
	}

	else if("getAbsenteByAbsenteId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'absenteId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetAbsenteByAbsenteId($database, 
				$_GET["absenteId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addAbsente" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'classeId',
			'studentId',
			'teacherId'
		]))
		{
			$database = new DatabaseOperations();
			$absente = new Absente(
				IssetValueNull($_POST['classeId']),
				IssetValueNull($_POST['studentId']),
				IssetValueNull($_POST['teacherId']),
				IssetValueNull($_POST['date'])
			);
	
			echo json_encode(AddAbsente($database, $absente));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateAbsente" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$absente = new Absente(
			$_POST['classeId'],
			$_POST['studentId'],
			$_POST['teacherId'],
			$_POST['date']
		);
		$absente->SetAbsenteId($_POST['absenteId']);
		$absente->SetCreationTime($_POST['creationTime']);
		
		$absente = UpdateAbsente($database, $absente);
		echo json_encode($absente);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteAbsente" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$absenteId = $_GET['absenteId'];
		
		$absente = DeleteAbsente($database, $absenteId);
		echo json_encode($absente);

	}
}


function GetLastAbsente($database)
{
	$data = $database->ReadData("SELECT * FROM Absente ORDER BY CreationTime DESC LIMIT 1");
	$absente = ConvertListToAbsente($data);
	$absente = CompleteTeachers($database, $absente);
	$absente = CompleteStudents($database, $absente);
	$absente = CompleteClasses($database, $absente);
	return $absente;
}

?>
