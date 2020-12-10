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

public class ClassRoom
{
	private Integer  classRoomId;
	private String name;
	private Date creationTime;
	
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
	
	
	public ClassRoom(String name)
	{
		this.name = name;
	}
	
	public ClassRoom()
	{
		this(
			"Test" //Name
		);
		this.classRoomId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
