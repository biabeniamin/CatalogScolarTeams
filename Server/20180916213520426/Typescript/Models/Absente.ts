//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { Teacher } from './/Teacher'
import { Student } from './/Student'
import { Classe } from './/Classe'
export interface Absente
{
	absenteId : number;
	classeId : number;
	studentId : number;
	teacherId : number;
	date : string;
	creationTime : string;
}

export interface AbsenteJSON
{
	classeId : number;
	studentId : number;
	teacherId : number;
	date : string;
	creationTime : string;
}

export function encodeAbsente(absente: Absente): AbsenteJSON {
	return {
		classeId:	absente.classeId,
		studentId:	absente.studentId,
		teacherId:	absente.teacherId,
		date:	absente.date,
		creationTime:	absente.creationTime,
	}
}

