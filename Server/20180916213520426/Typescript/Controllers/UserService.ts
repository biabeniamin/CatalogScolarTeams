import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { User, encodeUser } from '../app/Models/User'

@Injectable({
    providedIn : 'root'
})
export class UserService
{
	public users : BehaviorSubject<User[]>;
	private webSocketsSubject : Subject<Message>;
	GetUsers()
	{
		return this.http.get<User[]>(ServerUrl.GetUrl()  + `Users?cmd=get`).subscribe(data =>
		{
			this.users.next(data);
		});
	}
	
	static GetDefaultUser()
	{
		return {
		userId : 0,
		firstName : 'Test',
		lastName : 'Test',
		email : 'Test',
		type : 0,
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetUsersByUserId(userId)
	{
		return this.http.get<User[]>(ServerUrl.GetUrl()  + `Users?cmd=getUsersByUserId&userId=${userId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.users = new BehaviorSubject([UserService.GetDefaultUser()]);
		this.GetUsers();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddUser(user)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Users', user)));
			return
		}
		
		return this.http.post<User>(ServerUrl.GetUrl()  + `Users?cmd=post`, user).subscribe(user =>
		{
			console.log(user);
			if(0 != user.userId)
			{
				let items = this.users.getValue()
				items.push(user)
				this.users.next(items)
			}
		});
	}
	
	UpdateUser(user)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Users', user)));
			return
		}
		
		return this.http.patch<User>(ServerUrl.GetUrl()  + `Users?cmd=updateUser`, user).subscribe(user =>
		{
			console.log(user);
			return user;
		});
	}
	
	DeleteUser(user)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Users', user)));
			return
		}
		
		return this.http.delete<User>(ServerUrl.GetUrl()  + `Users&cmd=delete&userId=` +  user.userId).subscribe(user =>
		{
			console.log(user);
			return user;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Users');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.users.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.users.getValue()
				items.push(request.data);
				this.users.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.users.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].userId == request.data.userId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.users.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.users.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].userId == request.data.userId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.users.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Users', null)));
	}
	

}
