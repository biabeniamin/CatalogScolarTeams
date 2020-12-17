<?php
//generated automatically
require_once 'TokenUser.php';
class Token
{
	var $tokenId;
	var $tokenUserId;
	var $value;
	var $address;
	var $lastUpdate;
	var $creationTime;
	var $tokenUser;

	function GetTokenId()
	{
		return $this->tokenId;
	}
	function SetTokenId($value)
	{
		$this->tokenId = $value;
	}
	
	function GetTokenUserId()
	{
		return $this->tokenUserId;
	}
	function SetTokenUserId($value)
	{
		$this->tokenUserId = $value;
	}
	
	function GetValue()
	{
		return $this->value;
	}
	function SetValue($value)
	{
		$this->value = $value;
	}
	
	function GetAddress()
	{
		return $this->address;
	}
	function SetAddress($value)
	{
		$this->address = $value;
	}
	
	function GetLastUpdate()
	{
		return $this->lastUpdate;
	}
	function SetLastUpdate($value)
	{
		$this->lastUpdate = $value;
	}
	
	function GetCreationTime()
	{
		return $this->creationTime;
	}
	function SetCreationTime($value)
	{
		$this->creationTime = $value;
	}
	
	function GetTokenUser()
	{
		return $this->tokenUser;
	}
	function SetTokenUser($value)
	{
		$this->tokenUser = $value;
	}
	

	function Token($TokenUserId, $Value, $Address, $LastUpdate)
	{
		$this->tokenId = 0;
	
		$this->tokenUserId = $TokenUserId;
		$this->value = $Value;
		$this->address = $Address;
		$this->lastUpdate = $LastUpdate;
	}

}
?>
