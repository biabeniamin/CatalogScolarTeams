import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { TokenUser, encodeTokenUser } from '../app/Models/TokenUser'

@Injectable({
    providedIn : 'root'
})
export class TokenUserService
{
	public tokenUsers : BehaviorSubject<TokenUser[]>;
	private webSocketsSubject : Subject<Message>;
	GetTokenUsers()
	{
		return this.http.get<TokenUser[]>(ServerUrl.GetUrl()  + `TokenUsers?cmd=get`).subscribe(data =>
		{
			this.tokenUsers.next(data);
		});
	}
	
	static GetDefaultTokenUser()
	{
		return {
		tokenUserId : 0,
		username : 'Test',
		password : 'Test',
		type : 0,
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetTokenUsersByUsernamePassword(username, password)
	{
		return this.http.get<TokenUser[]>(ServerUrl.GetUrl()  + `TokenUsers?cmd=getTokenUsersByUsernamePassword&username=${username}&password=${password}`);
	}
	GetTokenUsersByTokenUserId(tokenUserId)
	{
		return this.http.get<TokenUser[]>(ServerUrl.GetUrl()  + `TokenUsers?cmd=getTokenUsersByTokenUserId&tokenUserId=${tokenUserId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.tokenUsers = new BehaviorSubject([TokenUserService.GetDefaultTokenUser()]);
		this.GetTokenUsers();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddTokenUser(tokenUser)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'TokenUsers', tokenUser)));
			return
		}
		
		return this.http.post<TokenUser>(ServerUrl.GetUrl()  + `TokenUsers?cmd=post`, tokenUser).subscribe(tokenUser =>
		{
			console.log(tokenUser);
			if(0 != tokenUser.tokenUserId)
			{
				let items = this.tokenUsers.getValue()
				items.push(tokenUser)
				this.tokenUsers.next(items)
			}
		});
	}
	
	UpdateTokenUser(tokenUser)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'TokenUsers', tokenUser)));
			return
		}
		
		return this.http.patch<TokenUser>(ServerUrl.GetUrl()  + `TokenUsers?cmd=updateTokenUser`, tokenUser).subscribe(tokenUser =>
		{
			console.log(tokenUser);
			return tokenUser;
		});
	}
	
	DeleteTokenUser(tokenUser)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'TokenUsers', tokenUser)));
			return
		}
		
		return this.http.delete<TokenUser>(ServerUrl.GetUrl()  + `TokenUsers&cmd=delete&tokenUserId=` +  tokenUser.tokenUserId).subscribe(tokenUser =>
		{
			console.log(tokenUser);
			return tokenUser;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('TokenUsers');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.tokenUsers.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.tokenUsers.getValue()
				items.push(request.data);
				this.tokenUsers.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.tokenUsers.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].tokenUserId == request.data.tokenUserId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.tokenUsers.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.tokenUsers.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].tokenUserId == request.data.tokenUserId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.tokenUsers.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'TokenUsers', null)));
	}
	

}
