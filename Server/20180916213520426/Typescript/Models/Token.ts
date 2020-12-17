//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { TokenUser } from './/TokenUser'
export interface Token
{
	tokenId : number;
	tokenUserId : number;
	value : string;
	address : string;
	lastUpdate : string;
	creationTime : string;
}

export interface TokenJSON
{
	tokenUserId : number;
	value : string;
	address : string;
	lastUpdate : string;
	creationTime : string;
}

export function encodeToken(token: Token): TokenJSON {
	return {
		tokenUserId:	token.tokenUserId,
		value:	token.value,
		address:	token.address,
		lastUpdate:	token.lastUpdate,
		creationTime:	token.creationTime,
	}
}

