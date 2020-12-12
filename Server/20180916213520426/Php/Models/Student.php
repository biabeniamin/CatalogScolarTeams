<?php
//generated automatically
class Student
{
	var $studentId;
	var $name;
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
	
	function GetName()
	{
		return $this->name;
	}
	function SetName($value)
	{
		$this->name = $value;
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
	

	function Student($Name, $Email)
	{
		$this->studentId = 0;
	
		$this->name = $Name;
		$this->email = $Email;
	}

}
?>
