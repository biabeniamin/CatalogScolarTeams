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
interface MarkService
{
	
	@GET("api/marks")
	Call<MarkResponse> getMarksFiltered(@Query("q") String q);
	@POST("Marks.php?cmd=addMark")
	Call<Mark> addMark(@Body Mark mark);

}

public class Marks
{
	public static  getMarks(Call<> call)
	{
		 marks;
		
		marks = null;
		
		try
		{
			marks = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return marks;
	
	}
	public static  getMarks()
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.getMarks();
			marks = getMarks(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return marks;
	
	}
	
	public static  getMarksByClasseIdStudentId(Integer  classeId, Integer  studentId)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.getMarksByClasseIdStudentId(classeId, studentId);
			marks = getMarks(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return marks;
	
	}
	
	public static  getMarksByStudentId(Integer  studentId)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.getMarksByStudentId(studentId);
			marks = getMarks(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return marks;
	
	}
	
	public static  getMarksByMarkId(Integer  markId)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.getMarksByMarkId(markId);
			marks = getMarks(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return marks;
	
	}
	
	
	public static void getMarks(Call<> call, Callback<> callback)
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
	public static void getMarks(Callback<> callback)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.getMarks();
			getMarks(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getMarksByClasseIdStudentId(Integer  classeId, Integer  studentId, Callback<> callback)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
		);
			getMarks(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getMarksByStudentId(Integer  studentId, Callback<> callback)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
		);
			getMarks(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getMarksByMarkId(Integer  markId, Callback<> callback)
	{
		 marks;
		MarkService service;
		Call<> call;
		
		marks = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
		);
			getMarks(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Mark addMark(Mark mark)
	{
		MarkService service;
		Call<Mark> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.addMark(mark);
			mark = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return mark;
	
	}
	
	public static void addMark(Mark mark, Callback<Mark> callback)
	{
		MarkService service;
		Call<Mark> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(MarkService.class);
		try
		{
			call = service.addMark(mark);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
