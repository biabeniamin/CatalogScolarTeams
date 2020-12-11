<?php
//generated automatically
require_once 'ClassRoom.php';
require_once 'Teacher.php';
class Classe
{
	var $classeId;
	var $teacherId;
	var $classRoomId;
	var $name;
	var $creationTime;
	var $classRoom;
	var $teacher;

	function GetClasseId()
	{
		return $this->classeId;
	}
	function SetClasseId($value)
	{
		$this->classeId = $value;
	}
	
	function GetTeacherId()
	{
		return $this->teacherId;
	}
	function SetTeacherId($value)
	{
		$this->teacherId = $value;
	}
	
	function GetClassRoomId()
	{
		return $this->classRoomId;
	}
	function SetClassRoomId($value)
	{
		$this->classRoomId = $value;
	}
	
	function GetName()
	{
		return $this->name;
	}
	function SetName($value)
	{
		$this->name = $value;
	}
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	
	function GetClassRoom()
	{
		return $this->classRoom;
	}
	function SetClassRoom($value)
	{
		$this->classRoom = $value;
	}
	
	function GetTeacher()
	{
		return $this->teacher;
	}
	function SetTeacher($value)
	{
		$this->teacher = $value;
	}
	

	function Classe($TeacherId, $ClassRoomId, $Name)
	{
		$this->classeId = 0;
	
		$this->teacherId = $TeacherId;
		$this->classRoomId = $ClassRoomId;
		$this->name = $Name;
	}

}
?>
