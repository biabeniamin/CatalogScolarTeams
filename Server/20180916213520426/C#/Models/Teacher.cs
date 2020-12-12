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
	public class Teacher
	{
		private int _teacherId;
		private string _name;
		private string _email;
		private DateTime _creationTime;
		
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
		
		
		public Teacher(int teacherId, string name, string email, DateTime creationTime)
		{
			_teacherId = teacherId;
			_name = name;
			_email = email;
			_creationTime = creationTime;
		}
		
		public Teacher(string name, string email)
		{
			_name = name;
			_email = email;
		}
		
		public Teacher()
			 :this(
				"Test", //Name
				"Test" //Email
			)
		{
			_teacherId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
