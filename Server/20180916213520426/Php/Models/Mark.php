<?php
//generated automatically
require_once 'User.php';
class Mark
{
	var $markId;
	var $userId;
	var $value;
	var $creationTime;
	var $user;

	function GetMarkId()
	{
		return $this->markId;
	}
	function SetMarkId($value)
	{
		$this->markId = $value;
	}
	
	function GetUserId()
	{
		return $this->userId;
	}
	function SetUserId($value)
	{
		$this->userId = $value;
	}
	
	function GetValue()
	{
		return $this->value;
	}
	function SetValue($value)
	{
		$this->value = $value;
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
	

	function Mark($UserId, $Value)
	{
		$this->markId = 0;
	
		$this->userId = $UserId;
		$this->value = $Value;
	}

}
?>
