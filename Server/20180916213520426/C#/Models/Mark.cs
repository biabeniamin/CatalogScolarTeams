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
	public class Mark
	{
		private int _markId;
		private int _classeId;
		private int _studentId;
		private int _teacherId;
		private int _value;
		private DateTime _date;
		private DateTime _creationTime;
		private Teacher _teacher;
		private Student _student;
		private Classe _classe;
		
		[JsonProperty(PropertyName = "markId")]
		public int MarkId
		{
			get
			{
				return _markId;
			}
			set
			{
				_markId = value;
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
		
		[JsonProperty(PropertyName = "value")]
		public int Value
		{
			get
			{
				return _value;
			}
			set
			{
				_value = value;
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
		
		
		public Mark(int markId, int classeId, int studentId, int teacherId, int value, DateTime date, DateTime creationTime)
		{
			_markId = markId;
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_value = value;
			_date = date;
			_creationTime = creationTime;
		}
		
		public Mark(int classeId, int studentId, int teacherId, int value, DateTime date)
		{
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_value = value;
			_date = date;
		}
		
		public Mark(int classeId, int studentId, int teacherId, int value, DateTime date, Teacher teacher, Student student, Classe classe)
			:this(classeId, studentId, teacherId, value, date)
		{
			_classeId = classeId;
			_studentId = studentId;
			_teacherId = teacherId;
			_value = value;
			_date = date;
		}
		
		public Mark()
			 :this(
				0, //ClasseId
				0, //StudentId
				0, //TeacherId
				0, //Value
				new DateTime(1970, 1, 1, 0, 0, 0) //Date
			)
		{
			_markId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
