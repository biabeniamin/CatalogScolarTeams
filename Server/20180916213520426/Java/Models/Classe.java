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
	private Integer  userId;
	private Integer  classRoomId;
	private String name;
	private Date creationTime;
	private ClassRoom classRoom;
	private User user;
	
	public Integer  getClasseId()
	{
		return this.classeId;
	}
	
	public void setClasseId(Integer  classeId)
	{
		this.classeId = classeId;
	}
	
	public Integer  getUserId()
	{
		return this.userId;
	}
	
	public void setUserId(Integer  userId)
	{
		this.userId = userId;
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
	
	public User getUser()
	{
		return this.user;
	}
	
	public void setUser(User user)
	{
		this.user = user;
	}
	
	
	public Classe(Integer  userId, Integer  classRoomId, String name)
	{
		this.userId = userId;
		this.classRoomId = classRoomId;
		this.name = name;
	}
	
	public Classe(Integer  userId, Integer  classRoomId, String name, ClassRoom classRoom, User user)
	{
		this(
			0, //UserId
			0, //ClassRoomId
			"Test" //Name
		);
		this.classRoom = classRoom;
		this.user = user;
	
	}
	
	public Classe()
	{
		this(
			0, //UserId
			0, //ClassRoomId
			"Test" //Name
		);
		this.classeId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
