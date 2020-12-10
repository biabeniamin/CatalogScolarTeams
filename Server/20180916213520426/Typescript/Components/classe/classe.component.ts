import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../ClasseService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassRoomService } from '../ClassRoomService'
import { UserService } from '../UserService'

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
		private userService : UserService
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
		classe.userId = target.querySelector('#UserIdDropDown').value;
		classe.classRoomId = target.querySelector('#ClassRoomIdDropDown').value;
		classe.name = target.querySelector('#Name').value;
		console.log(classe);
		this.classeService.AddClasse(classe);
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
	
	userChanged(event)
	{
		console.log(event);
	
	}
	

}

