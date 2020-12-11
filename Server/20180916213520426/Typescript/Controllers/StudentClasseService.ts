import {HttpClient} from '@angular/common/http';
import { ServerUrl } from './ServerUrl'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSockets, Message, Request } from './WebSockets';
import { StudentClasse, encodeStudentClasse } from '../app/Models/StudentClasse'
import { Classe } from '../app/Models/Classe'
import { ClasseService } from './ClasseService'
import { Student } from '../app/Models/Student'
import { StudentService } from './StudentService'

@Injectable({
    providedIn : 'root'
})
export class StudentClasseService
{
	public studentClasses : BehaviorSubject<StudentClasse[]>;
	private webSocketsSubject : Subject<Message>;
	GetStudentClasses()
	{
		return this.http.get<StudentClasse[]>(ServerUrl.GetUrl()  + `StudentClasses?cmd=get`).subscribe(data =>
		{
			this.studentClasses.next(data);
		});
	}
	
	static GetDefaultStudentClasse()
	{
		return {
		studentClasseId : 0,
		studentId : 0,
		classeId : 0,
		creationTime : '2000-01-01 00:00:00'
		};
	}
	
	GetStudentClassesByStudentClasseId(studentClasseId)
	{
		return this.http.get<StudentClasse[]>(ServerUrl.GetUrl()  + `StudentClasses?cmd=getStudentClassesByStudentClasseId&studentClasseId=${studentClasseId}`);
	}
	
	constructor(private http:HttpClient, private webSockets : WebSockets)
	{
		this.studentClasses = new BehaviorSubject([StudentClasseService.GetDefaultStudentClasse()]);
		this.GetStudentClasses();
		this.webSockets.SetOnConnectionEstablished(() => this.ConnectToWebSockets());
	
	}
	
	AddStudentClasse(studentClasse)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('add', 'StudentClasses', studentClasse)));
			return
		}
		
		return this.http.post<StudentClasse>(ServerUrl.GetUrl()  + `StudentClasses?cmd=post`, studentClasse).subscribe(studentClasse =>
		{
			console.log(studentClasse);
			if(0 != studentClasse.studentClasseId)
			{
				let items = this.studentClasses.getValue()
				items.push(studentClasse)
				this.studentClasses.next(items)
			}
		});
	}
	
	UpdateStudentClasse(studentClasse)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('update', 'StudentClasses', studentClasse)));
			return
		}
		
		return this.http.patch<StudentClasse>(ServerUrl.GetUrl()  + `StudentClasses?cmd=updateStudentClasse`, studentClasse).subscribe(studentClasse =>
		{
			console.log(studentClasse);
			return studentClasse;
		});
	}
	
	DeleteStudentClasse(studentClasse)
	{
		if (this.webSocketsSubject!=null)
		{
			this.webSocketsSubject.next(new Message(this.constructor.name, new Request('delete', 'StudentClasses', studentClasse)));
			return
		}
		
		return this.http.delete<StudentClasse>(ServerUrl.GetUrl()  + `StudentClasses&cmd=delete&studentClasseId=` +  studentClasse.studentClasseId).subscribe(studentClasse =>
		{
			console.log(studentClasse);
			return studentClasse;
		});
	}
	
	ConnectToWebSockets()
	{
		this.webSocketsSubject = this.webSockets.getSubject('StudentClasses');
		this.webSocketsSubject.subscribe(message =>
		{
				if(message.sender != WebSockets.name)
					return
				let request = message.data;
				console.log(request);
			if(request.operation == 'get')
			{
				this.studentClasses.next(request.data);
			}
			else if(request.operation == 'add')
			{
				let items = this.studentClasses.getValue()
				items.push(request.data);
				this.studentClasses.next(items);
			}
			else if(request.operation == 'update')
			{
				let items = this.studentClasses.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].studentClasseId == request.data.studentClasseId)
					{
						items[i] = request.data;
						break;
					}
				}
				this.studentClasses.next(items);
			}
			else if(request.operation == 'delete')
			{
				let items = this.studentClasses.getValue()
				for(let i = 0; i < items.length; i++)
				{
					if(items[i].studentClasseId == request.data.studentClasseId)
					{
						items.splice(i, 1);
						break;
					}
				}
				this.studentClasses.next(items);
			}
		
		});
		this.webSocketsSubject.next(new Message(this.constructor.name, new Request('subscribe', 'StudentClasses', null)));
	}
	

}
