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

public class TokenUser
{
	private Integer  tokenUserId;
	private String username;
	private String password;
	private Date creationTime;
	
	public Integer  getTokenUserId()
	{
		return this.tokenUserId;
	}
	
	public void setTokenUserId(Integer  tokenUserId)
	{
		this.tokenUserId = tokenUserId;
	}
	
	public String getUsername()
	{
		return this.username;
	}
	
	public void setUsername(String username)
	{
		this.username = username;
	}
	
	public String getPassword()
	{
		return this.password;
	}
	
	public void setPassword(String password)
	{
		this.password = password;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	
	public TokenUser(String username, String password)
	{
		this.username = username;
		this.password = password;
	}
	
	public TokenUser()
	{
		this(
			"Test", //Username
			"Test" //Password
		);
		this.tokenUserId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
