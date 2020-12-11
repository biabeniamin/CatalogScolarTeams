import { Component, OnInit } from '@angular/core';
import { StudentClasseService } from '../StudentClasseService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ClasseService } from '../ClasseService'
import { StudentService } from '../StudentService'

@Component({
selector: 'app-studentClasse',
templateUrl: './studentClasse.component.html',
styleUrls: ['./studentClasse.component.css']
})
export class StudentClasseComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private studentClasseService : StudentClasseService, 
		private classeService : ClasseService, 
		private studentService : StudentService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addStudentClasse(event)
	{
		event.preventDefault();
		const target = event.target;
		let studentClasse = StudentClasseService.GetDefaultStudentClasse();
		studentClasse.studentId = target.querySelector('#StudentIdDropDown').value;
		studentClasse.classeId = target.querySelector('#ClasseIdDropDown').value;
		console.log(studentClasse);
		this.studentClasseService.AddStudentClasse(studentClasse);
	}
	
	getStudentClassesByStudentClasseId(event)
	{
		event.preventDefault();
		const target = event.target;
		let studentClasseId = target.querySelector('#StudentClasseId').value;
		console.log(studentClasseId);
		this.studentClasseService.GetStudentClassesByStudentClasseId(studentClasseId).subscribe(data =>{
			this.studentClasseService.studentClasses.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.studentClasseService.ConnectToWebSockets();
	}
	
	classeChanged(event)
	{
		console.log(event);
	
	}
	
	studentChanged(event)
	{
		console.log(event);
	
	}
	

}

