<?php
//generated automatically
class ClassRoom
{
	var $classRoomId;
	var $name;
	var $creationTime;

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
	

	function ClassRoom($Name)
	{
		$this->classRoomId = 0;
	
		$this->name = $Name;
	}

}
?>
