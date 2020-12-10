//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { User } from './/User'
export interface Absente
{
	absenteId : number;
	userId : number;
	date : string;
	creationTime : string;
}

export interface AbsenteJSON
{
	userId : number;
	date : string;
	creationTime : string;
}

export function encodeAbsente(absente: Absente): AbsenteJSON {
	return {
		userId:	absente.userId,
		date:	absente.date,
		creationTime:	absente.creationTime,
	}
}

