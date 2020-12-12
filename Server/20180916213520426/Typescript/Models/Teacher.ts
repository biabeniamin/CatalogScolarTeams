//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface Teacher
{
	teacherId : number;
	name : string;
	email : string;
	creationTime : string;
}

export interface TeacherJSON
{
	name : string;
	email : string;
	creationTime : string;
}

export function encodeTeacher(teacher: Teacher): TeacherJSON {
	return {
		name:	teacher.name,
		email:	teacher.email,
		creationTime:	teacher.creationTime,
	}
}

