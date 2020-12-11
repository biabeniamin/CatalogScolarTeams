//generated automatically
package com.example.biabe.DatabaseFunctionsGenerator.Models;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.Query;
import retrofit2.http.POST;
import retrofit2.http.Body;
import java.util.Date;

public class Classe
{
	private Integer  classeId;
	private Integer  teacherId;
	private Integer  classRoomId;
	private String name;
	private Date creationTime;
	private ClassRoom classRoom;
	private Teacher teacher;
	
	public Integer  getClasseId()
	{
		return this.classeId;
	}
	
	public void setClasseId(Integer  classeId)
	{
		this.classeId = classeId;
	}
	
	public Integer  getTeacherId()
	{
		return this.teacherId;
	}
	
	public void setTeacherId(Integer  teacherId)
	{
		this.teacherId = teacherId;
	}
	
	public Integer  getClassRoomId()
	{
		return this.classRoomId;
	}
	
	public void setClassRoomId(Integer  classRoomId)
	{
		this.classRoomId = classRoomId;
	}
	
	public String getName()
	{
		return this.name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	public ClassRoom getClassRoom()
	{
		return this.classRoom;
	}
	
	public void setClassRoom(ClassRoom classRoom)
	{
		this.classRoom = classRoom;
	}
	
	public Teacher getTeacher()
	{
		return this.teacher;
	}
	
	public void setTeacher(Teacher teacher)
	{
		this.teacher = teacher;
	}
	
	
	public Classe(Integer  teacherId, Integer  classRoomId, String name)
	{
		this.teacherId = teacherId;
		this.classRoomId = classRoomId;
		this.name = name;
	}
	
	public Classe(Integer  teacherId, Integer  classRoomId, String name, ClassRoom classRoom, Teacher teacher)
	{
		this(
			0, //TeacherId
			0, //ClassRoomId
			"Test" //Name
		);
		this.classRoom = classRoom;
		this.teacher = teacher;
	
	}
	
	public Classe()
	{
		this(
			0, //TeacherId
			0, //ClassRoomId
			"Test" //Name
		);
		this.classeId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
