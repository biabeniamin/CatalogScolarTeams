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

public class StudentClasse
{
	private Integer  studentClasseId;
	private Integer  studentId;
	private Integer  classeId;
	private Date creationTime;
	private Classe classe;
	private Student student;
	
	public Integer  getStudentClasseId()
	{
		return this.studentClasseId;
	}
	
	public void setStudentClasseId(Integer  studentClasseId)
	{
		this.studentClasseId = studentClasseId;
	}
	
	public Integer  getStudentId()
	{
		return this.studentId;
	}
	
	public void setStudentId(Integer  studentId)
	{
		this.studentId = studentId;
	}
	
	public Integer  getClasseId()
	{
		return this.classeId;
	}
	
	public void setClasseId(Integer  classeId)
	{
		this.classeId = classeId;
	}
	
	public Date getCreationTime()
	{
		return this.creationTime;
	}
	
	public void setCreationTime(Date creationTime)
	{
		this.creationTime = creationTime;
	}
	
	public Classe getClasse()
	{
		return this.classe;
	}
	
	public void setClasse(Classe classe)
	{
		this.classe = classe;
	}
	
	public Student getStudent()
	{
		return this.student;
	}
	
	public void setStudent(Student student)
	{
		this.student = student;
	}
	
	
	public StudentClasse(Integer  studentId, Integer  classeId)
	{
		this.studentId = studentId;
		this.classeId = classeId;
	}
	
	public StudentClasse(Integer  studentId, Integer  classeId, Classe classe, Student student)
	{
		this(
			0, //StudentId
			0 //ClasseId
		);
		this.classe = classe;
		this.student = student;
	
	}
	
	public StudentClasse()
	{
		this(
			0, //StudentId
			0 //ClasseId
		);
		this.studentClasseId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
