//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface Student
{
	studentId : number;
	firstName : string;
	lastName : string;
	email : string;
	creationTime : string;
}

export interface StudentJSON
{
	firstName : string;
	lastName : string;
	email : string;
	creationTime : string;
}

export function encodeStudent(student: Student): StudentJSON {
	return {
		firstName:	student.firstName,
		lastName:	student.lastName,
		email:	student.email,
		creationTime:	student.creationTime,
	}
}

