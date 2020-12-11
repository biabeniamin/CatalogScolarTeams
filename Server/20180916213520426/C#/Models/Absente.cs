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
		private int _teacherId;
		private DateTime _date;
		private DateTime _creationTime;
		private Teacher _teacher;
		
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
		
		
		public Absente(int absenteId, int teacherId, DateTime date, DateTime creationTime)
		{
			_absenteId = absenteId;
			_teacherId = teacherId;
			_date = date;
			_creationTime = creationTime;
		}
		
		public Absente(int teacherId, DateTime date)
		{
			_teacherId = teacherId;
			_date = date;
		}
		
		public Absente(int teacherId, DateTime date, Teacher teacher)
			:this(teacherId, date)
		{
			_teacherId = teacherId;
			_date = date;
		}
		
		public Absente()
			 :this(
				0, //TeacherId
				new DateTime(1970, 1, 1, 0, 0, 0) //Date
			)
		{
			_absenteId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
