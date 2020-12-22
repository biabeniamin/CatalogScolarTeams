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
interface TeacherService
{
	
	@GET("api/teachers")
	Call<TeacherResponse> getTeachersFiltered(@Query("q") String q);
	@POST("Teachers.php?cmd=addTeacher")
	Call<Teacher> addTeacher(@Body Teacher teacher);

}

public class Teachers
{
	public static  getTeachers(Call<> call)
	{
		 teachers;
		
		teachers = null;
		
		try
		{
			teachers = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return teachers;
	
	}
	public static  getTeachers()
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.getTeachers();
			teachers = getTeachers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return teachers;
	
	}
	
	public static  getTeachersByEmail(String email)
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.getTeachersByEmail(email);
			teachers = getTeachers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return teachers;
	
	}
	
	public static  getTeachersByTeacherId(Integer  teacherId)
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.getTeachersByTeacherId(teacherId);
			teachers = getTeachers(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return teachers;
	
	}
	
	
	public static void getTeachers(Call<> call, Callback<> callback)
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
	public static void getTeachers(Callback<> callback)
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.getTeachers();
			getTeachers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTeachersByEmail(String email, Callback<> callback)
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
		);
			getTeachers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getTeachersByTeacherId(Integer  teacherId, Callback<> callback)
	{
		 teachers;
		TeacherService service;
		Call<> call;
		
		teachers = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
		);
			getTeachers(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Teacher addTeacher(Teacher teacher)
	{
		TeacherService service;
		Call<Teacher> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.addTeacher(teacher);
			teacher = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return teacher;
	
	}
	
	public static void addTeacher(Teacher teacher, Callback<Teacher> callback)
	{
		TeacherService service;
		Call<Teacher> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(TeacherService.class);
		try
		{
			call = service.addTeacher(teacher);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
