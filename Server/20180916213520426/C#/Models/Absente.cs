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
		private int _userId;
		private DateTime _date;
		private DateTime _creationTime;
		private User _user;
		
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
		
		
		public Absente(int absenteId, int userId, DateTime date, DateTime creationTime)
		{
			_absenteId = absenteId;
			_userId = userId;
			_date = date;
			_creationTime = creationTime;
		}
		
		public Absente(int userId, DateTime date)
		{
			_userId = userId;
			_date = date;
		}
		
		public Absente(int userId, DateTime date, User user)
			:this(userId, date)
		{
			_userId = userId;
			_date = date;
		}
		
		public Absente()
			 :this(
				0, //UserId
				new DateTime(1970, 1, 1, 0, 0, 0) //Date
			)
		{
			_absenteId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
