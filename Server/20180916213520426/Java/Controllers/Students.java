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
interface StudentService
{
	
	@GET("api/students")
	Call<StudentResponse> getStudentsFiltered(@Query("q") String q);
	@POST("Students.php?cmd=addStudent")
	Call<Student> addStudent(@Body Student student);

}

public class Students
{
	public static  getStudents(Call<> call)
	{
		 students;
		
		students = null;
		
		try
		{
			students = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return students;
	
	}
	public static  getStudents()
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.getStudents();
			students = getStudents(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return students;
	
	}
	
	public static  getStudentsByEmail(String email)
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.getStudentsByEmail(email);
			students = getStudents(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return students;
	
	}
	
	public static  getStudentsByStudentId(Integer  studentId)
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.getStudentsByStudentId(studentId);
			students = getStudents(call);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return students;
	
	}
	
	
	public static void getStudents(Call<> call, Callback<> callback)
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
	public static void getStudents(Callback<> callback)
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.getStudents();
			getStudents(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getStudentsByEmail(String email, Callback<> callback)
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
		);
			getStudents(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	public static void getStudentsByStudentId(Integer  studentId, Callback<> callback)
	{
		 students;
		StudentService service;
		Call<> call;
		
		students = null;
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
		);
			getStudents(call, callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
	
	}
	
	
	public static Student addStudent(Student student)
	{
		StudentService service;
		Call<Student> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.addStudent(student);
			student = call.execute().body();
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
		
		return student;
	
	}
	
	public static void addStudent(Student student, Callback<Student> callback)
	{
		StudentService service;
		Call<Student> call;
		
		
		service = RetrofitInstance.GetRetrofitInstance().create(StudentService.class);
		try
		{
			call = service.addStudent(student);
			call.enqueue(callback);
		}
		catch(Exception ee)
		{
			System.out.println(ee.getMessage());
		}
	
	}
	

}
