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
		private int _userId;
		private int _value;
		private DateTime _creationTime;
		private User _user;
		
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
		
		[JsonProperty(PropertyName = "user")]
		public User User
		{
			get
			{
				return _user;
			}
			set
			{
				_user = value;
			}
		}
		
		
		public Mark(int markId, int userId, int value, DateTime creationTime)
		{
			_markId = markId;
			_userId = userId;
			_value = value;
			_creationTime = creationTime;
		}
		
		public Mark(int userId, int value)
		{
			_userId = userId;
			_value = value;
		}
		
		public Mark(int userId, int value, User user)
			:this(userId, value)
		{
			_userId = userId;
			_value = value;
		}
		
		public Mark()
			 :this(
				0, //UserId
				0 //Value
			)
		{
			_markId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
