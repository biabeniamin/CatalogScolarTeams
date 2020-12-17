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

public class Token
{
	private Integer  tokenId;
	private Integer  tokenUserId;
	private NOT_EXISTING value;
	private String address;
	private Date lastUpdate;
	private Date creationTime;
	private TokenUser tokenUser;
	
	public Integer  getTokenId()
	{
		return this.tokenId;
	}
	
	public void setTokenId(Integer  tokenId)
	{
		this.tokenId = tokenId;
	}
	
	public Integer  getTokenUserId()
	{
		return this.tokenUserId;
	}
	
	public void setTokenUserId(Integer  tokenUserId)
	{
		this.tokenUserId = tokenUserId;
	}
	
	public NOT_EXISTING getValue()
	{
		return this.value;
	}
	
	public void setValue(NOT_EXISTING value)
	{
		this.value = value;
	}
	
	public String getAddress()
	{
		return this.address;
	}
	
	public void setAddress(String address)
	{
		this.address = address;
	}
	
	public Date getLastUpdate()
	{
		return this.lastUpdate;
	}
	
	public void setLastUpdate(Date lastUpdate)
	{
		this.lastUpdate = lastUpdate;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	public TokenUser getTokenUser()
	{
		return this.tokenUser;
	}
	
	public void setTokenUser(TokenUser tokenUser)
	{
		this.tokenUser = tokenUser;
	}
	
	
	public Token(Integer  tokenUserId, NOT_EXISTING value, String address, Date lastUpdate)
	{
		this.tokenUserId = tokenUserId;
		this.value = value;
		this.address = address;
		this.lastUpdate = lastUpdate;
	}
	
	public Token(Integer  tokenUserId, NOT_EXISTING value, String address, Date lastUpdate, TokenUser tokenUser)
	{
		this(
			0, //TokenUserId
			, //Value
			"Test", //Address
			new Date(0) //LastUpdate
		);
		this.tokenUser = tokenUser;
	
	}
	
	public Token()
	{
		this(
			0, //TokenUserId
			, //Value
			"Test", //Address
			new Date(0) //LastUpdate
		);
		this.tokenId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
