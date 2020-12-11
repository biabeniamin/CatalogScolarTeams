<?php
//generated automatically
require_once 'Classe.php';
require_once 'Student.php';
class StudentClasse
{
	var $studentClasseId;
	var $studentId;
	var $classeId;
	var $creationTime;
	var $classe;
	var $student;

	function GetStudentClasseId()
	{
		return $this->studentClasseId;
	}
	function SetStudentClasseId($value)
	{
		$this->studentClasseId = $value;
	}
	
	function GetStudentId()
	{
		return $this->studentId;
	}
	function SetStudentId($value)
	{
		$this->studentId = $value;
	}
	
	function GetClasseId()
	{
		return $this->classeId;
	}
	function SetClasseId($value)
	{
		$this->classeId = $value;
	}
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	
	function GetClasse()
	{
		return $this->classe;
	}
	function SetClasse($value)
	{
		$this->classe = $value;
	}
	
	function GetStudent()
	{
		return $this->student;
	}
	function SetStudent($value)
	{
		$this->student = $value;
	}
	

	function StudentClasse($StudentId, $ClasseId)
	{
		$this->studentClasseId = 0;
	
		$this->studentId = $StudentId;
		$this->classeId = $ClasseId;
	}

}
?>
