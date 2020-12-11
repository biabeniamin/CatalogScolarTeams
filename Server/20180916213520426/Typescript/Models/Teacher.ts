//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface Teacher
{
	teacherId : number;
	firstName : string;
	lastName : string;
	email : string;
	creationTime : string;
}

export interface TeacherJSON
{
	firstName : string;
	lastName : string;
	email : string;
	creationTime : string;
}

export function encodeTeacher(teacher: Teacher): TeacherJSON {
	return {
		firstName:	teacher.firstName,
		lastName:	teacher.lastName,
		email:	teacher.email,
		creationTime:	teacher.creationTime,
	}
}

