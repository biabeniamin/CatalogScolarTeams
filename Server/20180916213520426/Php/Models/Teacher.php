<?php
//generated automatically
class Teacher
{
	var $teacherId;
	var $firstName;
	var $lastName;
	var $email;
	var $creationTime;

	function GetTeacherId()
	{
		return $this->teacherId;
	}
	function SetTeacherId($value)
	{
		$this->teacherId = $value;
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
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	

	function Teacher($FirstName, $LastName, $Email)
	{
		$this->teacherId = 0;
	
		$this->firstName = $FirstName;
		$this->lastName = $LastName;
		$this->email = $Email;
	}

}
?>
