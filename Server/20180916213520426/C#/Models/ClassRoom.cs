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
	public class ClassRoom
	{
		private int _classRoomId;
		private string _name;
		private DateTime _creationTime;
		
		[JsonProperty(PropertyName = "classRoomId")]
		public int ClassRoomId
		{
			get
			{
				return _classRoomId;
			}
			set
			{
				_classRoomId = value;
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
		
		
		public ClassRoom(int classRoomId, string name, DateTime creationTime)
		{
			_classRoomId = classRoomId;
			_name = name;
			_creationTime = creationTime;
		}
		
		public ClassRoom(string name)
		{
			_name = name;
		}
		
		public ClassRoom()
			 :this(
				"Test" //Name
			)
		{
			_classRoomId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
