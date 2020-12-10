<?php
//generated automatically
require_once 'User.php';
class Absente
{
	var $absenteId;
	var $userId;
	var $date;
	var $creationTime;
	var $user;

	function GetAbsenteId()
	{
		return $this->absenteId;
	}
	function SetAbsenteId($value)
	{
		$this->absenteId = $value;
	}
	
	function GetUserId()
	{
		return $this->userId;
	}
	function SetUserId($value)
	{
		$this->userId = $value;
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
	
	function GetUser()
	{
		return $this->user;
	}
	function SetUser($value)
	{
		$this->user = $value;
	}
	

	function Absente($UserId, $Date)
	{
		$this->absenteId = 0;
	
		$this->userId = $UserId;
		$this->date = $Date;
	}

}
?>
