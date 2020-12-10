import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../ClassRoomService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
selector: 'app-classRoom',
templateUrl: './classRoom.component.html',
styleUrls: ['./classRoom.component.css']
})
export class ClassRoomComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private classRoomService : ClassRoomService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addClassRoom(event)
	{
		event.preventDefault();
		const target = event.target;
		let classRoom = ClassRoomService.GetDefaultClassRoom();
		classRoom.name = target.querySelector('#Name').value;
		console.log(classRoom);
		this.classRoomService.AddClassRoom(classRoom);
	}
	
	getClassRoomsByClassRoomId(event)
	{
		event.preventDefault();
		const target = event.target;
		let classRoomId = target.querySelector('#ClassRoomId').value;
		console.log(classRoomId);
		this.classRoomService.GetClassRoomsByClassRoomId(classRoomId).subscribe(data =>{
			this.classRoomService.classRooms.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.classRoomService.ConnectToWebSockets();
	}
	

}

