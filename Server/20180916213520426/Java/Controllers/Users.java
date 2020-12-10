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
interface UserService
{
	
	@GET("api/users")
	Call<UserResponse> getUsersFiltered(@Query("q") String q);
	@POST("Users.php?cmd=addUser")
	Call<User> addUser(@Body User user);

}

public class Users
{
	public static  getUsers(Call<> call)
	{
		 users;
		
		users = null;
		
		try
		{
			users = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return users;
	
	}
	public static  getUsers()
	{
		 users;
		UserService service;
		Call<> call;
		
		users = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
			call = service.getUsers();
			users = getUsers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return users;
	
	}
	
	public static  getUsersByUserId(Integer  userId)
	{
		 users;
		UserService service;
		Call<> call;
		
		users = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
			call = service.getUsersByUserId(userId);
			users = getUsers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return users;
	
	}
	
	
	public static void getUsers(Call<> call, Callback<> callback)
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
	public static void getUsers(Callback<> callback)
	{
		 users;
		UserService service;
		Call<> call;
		
		users = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
			call = service.getUsers();
			getUsers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getUsersByUserId(Integer  userId, Callback<> callback)
	{
		 users;
		UserService service;
		Call<> call;
		
		users = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
		);
			getUsers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static User addUser(User user)
	{
		UserService service;
		Call<User> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
			call = service.addUser(user);
			user = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return user;
	
	}
	
	public static void addUser(User user, Callback<User> callback)
	{
		UserService service;
		Call<User> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(UserService.class);
		try
		{
			call = service.addUser(user);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
