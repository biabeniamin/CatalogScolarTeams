<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/TokenUser.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
function ConvertListToTokenUsers($data)
{
	$tokenUsers = [];
	
	foreach($data as $row)
	{
		$tokenUser = new TokenUser(
		$row["Username"], 
		$row["Password"], 
		$row["Type"] 
		);
	
		$tokenUser->SetTokenUserId($row["TokenUserId"]);
		$tokenUser->SetCreationTime($row["CreationTime"]);
	
		$tokenUsers[count($tokenUsers)] = $tokenUser;
	}
	
	return $tokenUsers;
}

function GetTokenUsers($database)
{
	$data = $database->ReadData("SELECT * FROM TokenUsers");
	$tokenUsers = ConvertListToTokenUsers($data);
	return $tokenUsers;
}

function GetTokenUsersByUsernamePassword($database, $username, $password)
{
	$data = $database->ReadData("SELECT * FROM TokenUsers WHERE Username = '$username' and Password = '$password'");
	$tokenUsers = ConvertListToTokenUsers($data);
	if(0== count($tokenUsers))
	{
		return [GetEmptyTokenUser()];
	}
	return $tokenUsers;
}
function GetTokenUsersByTokenUserId($database, $tokenUserId)
{
	$data = $database->ReadData("SELECT * FROM TokenUsers WHERE TokenUserId = $tokenUserId");
	$tokenUsers = ConvertListToTokenUsers($data);
	if(0== count($tokenUsers))
	{
		return [GetEmptyTokenUser()];
	}
	return $tokenUsers;
}

function CompleteTokenUsers($database, $tokenUsers)
{
	$tokenUsersList = GetTokenUsers($database);
	foreach($tokenUsers as $tokenUser)
	{
		$start = 0;
		$end = count($tokenUsersList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($tokenUser->GetTokenUserId() > $tokenUsersList[$mid]->GetTokenUserId())
			{
				$start = $mid + 1;
			}
			else if($tokenUser->GetTokenUserId() < $tokenUsersList[$mid]->GetTokenUserId())
			{
				$end = $mid - 1;
			}
			else if($tokenUser->GetTokenUserId() == $tokenUsersList[$mid]->GetTokenUserId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$tokenUser->SetTokenUser($tokenUsersList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $tokenUsers;
}

function AddTokenUser($database, $tokenUser)
{
	$query = "INSERT INTO TokenUsers(Username, Password, Type, CreationTime) VALUES(";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$tokenUser->GetUsername()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$tokenUser->GetPassword()) . "', ";
	$query = $query . mysqli_real_escape_string($database->connection ,$tokenUser->GetType()).", ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$tokenUser->SetTokenUserId($id);
	$tokenUser->SetCreationTime(date('Y-m-d H:i:s'));
	return $tokenUser;
	
}

function DeleteTokenUser($database, $tokenUserId)
{
	$tokenUser = GetTokenUsersByTokenUserId($database, $tokenUserId)[0];
	
	$query = "DELETE FROM TokenUsers WHERE TokenUserId=$tokenUserId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$tokenUser->SetTokenUserId(0);
	}
	
	return $tokenUser;
	
}

function UpdateTokenUser($database, $tokenUser)
{
	$query = "UPDATE TokenUsers SET ";
	$query = $query . "Username='" . $tokenUser->GetUsername() . "', ";
	$query = $query . "Password='" . $tokenUser->GetPassword() . "', ";
	$query = $query . "Type=" . $tokenUser->GetType()."";
	$query = $query . " WHERE TokenUserId=" . $tokenUser->GetTokenUserId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$tokenUser->SetTokenUserId(0);
	}
	return $tokenUser;
	
}

function TestAddTokenUser($database)
{
	$tokenUser = new TokenUser(
		'Test',//Username
		'Test',//Password
		0//Type
	);
	
	AddTokenUser($database, $tokenUser);
}

function GetEmptyTokenUser()
{
	$tokenUser = new TokenUser(
		'',//Username
		'',//Password
		0//Type
	);
	
	return $tokenUser;
}

if(CheckGetParameters(["cmd"]))
{
	if("getTokenUsers" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetTokenUsers($database));
	}

	if("getLastTokenUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastTokenUser($database));
	}

	else if("getTokenUsersByUsernamePassword" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'username',
			'password'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTokenUsersByUsernamePassword($database, 
				$_GET["username"],
				$_GET["password"]
			));
		}
	
	}
	else if("getTokenUsersByTokenUserId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'tokenUserId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTokenUsersByTokenUserId($database, 
				$_GET["tokenUserId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addTokenUser" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'username',
			'password'
		]))
		{
			$database = new DatabaseOperations();
			$tokenUser = new TokenUser(
				IssetValueNull($_POST['username']),
				IssetValueNull($_POST['password']),
				IssetValueNull($_POST['type'])
			);
	
			echo json_encode(AddTokenUser($database, $tokenUser));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateTokenUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$tokenUser = new TokenUser(
			$_POST['username'],
			$_POST['password'],
			$_POST['type']
		);
		$tokenUser->SetTokenUserId($_POST['tokenUserId']);
		$tokenUser->SetCreationTime($_POST['creationTime']);
		
		$tokenUser = UpdateTokenUser($database, $tokenUser);
		echo json_encode($tokenUser);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteTokenUser" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$tokenUserId = $_GET['tokenUserId'];
		
		$tokenUser = DeleteTokenUser($database, $tokenUserId);
		echo json_encode($tokenUser);

	}
}


function GetLastTokenUser($database)
{
	$data = $database->ReadData("SELECT * FROM TokenUsers ORDER BY CreationTime DESC LIMIT 1");
	$tokenUsers = ConvertListToTokenUsers($data);
	return $tokenUsers;
}

?>
