<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Teacher.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'Authentication.php';
function ConvertListToTeachers($data)
{
	$teachers = [];
	
	foreach($data as $row)
	{
		$teacher = new Teacher(
		$row["Name"], 
		$row["Email"] 
		);
	
		$teacher->SetTeacherId($row["TeacherId"]);
		$teacher->SetCreationTime($row["CreationTime"]);
	
		$teachers[count($teachers)] = $teacher;
	}
	
	return $teachers;
}

function GetTeachers($database)
{
	$data = $database->ReadData("SELECT * FROM Teachers");
	$teachers = ConvertListToTeachers($data);
	return $teachers;
}

function GetTeachersByEmail($database, $email)
{
	$data = $database->ReadData("SELECT * FROM Teachers WHERE Email = '$email'");
	$teachers = ConvertListToTeachers($data);
	if(0== count($teachers))
	{
		return [GetEmptyTeacher()];
	}
	return $teachers;
}
function GetTeachersByTeacherId($database, $teacherId)
{
	$data = $database->ReadData("SELECT * FROM Teachers WHERE TeacherId = $teacherId");
	$teachers = ConvertListToTeachers($data);
	if(0== count($teachers))
	{
		return [GetEmptyTeacher()];
	}
	return $teachers;
}

function CompleteTeachers($database, $teachers)
{
	$teachersList = GetTeachers($database);
	foreach($teachers as $teacher)
	{
		$start = 0;
		$end = count($teachersList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($teacher->GetTeacherId() > $teachersList[$mid]->GetTeacherId())
			{
				$start = $mid + 1;
			}
			else if($teacher->GetTeacherId() < $teachersList[$mid]->GetTeacherId())
			{
				$end = $mid - 1;
			}
			else if($teacher->GetTeacherId() == $teachersList[$mid]->GetTeacherId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$teacher->SetTeacher($teachersList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $teachers;
}

function AddTeacher($database, $teacher)
{
	$query = "INSERT INTO Teachers(Name, Email, CreationTime) VALUES(";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$teacher->GetName()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$teacher->GetEmail()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$teacher->SetTeacherId($id);
	$teacher->SetCreationTime(date('Y-m-d H:i:s'));
	return $teacher;
	
}

function DeleteTeacher($database, $teacherId)
{
	$teacher = GetTeachersByTeacherId($database, $teacherId)[0];
	
	$query = "DELETE FROM Teachers WHERE TeacherId=$teacherId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$teacher->SetTeacherId(0);
	}
	
	return $teacher;
	
}

function UpdateTeacher($database, $teacher)
{
	$query = "UPDATE Teachers SET ";
	$query = $query . "Name='" . $teacher->GetName() . "', ";
	$query = $query . "Email='" . $teacher->GetEmail() . "'";
	$query = $query . " WHERE TeacherId=" . $teacher->GetTeacherId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$teacher->SetTeacherId(0);
	}
	return $teacher;
	
}

function TestAddTeacher($database)
{
	$teacher = new Teacher(
		'Test',//Name
		'Test'//Email
	);
	
	AddTeacher($database, $teacher);
}

function GetEmptyTeacher()
{
	$teacher = new Teacher(
		'',//Name
		''//Email
	);
	
	return $teacher;
}

if(CheckGetParameters(["cmd"]))
{
	if("getTeachers" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetTeachers($database));
	}

	if("getLastTeacher" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastTeacher($database));
	}

	else if("getTeachersByEmail" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'email'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTeachersByEmail($database, 
				$_GET["email"]
			));
		}
	
	}
	else if("getTeachersByTeacherId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'teacherId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTeachersByTeacherId($database, 
				$_GET["teacherId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addTeacher" == $_GET["cmd"])
	{
		if(CheckPostParameters([
		]))
		{
			$database = new DatabaseOperations();
			$teacher = new Teacher(
				IssetValueNull($_POST['name']),
				IssetValueNull($_POST['email'])
			);
	
			echo json_encode(AddTeacher($database, $teacher));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateTeacher" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$teacher = new Teacher(
			$_POST['name'],
			$_POST['email']
		);
		$teacher->SetTeacherId($_POST['teacherId']);
		$teacher->SetCreationTime($_POST['creationTime']);
		
		$teacher = UpdateTeacher($database, $teacher);
		echo json_encode($teacher);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteTeacher" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$teacherId = $_GET['teacherId'];
		
		$teacher = DeleteTeacher($database, $teacherId);
		echo json_encode($teacher);

	}
}


function GetLastTeacher($database)
{
	$data = $database->ReadData("SELECT * FROM Teachers ORDER BY CreationTime DESC LIMIT 1");
	$teachers = ConvertListToTeachers($data);
	return $teachers;
}

?>
