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

public class Mark
{
	private Integer  markId;
	private Integer  classeId;
	private Integer  studentId;
	private Integer  teacherId;
	private Integer  value;
	private Date creationTime;
	private Teacher teacher;
	private Student student;
	private Classe classe;
	
	public Integer  getMarkId()
	{
		return this.markId;
	}
	
	public void setMarkId(Integer  markId)
	{
		this.markId = markId;
	}
	
	public Integer  getClasseId()
	{
		return this.classeId;
	}
	
	public void setClasseId(Integer  classeId)
	{
		this.classeId = classeId;
	}
	
	public Integer  getStudentId()
	{
		return this.studentId;
	}
	
	public void setStudentId(Integer  studentId)
	{
		this.studentId = studentId;
	}
	
	public Integer  getTeacherId()
	{
		return this.teacherId;
	}
	
	public void setTeacherId(Integer  teacherId)
	{
		this.teacherId = teacherId;
	}
	
	public Integer  getValue()
	{
		return this.value;
	}
	
	public void setValue(Integer  value)
	{
		this.value = value;
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
	
	public Student getStudent()
	{
		return this.student;
	}
	
	public void setStudent(Student student)
	{
		this.student = student;
	}
	
	public Classe getClasse()
	{
		return this.classe;
	}
	
	public void setClasse(Classe classe)
	{
		this.classe = classe;
	}
	
	
	public Mark(Integer  classeId, Integer  studentId, Integer  teacherId, Integer  value)
	{
		this.classeId = classeId;
		this.studentId = studentId;
		this.teacherId = teacherId;
		this.value = value;
	}
	
	public Mark(Integer  classeId, Integer  studentId, Integer  teacherId, Integer  value, Teacher teacher, Student student, Classe classe)
	{
		this(
			0, //ClasseId
			0, //StudentId
			0, //TeacherId
			0 //Value
		);
		this.teacher = teacher;
		this.student = student;
		this.classe = classe;
	
	}
	
	public Mark()
	{
		this(
			0, //ClasseId
			0, //StudentId
			0, //TeacherId
			0 //Value
		);
		this.markId = 0;
		this.creationTime = new Date(0);
	
	}
	

}
