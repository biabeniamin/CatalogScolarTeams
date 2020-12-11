//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { Teacher } from './/Teacher'
import { Student } from './/Student'
import { Classe } from './/Classe'
export interface Mark
{
	markId : number;
	classeId : number;
	studentId : number;
	teacherId : number;
	value : number;
	creationTime : string;
}

export interface MarkJSON
{
	classeId : number;
	studentId : number;
	teacherId : number;
	value : number;
	creationTime : string;
}

export function encodeMark(mark: Mark): MarkJSON {
	return {
		classeId:	mark.classeId,
		studentId:	mark.studentId,
		teacherId:	mark.teacherId,
		value:	mark.value,
		creationTime:	mark.creationTime,
	}
}

