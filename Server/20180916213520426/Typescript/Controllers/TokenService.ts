import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Token, encodeToken } from '../app/Models/Token'
import { TokenUser } from '../app/Models/TokenUser'
import { TokenUserService } from './TokenUserService'

@Injectable({
    providedIn : 'root'
})
export class TokenService
{
	public tokens : BehaviorSubject<Token[]>;
	private webSocketsSubject : Subject<Message>;
	GetTokens()
	{
		return this.http.get<Token[]>(ServerUrl.GetUrl()  + `Tokens?cmd=get`).subscribe(data =>
		{
			this.tokens.next(data);
		});
	}
	
	static GetDefaultToken()
	{
		return {
		tokenId : 0,
		tokenUserId : 0,
		value : '00000000-0000-0000-0000-000000000000',
		address : 'Test',
		lastUpdate : '2000-01-01 00:00:00',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetTokensByValue(value)
	{
		return this.http.get<Token[]>(ServerUrl.GetUrl()  + `Tokens?cmd=getTokensByValue&value=${value}`);
	}
	GetTokensByTokenId(tokenId)
	{
		return this.http.get<Token[]>(ServerUrl.GetUrl()  + `Tokens?cmd=getTokensByTokenId&tokenId=${tokenId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.tokens = new BehaviorSubject([TokenService.GetDefaultToken()]);
		this.GetTokens();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddToken(token)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Tokens', token)));
			return
		}
		
		return this.http.post<Token>(ServerUrl.GetUrl()  + `Tokens?cmd=post`, token).subscribe(token =>
		{
			console.log(token);
			if(0 != token.tokenId)
			{
				let items = this.tokens.getValue()
				items.push(token)
				this.tokens.next(items)
			}
		});
	}
	
	UpdateToken(token)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Tokens', token)));
			return
		}
		
		return this.http.patch<Token>(ServerUrl.GetUrl()  + `Tokens?cmd=updateToken`, token).subscribe(token =>
		{
			console.log(token);
			return token;
		});
	}
	
	DeleteToken(token)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Tokens', token)));
			return
		}
		
		return this.http.delete<Token>(ServerUrl.GetUrl()  + `Tokens&cmd=delete&tokenId=` +  token.tokenId).subscribe(token =>
		{
			console.log(token);
			return token;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Tokens');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.tokens.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.tokens.getValue()
				items.push(request.data);
				this.tokens.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.tokens.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].tokenId == request.data.tokenId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.tokens.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.tokens.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].tokenId == request.data.tokenId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.tokens.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Tokens', null)));
	}
	

}
