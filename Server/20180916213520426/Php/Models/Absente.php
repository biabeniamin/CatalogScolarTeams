<?php
//generated automatically
require_once 'Teacher.php';
class Absente
{
	var $absenteId;
	var $teacherId;
	var $date;
	var $creationTime;
	var $teacher;

	function GetAbsenteId()
	{
		return $this->absenteId;
	}
	function SetAbsenteId($value)
	{
		$this->absenteId = $value;
	}
	
	function GetTeacherId()
	{
		return $this->teacherId;
	}
	function SetTeacherId($value)
	{
		$this->teacherId = $value;
	}
	
	function GetDate()
	{
		return $this->date;
	}
	function SetDate($value)
	{
		$this->date = $value;
	}
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	
	function GetTeacher()
	{
		return $this->teacher;
	}
	function SetTeacher($value)
	{
		$this->teacher = $value;
	}
	

	function Absente($TeacherId, $Date)
	{
		$this->absenteId = 0;
	
		$this->teacherId = $TeacherId;
		$this->date = $Date;
	}

}
?>
