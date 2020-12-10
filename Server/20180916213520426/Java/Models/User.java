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

public class User
{
	private Integer  userId;
	private String firstName;
	private String lastName;
	private String email;
	private Integer  type;
	private Date creationTime;
	
	public Integer  getUserId()
	{
		return this.userId;
	}
	
	public void setUserId(Integer  userId)
	{
		this.userId = userId;
	}
	
	public String getFirstName()
	{
		return this.firstName;
	}
	
	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}
	
	public String getLastName()
	{
		return this.lastName;
	}
	
	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}
	
	public String getEmail()
	{
		return this.email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}
	
	public Integer  getType()
	{
		return this.type;
	}
	
	public void setType(Integer  type)
	{
		this.type = type;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	
	public User(String firstName, String lastName, String email, Integer  type)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.type = type;
	}
	
	public User()
	{
		this(
			"Test", //FirstName
			"Test", //LastName
			"Test", //Email
			0 //Type
		);
		this.userId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
