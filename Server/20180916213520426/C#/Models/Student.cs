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
	public class Student
	{
		private int _studentId;
		private string _name;
		private string _email;
		private DateTime _creationTime;
		
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
		
		[JsonProperty(PropertyName = "name")]
		public string Name
		{
			get
			{
				return _name;
			}
			set
			{
				_name = value;
			}
		}
		
		[JsonProperty(PropertyName = "email")]
		public string Email
		{
			get
			{
				return _email;
			}
			set
			{
				_email = value;
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
		
		
		public Student(int studentId, string name, string email, DateTime creationTime)
		{
			_studentId = studentId;
			_name = name;
			_email = email;
			_creationTime = creationTime;
		}
		
		public Student(string name, string email)
		{
			_name = name;
			_email = email;
		}
		
		public Student()
			 :this(
				"Test", //Name
				"Test" //Email
			)
		{
			_studentId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
