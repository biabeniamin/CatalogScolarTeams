import { Component, OnInit } from '@angular/core';
import { UserService } from '../UserService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
selector: 'app-user',
templateUrl: './user.component.html',
styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private userService : UserService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addUser(event)
	{
		event.preventDefault();
		const target = event.target;
		let user = UserService.GetDefaultUser();
		user.firstName = target.querySelector('#FirstName').value;
		user.lastName = target.querySelector('#LastName').value;
		user.email = target.querySelector('#Email').value;
		user.type = target.querySelector('#Type').value;
		console.log(user);
		this.userService.AddUser(user);
	}
	
	getUsersByUserId(event)
	{
		event.preventDefault();
		const target = event.target;
		let userId = target.querySelector('#UserId').value;
		console.log(userId);
		this.userService.GetUsersByUserId(userId).subscribe(data =>{
			this.userService.users.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.userService.ConnectToWebSockets();
	}
	

}

