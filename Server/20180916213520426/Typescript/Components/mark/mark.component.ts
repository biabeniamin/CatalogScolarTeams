import { Component, OnInit } from '@angular/core';
import { MarkService } from '../MarkService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../UserService'

@Component({
selector: 'app-mark',
templateUrl: './mark.component.html',
styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private markService : MarkService, 
		private userService : UserService
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
		mark.userId = target.querySelector('#UserIdDropDown').value;
		mark.value = target.querySelector('#Value').value;
		console.log(mark);
		this.markService.AddMark(mark);
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
	
	userChanged(event)
	{
		console.log(event);
	
	}
	

}

