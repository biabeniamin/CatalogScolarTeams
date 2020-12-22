import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Teacher, encodeTeacher } from '../app/Models/Teacher'
import { AuthenticationService } from './AuthenticationService';

@Injectable({
    providedIn : 'root'
})
export class TeacherService
{
	public teachers : BehaviorSubject<Teacher[]>;
	private webSocketsSubject : Subject<Message>;
	private token : string;
	GetTeachers()
	{
		return this.http.get<Teacher[]>(ServerUrl.GetUrl()  + `Teachers?cmd=get&token=${this.token}`).subscribe(data =>
		{
			this.teachers.next(data);
		});
	}
	
	static GetDefaultTeacher()
	{
		return {
		teacherId : 0,
		name : 'Test',
		email : 'Test',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetTeachersByEmail(email)
	{
		return this.http.get<Teacher[]>(ServerUrl.GetUrl()  + `Teachers?cmd=getTeachersByEmail&email=${email}&token=${this.token}`);
	}
	GetTeachersByTeacherId(teacherId)
	{
		return this.http.get<Teacher[]>(ServerUrl.GetUrl()  + `Teachers?cmd=getTeachersByTeacherId&teacherId=${teacherId}&token=${this.token}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets, private auth : AuthenticationService)
	{
		this.auth.CheckToken();
		this.token = this.auth.GetToken();
		this.teachers = new BehaviorSubject([TeacherService.GetDefaultTeacher()]);
		this.GetTeachers();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddTeacher(teacher)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Teachers', teacher)));
			return
		}
		
		return this.http.post<Teacher>(ServerUrl.GetUrl()  + `Teachers?cmd=post&token=${this.token}`, teacher).subscribe(teacher =>
		{
			console.log(teacher);
			if(0 != teacher.teacherId)
			{
				let items = this.teachers.getValue()
				items.push(teacher)
				this.teachers.next(items)
			}
		});
	}
	
	UpdateTeacher(teacher)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Teachers', teacher)));
			return
		}
		
		return this.http.patch<Teacher>(ServerUrl.GetUrl()  + `Teachers?cmd=updateTeacher&token=${this.token}`, teacher).subscribe(teacher =>
		{
			console.log(teacher);
			return teacher;
		});
	}
	
	DeleteTeacher(teacher)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Teachers', teacher)));
			return
		}
		
		return this.http.delete<Teacher>(ServerUrl.GetUrl()  + `Teachers&cmd=delete&token=${this.token}&teacherId=` +  teacher.teacherId).subscribe(teacher =>
		{
			console.log(teacher);
			return teacher;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Teachers');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.teachers.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.teachers.getValue()
				items.push(request.data);
				this.teachers.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.teachers.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].teacherId == request.data.teacherId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.teachers.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.teachers.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].teacherId == request.data.teacherId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.teachers.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Teachers', null)));
	}
	

}
