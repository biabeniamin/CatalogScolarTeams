import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../TeacherService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
selector: 'app-teacher',
templateUrl: './teacher.component.html',
styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private teacherService : TeacherService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addTeacher(event)
	{
		event.preventDefault();
		const target = event.target;
		let teacher = TeacherService.GetDefaultTeacher();
		teacher.name = target.querySelector('#Name').value;
		teacher.email = target.querySelector('#Email').value;
		console.log(teacher);
		this.teacherService.AddTeacher(teacher);
	}
	
	getTeachersByEmail(event)
	{
		event.preventDefault();
		const target = event.target;
		let email = target.querySelector('#Email').value;
		console.log(email);
		this.teacherService.GetTeachersByEmail(email).subscribe(data =>{
			this.teacherService.teachers.next(data);
		});
	}
	getTeachersByTeacherId(event)
	{
		event.preventDefault();
		const target = event.target;
		let teacherId = target.querySelector('#TeacherId').value;
		console.log(teacherId);
		this.teacherService.GetTeachersByTeacherId(teacherId).subscribe(data =>{
			this.teacherService.teachers.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.teacherService.ConnectToWebSockets();
	}
	

}

