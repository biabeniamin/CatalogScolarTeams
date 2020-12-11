//generated automatically
import { log } from 'util';
import { Injectable } from '@angular/core'
import { ClassRoom } from './/ClassRoom'
import { Teacher } from './/Teacher'
export interface Classe
{
	classeId : number;
	teacherId : number;
	classRoomId : number;
	name : string;
	creationTime : string;
}

export interface ClasseJSON
{
	teacherId : number;
	classRoomId : number;
	name : string;
	creationTime : string;
}

export function encodeClasse(classe: Classe): ClasseJSON {
	return {
		teacherId:	classe.teacherId,
		classRoomId:	classe.classRoomId,
		name:	classe.name,
		creationTime:	classe.creationTime,
	}
}

