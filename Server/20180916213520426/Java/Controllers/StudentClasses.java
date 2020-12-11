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
interface StudentClasseService
{
	
	@GET("api/studentClasses")
	Call<StudentClasseResponse> getStudentClassesFiltered(@Query("q") String q);
	@POST("StudentClasses.php?cmd=addStudentClasse")
	Call<StudentClasse> addStudentClasse(@Body StudentClasse studentClasse);

}

public class StudentClasses
{
	public static  getStudentClasses(Call<> call)
	{
		 studentClasses;
		
		studentClasses = null;
		
		try
		{
			studentClasses = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return studentClasses;
	
	}
	public static  getStudentClasses()
	{
		 studentClasses;
		StudentClasseService service;
		Call<> call;
		
		studentClasses = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
			call = service.getStudentClasses();
			studentClasses = getStudentClasses(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return studentClasses;
	
	}
	
	public static  getStudentClassesByStudentClasseId(Integer  studentClasseId)
	{
		 studentClasses;
		StudentClasseService service;
		Call<> call;
		
		studentClasses = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
			call = service.getStudentClassesByStudentClasseId(studentClasseId);
			studentClasses = getStudentClasses(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return studentClasses;
	
	}
	
	
	public static void getStudentClasses(Call<> call, Callback<> callback)
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
	public static void getStudentClasses(Callback<> callback)
	{
		 studentClasses;
		StudentClasseService service;
		Call<> call;
		
		studentClasses = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
			call = service.getStudentClasses();
			getStudentClasses(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getStudentClassesByStudentClasseId(Integer  studentClasseId, Callback<> callback)
	{
		 studentClasses;
		StudentClasseService service;
		Call<> call;
		
		studentClasses = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
		);
			getStudentClasses(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static StudentClasse addStudentClasse(StudentClasse studentClasse)
	{
		StudentClasseService service;
		Call<StudentClasse> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
			call = service.addStudentClasse(studentClasse);
			studentClasse = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return studentClasse;
	
	}
	
	public static void addStudentClasse(StudentClasse studentClasse, Callback<StudentClasse> callback)
	{
		StudentClasseService service;
		Call<StudentClasse> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentClasseService.class);
		try
		{
			call = service.addStudentClasse(studentClasse);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
