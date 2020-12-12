<?php
//generated automatically
class Teacher
{
	var $teacherId;
	var $name;
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
	

	function Teacher($Name, $Email)
	{
		$this->teacherId = 0;
	
		$this->name = $Name;
		$this->email = $Email;
	}

}
?>
