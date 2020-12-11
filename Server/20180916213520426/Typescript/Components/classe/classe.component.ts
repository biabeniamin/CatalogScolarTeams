import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../ClasseService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassRoomService } from '../ClassRoomService'
import { TeacherService } from '../TeacherService'

@Component({
selector: 'app-classe',
templateUrl: './classe.component.html',
styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private classeService : ClasseService, 
		private classRoomService : ClassRoomService, 
		private teacherService : TeacherService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addClasse(event)
	{
		event.preventDefault();
		const target = event.target;
		let classe = ClasseService.GetDefaultClasse();
		classe.teacherId = target.querySelector('#TeacherIdDropDown').value;
		classe.classRoomId = target.querySelector('#ClassRoomIdDropDown').value;
		classe.name = target.querySelector('#Name').value;
		console.log(classe);
		this.classeService.AddClasse(classe);
	}
	
	getClassesByClassRoomId(event)
	{
		event.preventDefault();
		const target = event.target;
		let classRoomId = target.querySelector('#ClassRoomId').value;
		console.log(classRoomId);
		this.classeService.GetClassesByClassRoomId(classRoomId).subscribe(data =>{
			this.classeService.classes.next(data);
		});
	}
	getClassesByClasseId(event)
	{
		event.preventDefault();
		const target = event.target;
		let classeId = target.querySelector('#ClasseId').value;
		console.log(classeId);
		this.classeService.GetClassesByClasseId(classeId).subscribe(data =>{
			this.classeService.classes.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.classeService.ConnectToWebSockets();
	}
	
	classRoomChanged(event)
	{
		console.log(event);
	
	}
	
	teacherChanged(event)
	{
		console.log(event);
	
	}
	

}

