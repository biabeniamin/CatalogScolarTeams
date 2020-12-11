//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { Teacher } from './/Teacher'
export interface Absente
{
	absenteId : number;
	teacherId : number;
	date : string;
	creationTime : string;
}

export interface AbsenteJSON
{
	teacherId : number;
	date : string;
	creationTime : string;
}

export function encodeAbsente(absente: Absente): AbsenteJSON {
	return {
		teacherId:	absente.teacherId,
		date:	absente.date,
		creationTime:	absente.creationTime,
	}
}

