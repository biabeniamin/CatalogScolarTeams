import { Component, OnInit } from '@angular/core';
import { TokenService } from '../TokenService'
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenUserService } from '../TokenUserService'

@Component({
selector: 'app-token',
templateUrl: './token.component.html',
styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit
{
	
	constructor(private http:HttpClient, 
		private tokenService : TokenService, 
		private tokenUserService : TokenUserService
	)
	{
	
	}
	
	ngOnInit()
	{
	
	}
	
	addToken(event)
	{
		event.preventDefault();
		const target = event.target;
		let token = TokenService.GetDefaultToken();
		token.tokenUserId = target.querySelector('#TokenUserIdDropDown').value;
		token.value = target.querySelector('#Value').value;
		token.address = target.querySelector('#Address').value;
		token.lastUpdate = target.querySelector('#LastUpdate').value;
		console.log(token);
		this.tokenService.AddToken(token);
	}
	
	getTokensByValue(event)
	{
		event.preventDefault();
		const target = event.target;
		let value = target.querySelector('#Value').value;
		console.log(value);
		this.tokenService.GetTokensByValue(value).subscribe(data =>{
			this.tokenService.tokens.next(data);
		});
	}
	getTokensByTokenId(event)
	{
		event.preventDefault();
		const target = event.target;
		let tokenId = target.querySelector('#TokenId').value;
		console.log(tokenId);
		this.tokenService.GetTokensByTokenId(tokenId).subscribe(data =>{
			this.tokenService.tokens.next(data);
		});
	}
	
	updateLive(event)
	{
		event.preventDefault();
		const target = event.target;
		this.tokenService.ConnectToWebSockets();
	}
	
	tokenUserChanged(event)
	{
		console.log(event);
	
	}
	

}

