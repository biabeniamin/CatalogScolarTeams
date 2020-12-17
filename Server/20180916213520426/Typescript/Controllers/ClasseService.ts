import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Classe, encodeClasse } from '../app/Models/Classe'
import { ClassRoom } from '../app/Models/ClassRoom'
import { ClassRoomService } from './ClassRoomService'
import { Teacher } from '../app/Models/Teacher'
import { TeacherService } from './TeacherService'
import { AuthenticationService } from './AuthenticationService';

@Injectable({
    providedIn : 'root'
})
export class ClasseService
{
	public classes : BehaviorSubject<Classe[]>;
	private webSocketsSubject : Subject<Message>;
	private token : string;
	GetClasses()
	{
		return this.http.get<Classe[]>(ServerUrl.GetUrl()  + `Classes?cmd=get&token=${this.token}`).subscribe(data =>
		{
			this.classes.next(data);
		});
	}
	
	static GetDefaultClasse()
	{
		return {
		classeId : 0,
		teacherId : 0,
		classRoomId : 0,
		name : 'Test',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetClassesByClassRoomId(classRoomId)
	{
		return this.http.get<Classe[]>(ServerUrl.GetUrl()  + `Classes?cmd=getClassesByClassRoomId&classRoomId=${classRoomId}&token=${this.token}`);
	}
	GetClassesByClasseId(classeId)
	{
		return this.http.get<Classe[]>(ServerUrl.GetUrl()  + `Classes?cmd=getClassesByClasseId&classeId=${classeId}&token=${this.token}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets, private auth : AuthenticationService)
	{
		this.auth.CheckToken();
		this.token = this.auth.GetToken();
		this.classes = new BehaviorSubject([ClasseService.GetDefaultClasse()]);
		this.GetClasses();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddClasse(classe)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Classes', classe)));
			return
		}
		
		return this.http.post<Classe>(ServerUrl.GetUrl()  + `Classes?cmd=post&token=${this.token}`, classe).subscribe(classe =>
		{
			console.log(classe);
			if(0 != classe.classeId)
			{
				let items = this.classes.getValue()
				items.push(classe)
				this.classes.next(items)
			}
		});
	}
	
	UpdateClasse(classe)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Classes', classe)));
			return
		}
		
		return this.http.patch<Classe>(ServerUrl.GetUrl()  + `Classes?cmd=updateClasse&token=${this.token}`, classe).subscribe(classe =>
		{
			console.log(classe);
			return classe;
		});
	}
	
	DeleteClasse(classe)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Classes', classe)));
			return
		}
		
		return this.http.delete<Classe>(ServerUrl.GetUrl()  + `Classes&cmd=delete&token=${this.token}&classeId=` +  classe.classeId).subscribe(classe =>
		{
			console.log(classe);
			return classe;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Classes');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.classes.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.classes.getValue()
				items.push(request.data);
				this.classes.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.classes.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].classeId == request.data.classeId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.classes.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.classes.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].classeId == request.data.classeId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.classes.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Classes', null)));
	}
	

}
