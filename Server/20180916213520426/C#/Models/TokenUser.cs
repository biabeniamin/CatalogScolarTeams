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
	public class TokenUser
	{
		private int _tokenUserId;
		private string _username;
		private string _password;
		private int _type;
		private DateTime _creationTime;
		
		[JsonProperty(PropertyName = "tokenUserId")]
		public int TokenUserId
		{
			get
			{
				return _tokenUserId;
			}
			set
			{
				_tokenUserId = value;
			}
		}
		
		[JsonProperty(PropertyName = "username")]
		public string Username
		{
			get
			{
				return _username;
			}
			set
			{
				_username = value;
			}
		}
		
		[JsonProperty(PropertyName = "password")]
		public string Password
		{
			get
			{
				return _password;
			}
			set
			{
				_password = value;
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
		
		
		public TokenUser(int tokenUserId, string username, string password, int type, DateTime creationTime)
		{
			_tokenUserId = tokenUserId;
			_username = username;
			_password = password;
			_type = type;
			_creationTime = creationTime;
		}
		
		public TokenUser(string username, string password, int type)
		{
			_username = username;
			_password = password;
			_type = type;
		}
		
		public TokenUser()
			 :this(
				"Test", //Username
				"Test", //Password
				0 //Type
			)
		{
			_tokenUserId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
