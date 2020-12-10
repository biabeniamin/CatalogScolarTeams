//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { User } from './/User'
export interface Mark
{
	markId : number;
	userId : number;
	value : number;
	creationTime : string;
}

export interface MarkJSON
{
	userId : number;
	value : number;
	creationTime : string;
}

export function encodeMark(mark: Mark): MarkJSON {
	return {
		userId:	mark.userId,
		value:	mark.value,
		creationTime:	mark.creationTime,
	}
}

