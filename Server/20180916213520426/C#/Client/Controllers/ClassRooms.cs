//generated automatically
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
using Newtonsoft.Json;
namespace DatabaseFunctionsGenerator
{
	public static class ClassRooms
	{
		public static async Task<List<ClassRoom>> GetClassRooms()
		{
			List<ClassRoom> classRooms;
			string data;
			
			classRooms = new List<ClassRoom>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("ClassRooms.php?cmd=getClassRooms");
				classRooms = JsonConvert.DeserializeObject<List<ClassRoom>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return classRooms;
		
		}
		
		public static async Task<ClassRoom> AddClassRoom(ClassRoom classRoom)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("ClassRooms.php?cmd=addClassRoom", classRoom);
				classRoom = JsonConvert.DeserializeObject<ClassRoom>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return classRoom;
		
		}
		
	
	}

}
