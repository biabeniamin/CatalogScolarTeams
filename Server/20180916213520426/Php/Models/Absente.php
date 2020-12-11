<?php
//generated automatically
require_once 'Teacher.php';
require_once 'Student.php';
require_once 'Classe.php';
class Absente
{
	var $absenteId;
	var $classeId;
	var $studentId;
	var $teacherId;
	var $date;
	var $creationTime;
	var $teacher;
	var $student;
	var $classe;

	function GetAbsenteId()
	{
		return $this->absenteId;
	}
	function SetAbsenteId($value)
	{
		$this->absenteId = $value;
	}
	
	function GetClasseId()
	{
		return $this->classeId;
	}
	function SetClasseId($value)
	{
		$this->classeId = $value;
	}
	
	function GetStudentId()
	{
		return $this->studentId;
	}
	function SetStudentId($value)
	{
		$this->studentId = $value;
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
	
	function GetStudent()
	{
		return $this->student;
	}
	function SetStudent($value)
	{
		$this->student = $value;
	}
	
	function GetClasse()
	{
		return $this->classe;
	}
	function SetClasse($value)
	{
		$this->classe = $value;
	}
	

	function Absente($ClasseId, $StudentId, $TeacherId, $Date)
	{
		$this->absenteId = 0;
	
		$this->classeId = $ClasseId;
		$this->studentId = $StudentId;
		$this->teacherId = $TeacherId;
		$this->date = $Date;
	}

}
?>
