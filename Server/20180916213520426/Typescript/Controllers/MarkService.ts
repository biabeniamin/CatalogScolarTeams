import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Mark, encodeMark } from '../app/Models/Mark'
import { Teacher } from '../app/Models/Teacher'
import { TeacherService } from './TeacherService'
import { Student } from '../app/Models/Student'
import { StudentService } from './StudentService'
import { Classe } from '../app/Models/Classe'
import { ClasseService } from './ClasseService'
import { AuthenticationService } from './AuthenticationService';

@Injectable({
    providedIn : 'root'
})
export class MarkService
{
	public marks : BehaviorSubject<Mark[]>;
	private webSocketsSubject : Subject<Message>;
	private token : string;
	GetMarks()
	{
		return this.http.get<Mark[]>(ServerUrl.GetUrl()  + `Marks?cmd=get&token=${this.token}`).subscribe(data =>
		{
			this.marks.next(data);
		});
	}
	
	static GetDefaultMark()
	{
		return {
		markId : 0,
		classeId : 0,
		studentId : 0,
		teacherId : 0,
		value : 0,
		date : '2000-01-01 00:00:00',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetMarksByClasseIdStudentId(classeId, studentId)
	{
		return this.http.get<Mark[]>(ServerUrl.GetUrl()  + `Marks?cmd=getMarksByClasseIdStudentId&classeId=${classeId}&studentId=${studentId}&token=${this.token}`);
	}
	GetMarksByStudentId(studentId)
	{
		return this.http.get<Mark[]>(ServerUrl.GetUrl()  + `Marks?cmd=getMarksByStudentId&studentId=${studentId}&token=${this.token}`);
	}
	GetMarksByMarkId(markId)
	{
		return this.http.get<Mark[]>(ServerUrl.GetUrl()  + `Marks?cmd=getMarksByMarkId&markId=${markId}&token=${this.token}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets, private auth : AuthenticationService)
	{
		this.auth.CheckToken();
		this.token = this.auth.GetToken();
		this.marks = new BehaviorSubject([MarkService.GetDefaultMark()]);
		this.GetMarks();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddMark(mark)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Marks', mark)));
			return
		}
		
		return this.http.post<Mark>(ServerUrl.GetUrl()  + `Marks?cmd=post&token=${this.token}`, mark).subscribe(mark =>
		{
			console.log(mark);
			if(0 != mark.markId)
			{
				let items = this.marks.getValue()
				items.push(mark)
				this.marks.next(items)
			}
		});
	}
	
	UpdateMark(mark)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Marks', mark)));
			return
		}
		
		return this.http.patch<Mark>(ServerUrl.GetUrl()  + `Marks?cmd=updateMark&token=${this.token}`, mark).subscribe(mark =>
		{
			console.log(mark);
			return mark;
		});
	}
	
	DeleteMark(mark)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Marks', mark)));
			return
		}
		
		return this.http.delete<Mark>(ServerUrl.GetUrl()  + `Marks&cmd=delete&token=${this.token}&markId=` +  mark.markId).subscribe(mark =>
		{
			console.log(mark);
			return mark;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Marks');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.marks.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.marks.getValue()
				items.push(request.data);
				this.marks.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.marks.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].markId == request.data.markId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.marks.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.marks.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].markId == request.data.markId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.marks.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Marks', null)));
	}
	

}
