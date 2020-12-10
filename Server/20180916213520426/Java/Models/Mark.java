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

public class Mark
{
	private Integer  markId;
	private Integer  userId;
	private Integer  value;
	private Date creationTime;
	private User user;
	
	public Integer  getMarkId()
	{
		return this.markId;
	}
	
	public void setMarkId(Integer  markId)
	{
		this.markId = markId;
	}
	
	public Integer  getUserId()
	{
		return this.userId;
	}
	
	public void setUserId(Integer  userId)
	{
		this.userId = userId;
	}
	
	public Integer  getValue()
	{
		return this.value;
	}
	
	public void setValue(Integer  value)
	{
		this.value = value;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	public User getUser()
	{
		return this.user;
	}
	
	public void setUser(User user)
	{
		this.user = user;
	}
	
	
	public Mark(Integer  userId, Integer  value)
	{
		this.userId = userId;
		this.value = value;
	}
	
	public Mark(Integer  userId, Integer  value, User user)
	{
		this(
			0, //UserId
			0 //Value
		);
		this.user = user;
	
	}
	
	public Mark()
	{
		this(
			0, //UserId
			0 //Value
		);
		this.markId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
