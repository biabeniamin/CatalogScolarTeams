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
		
		
		public TokenUser(int tokenUserId, string username, string password, DateTime creationTime)
		{
			_tokenUserId = tokenUserId;
			_username = username;
			_password = password;
			_creationTime = creationTime;
		}
		
		public TokenUser(string username, string password)
		{
			_username = username;
			_password = password;
		}
		
		public TokenUser()
			 :this(
				"Test", //Username
				"Test" //Password
			)
		{
			_tokenUserId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
