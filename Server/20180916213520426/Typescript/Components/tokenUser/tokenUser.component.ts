import { Component, OnInit } from '@angular/core';
import { TokenUserService } from '../TokenUserService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
selector: 'app-tokenUser',
templateUrl: './tokenUser.component.html',
styleUrls: ['./tokenUser.component.css']
})
export class TokenUserComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private tokenUserService : TokenUserService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addTokenUser(event)
	{
		event.preventDefault();
		const target = event.target;
		let tokenUser = TokenUserService.GetDefaultTokenUser();
		tokenUser.username = target.querySelector('#Username').value;
		tokenUser.password = target.querySelector('#Password').value;
		console.log(tokenUser);
		this.tokenUserService.AddTokenUser(tokenUser);
	}
	
	getTokenUsersByUsernamePassword(event)
	{
		event.preventDefault();
		const target = event.target;
		let username = target.querySelector('#Username').value;
		console.log(username);
		let password = target.querySelector('#Password').value;
		console.log(password);
		this.tokenUserService.GetTokenUsersByUsernamePassword(username, password).subscribe(data =>{
			this.tokenUserService.tokenUsers.next(data);
		});
	}
	getTokenUsersByTokenUserId(event)
	{
		event.preventDefault();
		const target = event.target;
		let tokenUserId = target.querySelector('#TokenUserId').value;
		console.log(tokenUserId);
		this.tokenUserService.GetTokenUsersByTokenUserId(tokenUserId).subscribe(data =>{
			this.tokenUserService.tokenUsers.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.tokenUserService.ConnectToWebSockets();
	}
	

}

