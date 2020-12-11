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
	public static class Students
	{
		public static async Task<List<Student>> GetStudents()
		{
			List<Student> students;
			string data;
			
			students = new List<Student>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Students.php?cmd=getStudents");
				students = JsonConvert.DeserializeObject<List<Student>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return students;
		
		}
		
		public static async Task<Student> AddStudent(Student student)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Students.php?cmd=addStudent", student);
				student = JsonConvert.DeserializeObject<Student>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return student;
		
		}
		
	
	}

}
