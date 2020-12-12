<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Student.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
function ConvertListToStudents($data)
{
	$students = [];
	
	foreach($data as $row)
	{
		$student = new Student(
		$row["Name"], 
		$row["Email"] 
		);
	
		$student->SetStudentId($row["StudentId"]);
		$student->SetCreationTime($row["CreationTime"]);
	
		$students[count($students)] = $student;
	}
	
	return $students;
}

function GetStudents($database)
{
	$data = $database->ReadData("SELECT * FROM Students");
	$students = ConvertListToStudents($data);
	return $students;
}

function GetStudentsByStudentId($database, $studentId)
{
	$data = $database->ReadData("SELECT * FROM Students WHERE StudentId = $studentId");
	$students = ConvertListToStudents($data);
	if(0== count($students))
	{
		return [GetEmptyStudent()];
	}
	return $students;
}

function CompleteStudents($database, $students)
{
	$studentsList = GetStudents($database);
	foreach($students as $student)
	{
		$start = 0;
		$end = count($studentsList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($student->GetStudentId() > $studentsList[$mid]->GetStudentId())
			{
				$start = $mid + 1;
			}
			else if($student->GetStudentId() < $studentsList[$mid]->GetStudentId())
			{
				$end = $mid - 1;
			}
			else if($student->GetStudentId() == $studentsList[$mid]->GetStudentId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$student->SetStudent($studentsList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $students;
}

function AddStudent($database, $student)
{
	$query = "INSERT INTO Students(Name, Email, CreationTime) VALUES(";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$student->GetName()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$student->GetEmail()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$student->SetStudentId($id);
	$student->SetCreationTime(date('Y-m-d H:i:s'));
	return $student;
	
}

function DeleteStudent($database, $studentId)
{
	$student = GetStudentsByStudentId($database, $studentId)[0];
	
	$query = "DELETE FROM Students WHERE StudentId=$studentId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$student->SetStudentId(0);
	}
	
	return $student;
	
}

function UpdateStudent($database, $student)
{
	$query = "UPDATE Students SET ";
	$query = $query . "Name='" . $student->GetName() . "', ";
	$query = $query . "Email='" . $student->GetEmail() . "'";
	$query = $query . " WHERE StudentId=" . $student->GetStudentId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$student->SetStudentId(0);
	}
	return $student;
	
}

function TestAddStudent($database)
{
	$student = new Student(
		'Test',//Name
		'Test'//Email
	);
	
	AddStudent($database, $student);
}

function GetEmptyStudent()
{
	$student = new Student(
		'',//Name
		''//Email
	);
	
	return $student;
}

if(CheckGetParameters(["cmd"]))
{
	if("getStudents" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetStudents($database));
	}

	if("getLastStudent" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastStudent($database));
	}

	else if("getStudentsByStudentId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'studentId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetStudentsByStudentId($database, 
				$_GET["studentId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addStudent" == $_GET["cmd"])
	{
		if(CheckPostParameters([
		]))
		{
			$database = new DatabaseOperations();
			$student = new Student(
				IssetValueNull($_POST['name']),
				IssetValueNull($_POST['email'])
			);
	
			echo json_encode(AddStudent($database, $student));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateStudent" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$student = new Student(
			$_POST['name'],
			$_POST['email']
		);
		$student->SetStudentId($_POST['studentId']);
		$student->SetCreationTime($_POST['creationTime']);
		
		$student = UpdateStudent($database, $student);
		echo json_encode($student);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteStudent" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$studentId = $_GET['studentId'];
		
		$student = DeleteStudent($database, $studentId);
		echo json_encode($student);

	}
}


function GetLastStudent($database)
{
	$data = $database->ReadData("SELECT * FROM Students ORDER BY CreationTime DESC LIMIT 1");
	$students = ConvertListToStudents($data);
	return $students;
}

?>
