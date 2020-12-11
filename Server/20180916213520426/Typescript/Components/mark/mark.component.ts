import { Component, OnInit } from '@angular/core';
import { MarkService } from '../MarkService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { TeacherService } from '../TeacherService'
import { StudentService } from '../StudentService'
import { ClasseService } from '../ClasseService'

@Component({
selector: 'app-mark',
templateUrl: './mark.component.html',
styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private markService : MarkService, 
		private teacherService : TeacherService, 
		private studentService : StudentService, 
		private classeService : ClasseService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addMark(event)
	{
		event.preventDefault();
		const target = event.target;
		let mark = MarkService.GetDefaultMark();
		mark.classeId = target.querySelector('#ClasseIdDropDown').value;
		mark.studentId = target.querySelector('#StudentIdDropDown').value;
		mark.teacherId = target.querySelector('#TeacherIdDropDown').value;
		mark.value = target.querySelector('#Value').value;
		mark.date = target.querySelector('#Date').value;
		console.log(mark);
		this.markService.AddMark(mark);
	}
	
	getMarksByClasseIdStudentId(event)
	{
		event.preventDefault();
		const target = event.target;
		let classeId = target.querySelector('#ClasseId').value;
		console.log(classeId);
		let studentId = target.querySelector('#StudentId').value;
		console.log(studentId);
		this.markService.GetMarksByClasseIdStudentId(classeId, studentId).subscribe(data =>{
			this.markService.marks.next(data);
		});
	}
	getMarksByMarkId(event)
	{
		event.preventDefault();
		const target = event.target;
		let markId = target.querySelector('#MarkId').value;
		console.log(markId);
		this.markService.GetMarksByMarkId(markId).subscribe(data =>{
			this.markService.marks.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.markService.ConnectToWebSockets();
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

