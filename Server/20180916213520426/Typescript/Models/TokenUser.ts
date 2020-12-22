//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface TokenUser
{
	tokenUserId : number;
	username : string;
	password : string;
	type : number;
	creationTime : string;
}

export interface TokenUserJSON
{
	username : string;
	password : string;
	type : number;
	creationTime : string;
}

export function encodeTokenUser(tokenUser: TokenUser): TokenUserJSON {
	return {
		username:	tokenUser.username,
		password:	tokenUser.password,
		type:	tokenUser.type,
		creationTime:	tokenUser.creationTime,
	}
}

