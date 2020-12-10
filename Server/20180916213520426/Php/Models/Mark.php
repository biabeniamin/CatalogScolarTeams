<?php
//generated automatically
require_once 'User.php';
require_once 'Classe.php';
class Mark
{
	var $markId;
	var $classeId;
	var $userId;
	var $value;
	var $creationTime;
	var $user;
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
	
	function GetClasse()
	{
		return $this->classe;
	}
	function SetClasse($value)
	{
		$this->classe = $value;
	}
	

	function Mark($ClasseId, $UserId, $Value)
	{
		$this->markId = 0;
	
		$this->classeId = $ClasseId;
		$this->userId = $UserId;
		$this->value = $Value;
	}

}
?>
