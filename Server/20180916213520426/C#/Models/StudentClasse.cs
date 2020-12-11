//generated automatically
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
namespace DatabaseFunctionsGenerator
{
	public class StudentClasse
	{
		private int _studentClasseId;
		private int _studentId;
		private int _classeId;
		private DateTime _creationTime;
		private Classe _classe;
		private Student _student;
		
		[JsonProperty(PropertyName = "studentClasseId")]
		public int StudentClasseId
		{
			get
			{
				return _studentClasseId;
			}
			set
			{
				_studentClasseId = value;
			}
		}
		
		[JsonProperty(PropertyName = "studentId")]
		public int StudentId
		{
			get
			{
				return _studentId;
			}
			set
			{
				_studentId = value;
			}
		}
		
		[JsonProperty(PropertyName = "classeId")]
		public int ClasseId
		{
			get
			{
				return _classeId;
			}
			set
			{
				_classeId = value;
			}
		}
		
		[JsonProperty(PropertyName = "creationTime")]
		public DateTime CreationTime
		{
			get
			{
				return _creationTime;
			}
			set
			{
				_creationTime = value;
			}
		}
		
		[JsonProperty(PropertyName = "classe")]
		public Classe Classe
		{
			get
			{
				return _classe;
			}
			set
			{
				_classe = value;
			}
		}
		
		[JsonProperty(PropertyName = "student")]
		public Student Student
		{
			get
			{
				return _student;
			}
			set
			{
				_student = value;
			}
		}
		
		
		public StudentClasse(int studentClasseId, int studentId, int classeId, DateTime creationTime)
		{
			_studentClasseId = studentClasseId;
			_studentId = studentId;
			_classeId = classeId;
			_creationTime = creationTime;
		}
		
		public StudentClasse(int studentId, int classeId)
		{
			_studentId = studentId;
			_classeId = classeId;
		}
		
		public StudentClasse(int studentId, int classeId, Classe classe, Student student)
			:this(studentId, classeId)
		{
			_studentId = studentId;
			_classeId = classeId;
		}
		
		public StudentClasse()
			 :this(
				0, //StudentId
				0 //ClasseId
			)
		{
			_studentClasseId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
