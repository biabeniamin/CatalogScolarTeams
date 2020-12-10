import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { ClassRoom, encodeClassRoom } from '../app/Models/ClassRoom'

@Injectable({
    providedIn : 'root'
})
export class ClassRoomService
{
	public classRooms : BehaviorSubject<ClassRoom[]>;
	private webSocketsSubject : Subject<Message>;
	GetClassRooms()
	{
		return this.http.get<ClassRoom[]>(ServerUrl.GetUrl()  + `ClassRooms?cmd=get`).subscribe(data =>
		{
			this.classRooms.next(data);
		});
	}
	
	static GetDefaultClassRoom()
	{
		return {
		classRoomId : 0,
		name : 'Test',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetClassRoomsByClassRoomId(classRoomId)
	{
		return this.http.get<ClassRoom[]>(ServerUrl.GetUrl()  + `ClassRooms?cmd=getClassRoomsByClassRoomId&classRoomId=${classRoomId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.classRooms = new BehaviorSubject([ClassRoomService.GetDefaultClassRoom()]);
		this.GetClassRooms();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddClassRoom(classRoom)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'ClassRooms', classRoom)));
			return
		}
		
		return this.http.post<ClassRoom>(ServerUrl.GetUrl()  + `ClassRooms?cmd=post`, classRoom).subscribe(classRoom =>
		{
			console.log(classRoom);
			if(0 != classRoom.classRoomId)
			{
				let items = this.classRooms.getValue()
				items.push(classRoom)
				this.classRooms.next(items)
			}
		});
	}
	
	UpdateClassRoom(classRoom)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'ClassRooms', classRoom)));
			return
		}
		
		return this.http.patch<ClassRoom>(ServerUrl.GetUrl()  + `ClassRooms?cmd=updateClassRoom`, classRoom).subscribe(classRoom =>
		{
			console.log(classRoom);
			return classRoom;
		});
	}
	
	DeleteClassRoom(classRoom)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'ClassRooms', classRoom)));
			return
		}
		
		return this.http.delete<ClassRoom>(ServerUrl.GetUrl()  + `ClassRooms&cmd=delete&classRoomId=` +  classRoom.classRoomId).subscribe(classRoom =>
		{
			console.log(classRoom);
			return classRoom;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('ClassRooms');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.classRooms.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.classRooms.getValue()
				items.push(request.data);
				this.classRooms.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.classRooms.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].classRoomId == request.data.classRoomId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.classRooms.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.classRooms.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].classRoomId == request.data.classRoomId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.classRooms.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'ClassRooms', null)));
	}
	

}
