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
	public class Absente
	{
		private int _absenteId;
		private int _classeId;
		private int _studentId;
		private int _teacherId;
		private DateTime _date;
		private DateTime _creationTime;
		private Teacher _teacher;
		private Student _student;
		private Classe _classe;
		
		[JsonProperty(PropertyName = "absenteId")]
		public int AbsenteId
		{
			get
			{
				return _absenteId;
			}
			set
			{
				_absenteId = value;
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
		
		[JsonProperty(PropertyName = "teacherId")]
		public int TeacherId
		{
			get
			{
				return _teacherId;
			}
			set
			{
				_teacherId = value;
			}
		}
		
		[JsonProperty(PropertyName = "date")]
		public DateTime Date
		{
			get
			{
				return _date;
			}
			set
			{
				_date = value;
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
		
		[JsonProperty(PropertyName = "teacher")]
		public Teacher Teacher
		{
			get
			{
				return _teacher;
			}
			set
			{
				_teacher = value;
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
		
		
		public Absente(int absenteId, int classeId, int studentId, int teacherId, DateTime date, DateTime creationTime)
		{
			_absenteId = absenteId;
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_date = date;
			_creationTime = creationTime;
		}
		
		public Absente(int classeId, int studentId, int teacherId, DateTime date)
		{
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_date = date;
		}
		
		public Absente(int classeId, int studentId, int teacherId, DateTime date, Teacher teacher, Student student, Classe classe)
			:this(classeId, studentId, teacherId, date)
		{
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_date = date;
		}
		
		public Absente()
			 :this(
				0, //ClasseId
				0, //StudentId
				0, //TeacherId
				new DateTime(1970, 1, 1, 0, 0, 0) //Date
			)
		{
			_absenteId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
