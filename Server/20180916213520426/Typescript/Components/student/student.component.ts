import { Component, OnInit } from '@angular/core';
import { StudentService } from '../StudentService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
selector: 'app-student',
templateUrl: './student.component.html',
styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private studentService : StudentService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addStudent(event)
	{
		event.preventDefault();
		const target = event.target;
		let student = StudentService.GetDefaultStudent();
		student.name = target.querySelector('#Name').value;
		student.email = target.querySelector('#Email').value;
		console.log(student);
		this.studentService.AddStudent(student);
	}
	
	getStudentsByEmail(event)
	{
		event.preventDefault();
		const target = event.target;
		let email = target.querySelector('#Email').value;
		console.log(email);
		this.studentService.GetStudentsByEmail(email).subscribe(data =>{
			this.studentService.students.next(data);
		});
	}
	getStudentsByStudentId(event)
	{
		event.preventDefault();
		const target = event.target;
		let studentId = target.querySelector('#StudentId').value;
		console.log(studentId);
		this.studentService.GetStudentsByStudentId(studentId).subscribe(data =>{
			this.studentService.students.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.studentService.ConnectToWebSockets();
	}
	

}

