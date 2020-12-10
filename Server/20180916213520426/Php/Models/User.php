<?php
//generated automatically
class User
{
	var $userId;
	var $firstName;
	var $lastName;
	var $email;
	var $type;
	var $creationTime;

	function GetUserId()
	{
		return $this->userId;
	}
	function SetUserId($value)
	{
		$this->userId = $value;
	}
	
	function GetFirstName()
	{
		return $this->firstName;
	}
	function SetFirstName($value)
	{
		$this->firstName = $value;
	}
	
	function GetLastName()
	{
		return $this->lastName;
	}
	function SetLastName($value)
	{
		$this->lastName = $value;
	}
	
	function GetEmail()
	{
		return $this->email;
	}
	function SetEmail($value)
	{
		$this->email = $value;
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
	

	function User($FirstName, $LastName, $Email, $Type)
	{
		$this->userId = 0;
	
		$this->firstName = $FirstName;
		$this->lastName = $LastName;
		$this->email = $Email;
		$this->type = $Type;
	}

}
?>
