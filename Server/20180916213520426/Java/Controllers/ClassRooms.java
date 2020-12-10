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
interface ClassRoomService
{
	
	@GET("api/classRooms")
	Call<ClassRoomResponse> getClassRoomsFiltered(@Query("q") String q);
	@POST("ClassRooms.php?cmd=addClassRoom")
	Call<ClassRoom> addClassRoom(@Body ClassRoom classRoom);

}

public class ClassRooms
{
	public static  getClassRooms(Call<> call)
	{
		 classRooms;
		
		classRooms = null;
		
		try
		{
			classRooms = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classRooms;
	
	}
	public static  getClassRooms()
	{
		 classRooms;
		ClassRoomService service;
		Call<> call;
		
		classRooms = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
			call = service.getClassRooms();
			classRooms = getClassRooms(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classRooms;
	
	}
	
	public static  getClassRoomsByClassRoomId(Integer  classRoomId)
	{
		 classRooms;
		ClassRoomService service;
		Call<> call;
		
		classRooms = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
			call = service.getClassRoomsByClassRoomId(classRoomId);
			classRooms = getClassRooms(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classRooms;
	
	}
	
	
	public static void getClassRooms(Call<> call, Callback<> callback)
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
	public static void getClassRooms(Callback<> callback)
	{
		 classRooms;
		ClassRoomService service;
		Call<> call;
		
		classRooms = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
			call = service.getClassRooms();
			getClassRooms(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getClassRoomsByClassRoomId(Integer  classRoomId, Callback<> callback)
	{
		 classRooms;
		ClassRoomService service;
		Call<> call;
		
		classRooms = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
		);
			getClassRooms(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static ClassRoom addClassRoom(ClassRoom classRoom)
	{
		ClassRoomService service;
		Call<ClassRoom> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
			call = service.addClassRoom(classRoom);
			classRoom = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return classRoom;
	
	}
	
	public static void addClassRoom(ClassRoom classRoom, Callback<ClassRoom> callback)
	{
		ClassRoomService service;
		Call<ClassRoom> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(ClassRoomService.class);
		try
		{
			call = service.addClassRoom(classRoom);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
