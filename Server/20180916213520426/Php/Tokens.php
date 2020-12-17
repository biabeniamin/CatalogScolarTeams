<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
$_POST = json_decode(file_get_contents('php://input'), true);
require_once 'Models/Token.php';
require_once 'DatabaseOperations.php';
require_once 'Helpers.php';
require_once 'TokenUsers.php';
function ConvertListToTokens($data)
{
	$tokens = [];
	
	foreach($data as $row)
	{
		$token = new Token(
		$row["TokenUserId"], 
		$row["Value"], 
		$row["Address"], 
		$row["LastUpdate"] 
		);
	
		$token->SetTokenId($row["TokenId"]);
		$token->SetCreationTime($row["CreationTime"]);
	
		$tokens[count($tokens)] = $token;
	}
	
	return $tokens;
}

function GetTokens($database)
{
	$data = $database->ReadData("SELECT * FROM Tokens");
	$tokens = ConvertListToTokens($data);
	$tokens = CompleteTokenUsers($database, $tokens);
	return $tokens;
}

function GetTokensByValue($database, $value)
{
	$data = $database->ReadData("SELECT * FROM Tokens WHERE Value = '$value'");
	$tokens = ConvertListToTokens($data);
	if(0== count($tokens))
	{
		return [GetEmptyToken()];
	}
	CompleteTokenUsers($database, $tokens);
	return $tokens;
}
function GetTokensByTokenId($database, $tokenId)
{
	$data = $database->ReadData("SELECT * FROM Tokens WHERE TokenId = $tokenId");
	$tokens = ConvertListToTokens($data);
	if(0== count($tokens))
	{
		return [GetEmptyToken()];
	}
	CompleteTokenUsers($database, $tokens);
	return $tokens;
}

function CompleteTokens($database, $tokens)
{
	$tokensList = GetTokens($database);
	foreach($tokens as $token)
	{
		$start = 0;
		$end = count($tokensList) - 1;
		do
		{
	
			$mid = floor(($start + $end) / 2);
			if($token->GetTokenId() > $tokensList[$mid]->GetTokenId())
			{
				$start = $mid + 1;
			}
			else if($token->GetTokenId() < $tokensList[$mid]->GetTokenId())
			{
				$end = $mid - 1;
			}
			else if($token->GetTokenId() == $tokensList[$mid]->GetTokenId())
			{
				$start = $mid + 1;
				$end = $mid - 1;
				$token->SetToken($tokensList[$mid]);
			}
	
		}while($start <= $end);
	}
	
	return $tokens;
}

function AddToken($database, $token)
{
	$query = "INSERT INTO Tokens(TokenUserId, Value, Address, LastUpdate, CreationTime) VALUES(";
	$query = $query . mysqli_real_escape_string($database->connection ,$token->GetTokenUserId()).", ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$token->GetValue()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$token->GetAddress()) . "', ";
	$query = $query . "'" . mysqli_real_escape_string($database->connection ,$token->GetLastUpdate()) . "', ";
	$query = $query . "NOW()"."";
	
	$query = $query . ");";
	$database->ExecuteSqlWithoutWarning($query);
	$id = $database->GetLastInsertedId();
	$token->SetTokenId($id);
	$token->SetCreationTime(date('Y-m-d H:i:s'));
	$token->SetTokenUser(GetTokenUsersByTokenUserId($database, $token->GetTokenUserId())[0]);
	return $token;
	
}

function DeleteToken($database, $tokenId)
{
	$token = GetTokensByTokenId($database, $tokenId)[0];
	
	$query = "DELETE FROM Tokens WHERE TokenId=$tokenId";
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	
	if(0 != $result)
	{
		$token->SetTokenId(0);
	}
	
	return $token;
	
}

function UpdateToken($database, $token)
{
	$query = "UPDATE Tokens SET ";
	$query = $query . "TokenUserId=" . $token->GetTokenUserId().", ";
	$query = $query . "Value='" . $token->GetValue() . "', ";
	$query = $query . "Address='" . $token->GetAddress() . "', ";
	$query = $query . "LastUpdate='" . $token->GetLastUpdate() . "'";
	$query = $query . " WHERE TokenId=" . $token->GetTokenId();
	
	$result = $database->ExecuteSqlWithoutWarning($query);
	if(0 == $result)
	{
		$token->SetTokenId(0);
	}
	return $token;
	
}

function TestAddToken($database)
{
	$token = new Token(
		0,//TokenUserId
		'00000000-0000-0000-0000-000000000000',//Value
		'Test',//Address
		'2000-01-01 00:00:00'//LastUpdate
	);
	
	AddToken($database, $token);
}

function GetEmptyToken()
{
	$token = new Token(
		0,//TokenUserId
		'',//Value
		'',//Address
		'2000-01-01 00:00:00'//LastUpdate
	);
	
	return $token;
}

if(CheckGetParameters(["cmd"]))
{
	if("getTokens" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetTokens($database));
	}

	if("getLastToken" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
			echo json_encode(GetLastToken($database));
	}

	else if("getTokensByValue" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'value'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTokensByValue($database, 
				$_GET["value"]
			));
		}
	
	}
	else if("getTokensByTokenId" == $_GET["cmd"])
	{
		if(CheckGetParameters([
			'tokenId'
			]))
		{
			$database = new DatabaseOperations();
			echo json_encode(GetTokensByTokenId($database, 
				$_GET["tokenId"]
			));
		}
	
	}

}

if(CheckGetParameters(["cmd"]))
{
	if("addToken" == $_GET["cmd"])
	{
		if(CheckPostParameters([
			'tokenUserId'
		]))
		{
			$database = new DatabaseOperations();
			$token = new Token(
				IssetValueNull($_POST['tokenUserId']),
				IssetValueNull($_POST['value']),
				IssetValueNull($_POST['address']),
				IssetValueNull($_POST['lastUpdate'])
			);
	
			echo json_encode(AddToken($database, $token));
		}

	}
}

if(CheckGetParameters(["cmd"]))
{
	if("updateToken" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$token = new Token(
			$_POST['tokenUserId'],
			$_POST['value'],
			$_POST['address'],
			$_POST['lastUpdate']
		);
		$token->SetTokenId($_POST['tokenId']);
		$token->SetCreationTime($_POST['creationTime']);
		
		$token = UpdateToken($database, $token);
		echo json_encode($token);

	}
}

if("DELETE" == $_SERVER['REQUEST_METHOD']
	&& CheckGetParameters(["cmd"]))
{
	if("deleteToken" == $_GET["cmd"])
	{
		$database = new DatabaseOperations();
		$tokenId = $_GET['tokenId'];
		
		$token = DeleteToken($database, $tokenId);
		echo json_encode($token);

	}
}


function GetLastToken($database)
{
	$data = $database->ReadData("SELECT * FROM Tokens ORDER BY CreationTime DESC LIMIT 1");
	$tokens = ConvertListToTokens($data);
	$tokens = CompleteTokenUsers($database, $tokens);
	return $tokens;
}

?>
