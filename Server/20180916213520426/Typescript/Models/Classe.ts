//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { ClassRoom } from './/ClassRoom'
import { User } from './/User'
export interface Classe
{
	classeId : number;
	userId : number;
	classRoomId : number;
	name : string;
	creationTime : string;
}

export interface ClasseJSON
{
	userId : number;
	classRoomId : number;
	name : string;
	creationTime : string;
}

export function encodeClasse(classe: Classe): ClasseJSON {
	return {
		userId:	classe.userId,
		classRoomId:	classe.classRoomId,
		name:	classe.name,
		creationTime:	classe.creationTime,
	}
}

