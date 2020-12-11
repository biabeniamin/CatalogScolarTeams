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
	public static class Teachers
	{
		public static async Task<List<Teacher>> GetTeachers()
		{
			List<Teacher> teachers;
			string data;
			
			teachers = new List<Teacher>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Teachers.php?cmd=getTeachers");
				teachers = JsonConvert.DeserializeObject<List<Teacher>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return teachers;
		
		}
		
		public static async Task<Teacher> AddTeacher(Teacher teacher)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Teachers.php?cmd=addTeacher", teacher);
				teacher = JsonConvert.DeserializeObject<Teacher>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return teacher;
		
		}
		
	
	}

}
