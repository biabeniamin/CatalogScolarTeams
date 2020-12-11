import { Component, OnInit } from '@angular/core';
import { AbsenteService } from '../AbsenteService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { TeacherService } from '../TeacherService'

@Component({
selector: 'app-absente',
templateUrl: './absente.component.html',
styleUrls: ['./absente.component.css']
})
export class AbsenteComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private absenteService : AbsenteService, 
		private teacherService : TeacherService
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
	

}

