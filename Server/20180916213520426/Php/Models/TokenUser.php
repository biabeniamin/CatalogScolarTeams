<?php
//generated automatically
class TokenUser
{
	var $tokenUserId;
	var $username;
	var $password;
	var $type;
	var $creationTime;

	function GetTokenUserId()
	{
		return $this->tokenUserId;
	}
	function SetTokenUserId($value)
	{
		$this->tokenUserId = $value;
	}
	
	function GetUsername()
	{
		return $this->username;
	}
	function SetUsername($value)
	{
		$this->username = $value;
	}
	
	function GetPassword()
	{
		return $this->password;
	}
	function SetPassword($value)
	{
		$this->password = $value;
	}
	
	function GetType()
	{
		return $this->type;
	}
	function SetType($value)
	{
		$this->type = $value;
	}
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	

	function TokenUser($Username, $Password, $Type)
	{
		$this->tokenUserId = 0;
	
		$this->username = $Username;
		$this->password = $Password;
		$this->type = $Type;
	}

}
?>
