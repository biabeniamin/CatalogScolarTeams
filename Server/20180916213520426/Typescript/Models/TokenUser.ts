//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface TokenUser
{
	tokenUserId : number;
	username : string;
	password : string;
	creationTime : string;
}

export interface TokenUserJSON
{
	username : string;
	password : string;
	creationTime : string;
}

export function encodeTokenUser(tokenUser: TokenUser): TokenUserJSON {
	return {
		username:	tokenUser.username,
		password:	tokenUser.password,
		creationTime:	tokenUser.creationTime,
	}
}

