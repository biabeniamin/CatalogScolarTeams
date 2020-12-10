<?php
//generated automatically
require_once 'ClassRoom.php';
require_once 'User.php';
class Classe
{
	var $classeId;
	var $userId;
	var $classRoomId;
	var $name;
	var $creationTime;
	var $classRoom;
	var $user;

	function GetClasseId()
	{
		return $this->classeId;
	}
	function SetClasseId($value)
	{
		$this->classeId = $value;
	}
	
	function GetUserId()
	{
		return $this->userId;
	}
	function SetUserId($value)
	{
		$this->userId = $value;
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
	
	function GetUser()
	{
		return $this->user;
	}
	function SetUser($value)
	{
		$this->user = $value;
	}
	

	function Classe($UserId, $ClassRoomId, $Name)
	{
		$this->classeId = 0;
	
		$this->userId = $UserId;
		$this->classRoomId = $ClassRoomId;
		$this->name = $Name;
	}

}
?>
