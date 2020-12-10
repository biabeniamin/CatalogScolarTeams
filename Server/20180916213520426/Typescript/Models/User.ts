//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface User
{
	userId : number;
	firstName : string;
	lastName : string;
	email : string;
	type : number;
	creationTime : string;
}

export interface UserJSON
{
	firstName : string;
	lastName : string;
	email : string;
	type : number;
	creationTime : string;
}

export function encodeUser(user: User): UserJSON {
	return {
		firstName:	user.firstName,
		lastName:	user.lastName,
		email:	user.email,
		type:	user.type,
		creationTime:	user.creationTime,
	}
}

