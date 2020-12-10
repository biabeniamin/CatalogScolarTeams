<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/User.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
function ConvertListToUsers($data)
{
	$users = [];
	
	foreach($data as $row)
	{
		$user = new User(
		$row["FirstName"], 
		$row["LastName"], 
		$row["Email"], 
		$row["Type"] 
		);
	
		$user->SetUserId($row["UserId"]);
		$user->SetCreationTime($row["CreationTime"]);
	
		$users[count($users)] = $user;
	}
	
	return $users;
}

function GetUsers($database)
{
	$data = $database->ReadData("SELECT * FROM Users");
	$users = ConvertListToUsers($data);
	return $users;
}

function GetUsersByUserId($database, $userId)
{
	$data = $database->ReadData("SELECT * FROM Users WHERE UserId = $userId");
	$users = ConvertListToUsers($data);
	if(0== count($users))
	{
		return [GetEmptyUser()];
	}
	return $users;
}

function CompleteUsers($database, $users)
{
	$usersList = GetUsers($database);
	foreach($users as $user)
	{
		$start = 0;
		$end = count($usersList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($user->GetUserId() > $usersList[$mid]->GetUserId())
			{
				$start = $mid + 1;
			}
			else if($user->GetUserId() < $usersList[$mid]->GetUserId())
			{
				$end = $mid - 1;
			}
			else if($user->GetUserId() == $usersList[$mid]->GetUserId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$user->SetUser($usersList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $users;
}

function AddUser($database, $user)
{
	$query = "INSERT INTO Users(FirstName, LastName, Email, Type, CreationTime) VALUES(";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$user->GetFirstName()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$user->GetLastName()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$user->GetEmail()) . "', ";
	$query = $query . mysqli_real_escape_string($database->connection ,$user->GetType()).", ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$user->SetUserId($id);
	$user->SetCreationTime(date('Y-m-d H:i:s'));
	return $user;
	
}

function DeleteUser($database, $userId)
{
	$user = GetUsersByUserId($database, $userId)[0];
	
	$query = "DELETE FROM Users WHERE UserId=$userId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$user->SetUserId(0);
	}
	
	return $user;
	
}

function UpdateUser($database, $user)
{
	$query = "UPDATE Users SET ";
	$query = $query . "FirstName='" . $user->GetFirstName() . "', ";
	$query = $query . "LastName='" . $user->GetLastName() . "', ";
	$query = $query . "Email='" . $user->GetEmail() . "', ";
	$query = $query . "Type=" . $user->GetType()."";
	$query = $query . " WHERE UserId=" . $user->GetUserId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$user->SetUserId(0);
	}
	return $user;
	
}

function TestAddUser($database)
{
	$user = new User(
		'Test',//FirstName
		'Test',//LastName
		'Test',//Email
		0//Type
	);
	
	AddUser($database, $user);
}

function GetEmptyUser()
{
	$user = new User(
		'',//FirstName
		'',//LastName
		'',//Email
		0//Type
	);
	
	return $user;
}

if(CheckGetParameters(["cmd"]))
{
	if("getUsers" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetUsers($database));
	}

	if("getLastUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastUser($database));
	}

	else if("getUsersByUserId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'userId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetUsersByUserId($database, 
				$_GET["userId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addUser" == $_GET["cmd"])
	{
		if(CheckPostParameters([
		]))
		{
			$database = new DatabaseOperations();
			$user = new User(
				IssetValueNull($_POST['firstName']),
				IssetValueNull($_POST['lastName']),
				IssetValueNull($_POST['email']),
				IssetValueNull($_POST['type'])
			);
	
			echo json_encode(AddUser($database, $user));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$user = new User(
			$_POST['firstName'],
			$_POST['lastName'],
			$_POST['email'],
			$_POST['type']
		);
		$user->SetUserId($_POST['userId']);
		$user->SetCreationTime($_POST['creationTime']);
		
		$user = UpdateUser($database, $user);
		echo json_encode($user);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$userId = $_GET['userId'];
		
		$user = DeleteUser($database, $userId);
		echo json_encode($user);

	}
}


function GetLastUser($database)
{
	$data = $database->ReadData("SELECT * FROM Users ORDER BY CreationTime DESC LIMIT 1");
	$users = ConvertListToUsers($data);
	return $users;
}

?>
