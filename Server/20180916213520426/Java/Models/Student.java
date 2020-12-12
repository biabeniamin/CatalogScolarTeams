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

public class Student
{
	private Integer  studentId;
	private String name;
	private String email;
	private Date creationTime;
	
	public Integer  getStudentId()
	{
		return this.studentId;
	}
	
	public void setStudentId(Integer  studentId)
	{
		this.studentId = studentId;
	}
	
	public String getName()
	{
		return this.name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getEmail()
	{
		return this.email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	
	public Student(String name, String email)
	{
		this.name = name;
		this.email = email;
	}
	
	public Student()
	{
		this(
			"Test", //Name
			"Test" //Email
		);
		this.studentId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
