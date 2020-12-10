import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Absente, encodeAbsente } from '../app/Models/Absente'
import { User } from '../app/Models/User'
import { UserService } from './UserService'

@Injectable({
    providedIn : 'root'
})
export class AbsenteService
{
	public absente : BehaviorSubject<Absente[]>;
	private webSocketsSubject : Subject<Message>;
	GetAbsente()
	{
		return this.http.get<Absente[]>(ServerUrl.GetUrl()  + `Absente?cmd=get`).subscribe(data =>
		{
			this.absente.next(data);
		});
	}
	
	static GetDefaultAbsente()
	{
		return {
		absenteId : 0,
		userId : 0,
		date : '2000-01-01 00:00:00',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetAbsenteByAbsenteId(absenteId)
	{
		return this.http.get<Absente[]>(ServerUrl.GetUrl()  + `Absente?cmd=getAbsenteByAbsenteId&absenteId=${absenteId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.absente = new BehaviorSubject([AbsenteService.GetDefaultAbsente()]);
		this.GetAbsente();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddAbsente(absente)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Absente', absente)));
			return
		}
		
		return this.http.post<Absente>(ServerUrl.GetUrl()  + `Absente?cmd=post`, absente).subscribe(absente =>
		{
			console.log(absente);
			if(0 != absente.absenteId)
			{
				let items = this.absente.getValue()
				items.push(absente)
				this.absente.next(items)
			}
		});
	}
	
	UpdateAbsente(absente)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Absente', absente)));
			return
		}
		
		return this.http.patch<Absente>(ServerUrl.GetUrl()  + `Absente?cmd=updateAbsente`, absente).subscribe(absente =>
		{
			console.log(absente);
			return absente;
		});
	}
	
	DeleteAbsente(absente)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Absente', absente)));
			return
		}
		
		return this.http.delete<Absente>(ServerUrl.GetUrl()  + `Absente&cmd=delete&absenteId=` +  absente.absenteId).subscribe(absente =>
		{
			console.log(absente);
			return absente;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Absente');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.absente.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.absente.getValue()
				items.push(request.data);
				this.absente.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.absente.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].absenteId == request.data.absenteId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.absente.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.absente.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].absenteId == request.data.absenteId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.absente.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Absente', null)));
	}
	

}
