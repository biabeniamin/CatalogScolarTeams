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

public class Absente
{
	private Integer  absenteId;
	private Integer  teacherId;
	private Date date;
	private Date creationTime;
	private Teacher teacher;
	
	public Integer  getAbsenteId()
	{
		return this.absenteId;
	}
	
	public void setAbsenteId(Integer  absenteId)
	{
		this.absenteId = absenteId;
	}
	
	public Integer  getTeacherId()
	{
		return this.teacherId;
	}
	
	public void setTeacherId(Integer  teacherId)
	{
		this.teacherId = teacherId;
	}
	
	public Date getDate()
	{
		return this.date;
	}
	
	public void setDate(Date date)
	{
		this.date = date;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	public Teacher getTeacher()
	{
		return this.teacher;
	}
	
	public void setTeacher(Teacher teacher)
	{
		this.teacher = teacher;
	}
	
	
	public Absente(Integer  teacherId, Date date)
	{
		this.teacherId = teacherId;
		this.date = date;
	}
	
	public Absente(Integer  teacherId, Date date, Teacher teacher)
	{
		this(
			0, //TeacherId
			new Date(0) //Date
		);
		this.teacher = teacher;
	
	}
	
	public Absente()
	{
		this(
			0, //TeacherId
			new Date(0) //Date
		);
		this.absenteId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
