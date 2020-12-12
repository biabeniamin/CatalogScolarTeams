//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface Student
{
	studentId : number;
	name : string;
	email : string;
	creationTime : string;
}

export interface StudentJSON
{
	name : string;
	email : string;
	creationTime : string;
}

export function encodeStudent(student: Student): StudentJSON {
	return {
		name:	student.name,
		email:	student.email,
		creationTime:	student.creationTime,
	}
}

