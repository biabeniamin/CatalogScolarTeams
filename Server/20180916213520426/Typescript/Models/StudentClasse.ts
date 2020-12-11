//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { Classe } from './/Classe'
import { Student } from './/Student'
export interface StudentClasse
{
	studentClasseId : number;
	studentId : number;
	classeId : number;
	creationTime : string;
}

export interface StudentClasseJSON
{
	studentId : number;
	classeId : number;
	creationTime : string;
}

export function encodeStudentClasse(studentClasse: StudentClasse): StudentClasseJSON {
	return {
		studentId:	studentClasse.studentId,
		classeId:	studentClasse.classeId,
		creationTime:	studentClasse.creationTime,
	}
}

