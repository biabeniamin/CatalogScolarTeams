import { Component, OnInit } from '@angular/core';
import { AbsenteService } from '../AbsenteService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { TeacherService } from '../TeacherService'
import { StudentService } from '../StudentService'
import { ClasseService } from '../ClasseService'

@Component({
selector: 'app-absente',
templateUrl: './absente.component.html',
styleUrls: ['./absente.component.css']
})
export class AbsenteComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private absenteService : AbsenteService, 
		private teacherService : TeacherService, 
		private studentService : StudentService, 
		private classeService : ClasseService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addAbsente(event)
	{
		event.preventDefault();
		const target = event.target;
		let absente = AbsenteService.GetDefaultAbsente();
		absente.classeId = target.querySelector('#ClasseIdDropDown').value;
		absente.studentId = target.querySelector('#StudentIdDropDown').value;
		absente.teacherId = target.querySelector('#TeacherIdDropDown').value;
		absente.date = target.querySelector('#Date').value;
		console.log(absente);
		this.absenteService.AddAbsente(absente);
	}
	
	getAbsenteByAbsenteId(event)
	{
		event.preventDefault();
		const target = event.target;
		let absenteId = target.querySelector('#AbsenteId').value;
		console.log(absenteId);
		this.absenteService.GetAbsenteByAbsenteId(absenteId).subscribe(data =>{
			this.absenteService.absente.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.absenteService.ConnectToWebSockets();
	}
	
	teacherChanged(event)
	{
		console.log(event);
	
	}
	
	studentChanged(event)
	{
		console.log(event);
	
	}
	
	classeChanged(event)
	{
		console.log(event);
	
	}
	

}

