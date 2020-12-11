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
	public class Classe
	{
		private int _classeId;
		private int _teacherId;
		private int _classRoomId;
		private string _name;
		private DateTime _creationTime;
		private ClassRoom _classRoom;
		private Teacher _teacher;
		
		[JsonProperty(PropertyName = "classeId")]
		public int ClasseId
		{
			get
			{
				return _classeId;
			}
			set
			{
				_classeId = value;
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
		
		[JsonProperty(PropertyName = "classRoom")]
		public ClassRoom ClassRoom
		{
			get
			{
				return _classRoom;
			}
			set
			{
				_classRoom = value;
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
		
		
		public Classe(int classeId, int teacherId, int classRoomId, string name, DateTime creationTime)
		{
			_classeId = classeId;
			_teacherId = teacherId;
			_classRoomId = classRoomId;
			_name = name;
			_creationTime = creationTime;
		}
		
		public Classe(int teacherId, int classRoomId, string name)
		{
			_teacherId = teacherId;
			_classRoomId = classRoomId;
			_name = name;
		}
		
		public Classe(int teacherId, int classRoomId, string name, ClassRoom classRoom, Teacher teacher)
			:this(teacherId, classRoomId, name)
		{
			_teacherId = teacherId;
			_classRoomId = classRoomId;
			_name = name;
		}
		
		public Classe()
			 :this(
				0, //TeacherId
				0, //ClassRoomId
				"Test" //Name
			)
		{
			_classeId = 0;
			_creationTime = new DateTime(1970, 1, 1, 0, 0, 0);
		}
		
	
	}

}
