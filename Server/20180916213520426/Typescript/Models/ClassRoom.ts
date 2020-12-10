//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
export interface ClassRoom
{
	classRoomId : number;
	name : string;
	creationTime : string;
}

export interface ClassRoomJSON
{
	name : string;
	creationTime : string;
}

export function encodeClassRoom(classRoom: ClassRoom): ClassRoomJSON {
	return {
		name:	classRoom.name,
		creationTime:	classRoom.creationTime,
	}
}

