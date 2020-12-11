<?php
//generated automatically
require_once 'Teacher.php';
require_once 'Student.php';
require_once 'Classe.php';
class Mark
{
	var $markId;
	var $classeId;
	var $studentId;
	var $teacherId;
	var $value;
	var $date;
	var $creationTime;
	var $teacher;
	var $student;
	var $classe;

	function GetMarkId()
	{
		return $this->markId;
	}
	function SetMarkId($value)
	{
		$this->markId = $value;
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
	
	function GetValue()
	{
		return $this->value;
	}
	function SetValue($value)
	{
		$this->value = $value;
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
	

	function Mark($ClasseId, $StudentId, $TeacherId, $Value, $Date)
	{
		$this->markId = 0;
	
		$this->classeId = $ClasseId;
		$this->studentId = $StudentId;
		$this->teacherId = $TeacherId;
		$this->value = $Value;
		$this->date = $Date;
	}

}
?>
