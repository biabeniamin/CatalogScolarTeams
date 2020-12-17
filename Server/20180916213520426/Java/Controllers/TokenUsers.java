//generated automatically
package com.example.biabe.DatabaseFunctionsGenerator;
import com.example.biabe.DatabaseFunctionsGenerator.Models.*;
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
interface TokenUserService
{
	
	@GET("api/tokenUsers")
	Call<TokenUserResponse> getTokenUsersFiltered(@Query("q") String q);
	@POST("TokenUsers.php?cmd=addTokenUser")
	Call<TokenUser> addTokenUser(@Body TokenUser tokenUser);

}

public class TokenUsers
{
	public static  getTokenUsers(Call<> call)
	{
		 tokenUsers;
		
		tokenUsers = null;
		
		try
		{
			tokenUsers = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokenUsers;
	
	}
	public static  getTokenUsers()
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.getTokenUsers();
			tokenUsers = getTokenUsers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokenUsers;
	
	}
	
	public static  getTokenUsersByUsernamePassword(String username, String password)
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.getTokenUsersByUsernamePassword(username, password);
			tokenUsers = getTokenUsers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokenUsers;
	
	}
	
	public static  getTokenUsersByTokenUserId(Integer  tokenUserId)
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.getTokenUsersByTokenUserId(tokenUserId);
			tokenUsers = getTokenUsers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokenUsers;
	
	}
	
	
	public static void getTokenUsers(Call<> call, Callback<> callback)
	{
		try
		{
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	public static void getTokenUsers(Callback<> callback)
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.getTokenUsers();
			getTokenUsers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTokenUsersByUsernamePassword(String username, String password, Callback<> callback)
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
		);
			getTokenUsers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTokenUsersByTokenUserId(Integer  tokenUserId, Callback<> callback)
	{
		 tokenUsers;
		TokenUserService service;
		Call<> call;
		
		tokenUsers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
		);
			getTokenUsers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static TokenUser addTokenUser(TokenUser tokenUser)
	{
		TokenUserService service;
		Call<TokenUser> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.addTokenUser(tokenUser);
			tokenUser = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return tokenUser;
	
	}
	
	public static void addTokenUser(TokenUser tokenUser, Callback<TokenUser> callback)
	{
		TokenUserService service;
		Call<TokenUser> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TokenUserService.class);
		try
		{
			call = service.addTokenUser(tokenUser);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
