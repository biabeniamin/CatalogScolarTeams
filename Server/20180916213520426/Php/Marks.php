<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Mark.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
//require_once 'Authentication.php';
require_once 'Teachers.php';
require_once 'Students.php';
require_once 'Classes.php';
function ConvertListToMarks($data)
{
	$marks = [];
	
	foreach($data as $row)
	{
		$mark = new Mark(
		$row["ClasseId"], 
		$row["StudentId"], 
		$row["TeacherId"], 
		$row["Value"], 
		$row["Date"] 
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
	$marks = CompleteTeachers($database, $marks);
	$marks = CompleteStudents($database, $marks);
	$marks = CompleteClasses($database, $marks);
	return $marks;
}

function GetMarksByClasseIdStudentId($database, $classeId, $studentId)
{
	$data = $database->ReadData("SELECT * FROM Marks WHERE ClasseId = $classeId and StudentId = $studentId");
	$marks = ConvertListToMarks($data);
	if(0== count($marks))
	{
		return [GetEmptyMark()];
	}
	CompleteTeachers($database, $marks);
	CompleteStudents($database, $marks);
	CompleteClasses($database, $marks);
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
	CompleteTeachers($database, $marks);
	CompleteStudents($database, $marks);
	CompleteClasses($database, $marks);
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
	$query = "INSERT INTO Marks(ClasseId, StudentId, TeacherId, Value, Date, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetClasseId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetStudentId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetTeacherId()).", ";
	$query = $query . mysqli_real_escape_string($database->connection ,$mark->GetValue()).", ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$mark->GetDate()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$mark->SetMarkId($id);
	$mark->SetCreationTime(date('Y-m-d H:i:s'));
	$mark->SetTeacher(GetTeachersByTeacherId($database, $mark->GetTeacherId())[0]);
	$mark->SetStudent(GetStudentsByStudentId($database, $mark->GetStudentId())[0]);
	$mark->SetClasse(GetClassesByClasseId($database, $mark->GetClasseId())[0]);
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
	$query = $query . "ClasseId=" . $mark->GetClasseId().", ";
	$query = $query . "StudentId=" . $mark->GetStudentId().", ";
	$query = $query . "TeacherId=" . $mark->GetTeacherId().", ";
	$query = $query . "Value=" . $mark->GetValue().", ";
	$query = $query . "Date='" . $mark->GetDate() . "'";
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
		0,//ClasseId
		0,//StudentId
		0,//TeacherId
		0,//Value
		'2000-01-01 00:00:00'//Date
	);
	
	AddMark($database, $mark);
}

function GetEmptyMark()
{
	$mark = new Mark(
		0,//ClasseId
		0,//StudentId
		0,//TeacherId
		0,//Value
		'2000-01-01 00:00:00'//Date
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

	else if("getMarksByClasseIdStudentId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'classeId',
			'studentId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetMarksByClasseIdStudentId($database, 
				$_GET["classeId"],
				$_GET["studentId"]
			));
		}
	
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
			'classeId',
			'studentId',
			'teacherId'
		]))
		{
			$database = new DatabaseOperations();
			$mark = new Mark(
				IssetValueNull($_POST['classeId']),
				IssetValueNull($_POST['studentId']),
				IssetValueNull($_POST['teacherId']),
				IssetValueNull($_POST['value']),
				IssetValueNull($_POST['date'])
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
			$_POST['classeId'],
			$_POST['studentId'],
			$_POST['teacherId'],
			$_POST['value'],
			$_POST['date']
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
	$marks = CompleteTeachers($database, $marks);
	$marks = CompleteStudents($database, $marks);
	$marks = CompleteClasses($database, $marks);
	return $marks;
}

?>
