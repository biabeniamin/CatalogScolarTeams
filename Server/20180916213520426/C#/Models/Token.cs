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
	public class Token
	{
		private int _tokenId;
		private int _tokenUserId;
		private NOT_EXISTING _value;
		private string _address;
		private DateTime _lastUpdate;
		private DateTime _creationTime;
		private TokenUser _tokenUser;
		
		[JsonProperty(PropertyName = "tokenId")]
		public int TokenId
		{
			get
			{
				return _tokenId;
			}
			set
			{
				_tokenId = value;
			}
		}
		
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
		
		[JsonProperty(PropertyName = "value")]
		public NOT_EXISTING Value
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
		
		[JsonProperty(PropertyName = "address")]
		public string Address
		{
			get
			{
				return _address;
			}
			set
			{
				_address = value;
			}
		}
		
		[JsonProperty(PropertyName = "lastUpdate")]
		public DateTime LastUpdate
		{
			get
			{
				return _lastUpdate;
			}
			set
			{
				_lastUpdate = value;
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
		
		[JsonProperty(PropertyName = "tokenUser")]
		public TokenUser TokenUser
		{
			get
			{
				return _tokenUser;
			}
			set
			{
				_tokenUser = value;
			}
		}
		
		
		public Token(int tokenId, int tokenUserId, NOT_EXISTING value, string address, DateTime lastUpdate, DateTime creationTime)
		{
			_tokenId = tokenId;
			_tokenUserId = tokenUserId;
			_value = value;
			_address = address;
			_lastUpdate = lastUpdate;
			_creationTime = creationTime;
		}
		
		public Token(int tokenUserId, NOT_EXISTING value, string address, DateTime lastUpdate)
		{
			_tokenUserId = tokenUserId;
			_value = value;
			_address = address;
			_lastUpdate = lastUpdate;
		}
		
		public Token(int tokenUserId, NOT_EXISTING value, string address, DateTime lastUpdate, TokenUser tokenUser)
			:this(tokenUserId, value, address, lastUpdate)
		{
			_tokenUserId = tokenUserId;
			_value = value;
			_address = address;
			_lastUpdate = lastUpdate;
		}
		
		public Token()
			 :this(
				0, //TokenUserId
				, //Value
				"Test", //Address
				new DateTime(1970, 1, 1, 0, 0, 0) //LastUpdate
			)
		{
			_tokenId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
