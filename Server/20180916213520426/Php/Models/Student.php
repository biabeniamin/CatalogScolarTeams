<?php
//generated automatically
class Student
{
	var $studentId;
	var $firstName;
	var $lastName;
	var $email;
	var $creationTime;

	function GetStudentId()
	{
		return $this->studentId;
	}
	function SetStudentId($value)
	{
		$this->studentId = $value;
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
	

	function Student($FirstName, $LastName, $Email)
	{
		$this->studentId = 0;
	
		$this->firstName = $FirstName;
		$this->lastName = $LastName;
		$this->email = $Email;
	}

}
?>
