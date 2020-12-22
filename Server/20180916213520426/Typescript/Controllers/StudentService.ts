import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { Student, encodeStudent } from '../app/Models/Student'
import { AuthenticationService } from './AuthenticationService';

@Injectable({
    providedIn : 'root'
})
export class StudentService
{
	public students : BehaviorSubject<Student[]>;
	private webSocketsSubject : Subject<Message>;
	private token : string;
	GetStudents()
	{
		return this.http.get<Student[]>(ServerUrl.GetUrl()  + `Students?cmd=get&token=${this.token}`).subscribe(data =>
		{
			this.students.next(data);
		});
	}
	
	static GetDefaultStudent()
	{
		return {
		studentId : 0,
		name : 'Test',
		email : 'Test',
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetStudentsByEmail(email)
	{
		return this.http.get<Student[]>(ServerUrl.GetUrl()  + `Students?cmd=getStudentsByEmail&email=${email}&token=${this.token}`);
	}
	GetStudentsByStudentId(studentId)
	{
		return this.http.get<Student[]>(ServerUrl.GetUrl()  + `Students?cmd=getStudentsByStudentId&studentId=${studentId}&token=${this.token}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets, private auth : AuthenticationService)
	{
		this.auth.CheckToken();
		this.token = this.auth.GetToken();
		this.students = new BehaviorSubject([StudentService.GetDefaultStudent()]);
		this.GetStudents();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddStudent(student)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'Students', student)));
			return
		}
		
		return this.http.post<Student>(ServerUrl.GetUrl()  + `Students?cmd=post&token=${this.token}`, student).subscribe(student =>
		{
			console.log(student);
			if(0 != student.studentId)
			{
				let items = this.students.getValue()
				items.push(student)
				this.students.next(items)
			}
		});
	}
	
	UpdateStudent(student)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'Students', student)));
			return
		}
		
		return this.http.patch<Student>(ServerUrl.GetUrl()  + `Students?cmd=updateStudent&token=${this.token}`, student).subscribe(student =>
		{
			console.log(student);
			return student;
		});
	}
	
	DeleteStudent(student)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'Students', student)));
			return
		}
		
		return this.http.delete<Student>(ServerUrl.GetUrl()  + `Students&cmd=delete&token=${this.token}&studentId=` +  student.studentId).subscribe(student =>
		{
			console.log(student);
			return student;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('Students');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.students.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.students.getValue()
				items.push(request.data);
				this.students.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.students.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].studentId == request.data.studentId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.students.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.students.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].studentId == request.data.studentId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.students.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'Students', null)));
	}
	

}
