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

public class Absente
{
	private Integer  absenteId;
	private Integer  userId;
	private Date date;
	private Date creationTime;
	private User user;
	
	public Integer  getAbsenteId()
	{
		return this.absenteId;
	}
	
	public void setAbsenteId(Integer  absenteId)
	{
		this.absenteId = absenteId;
	}
	
	public Integer  getUserId()
	{
		return this.userId;
	}
	
	public void setUserId(Integer  userId)
	{
		this.userId = userId;
	}
	
	public Date getDate()
	{
		return this.date;
	}
	
	public void setDate(Date date)
	{
		this.date = date;
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
	
	
	public Absente(Integer  userId, Date date)
	{
		this.userId = userId;
		this.date = date;
	}
	
	public Absente(Integer  userId, Date date, User user)
	{
		this(
			0, //UserId
			new Date(0) //Date
		);
		this.user = user;
	
	}
	
	public Absente()
	{
		this(
			0, //UserId
			new Date(0) //Date
		);
		this.absenteId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
