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
	public class User
	{
		private int _userId;
		private string _firstName;
		private string _lastName;
		private string _email;
		private int _type;
		private DateTime _creationTime;
		
		[JsonProperty(PropertyName = "userId")]
		public int UserId
		{
			get
			{
				return _userId;
			}
			set
			{
				_userId = value;
			}
		}
		
		[JsonProperty(PropertyName = "firstName")]
		public string FirstName
		{
			get
			{
				return _firstName;
			}
			set
			{
				_firstName = value;
			}
		}
		
		[JsonProperty(PropertyName = "lastName")]
		public string LastName
		{
			get
			{
				return _lastName;
			}
			set
			{
				_lastName = value;
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
		
		[JsonProperty(PropertyName = "type")]
		public int Type
		{
			get
			{
				return _type;
			}
			set
			{
				_type = value;
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
		
		
		public User(int userId, string firstName, string lastName, string email, int type, DateTime creationTime)
		{
			_userId = userId;
			_firstName = firstName;
			_lastName = lastName;
			_email = email;
			_type = type;
			_creationTime = creationTime;
		}
		
		public User(string firstName, string lastName, string email, int type)
		{
			_firstName = firstName;
			_lastName = lastName;
			_email = email;
			_type = type;
		}
		
		public User()
			 :this(
				"Test", //FirstName
				"Test", //LastName
				"Test", //Email
				0 //Type
			)
		{
			_userId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
