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
	public static class StudentClasses
	{
		public static async Task<List<StudentClasse>> GetStudentClasses()
		{
			List<StudentClasse> studentClasses;
			string data;
			
			studentClasses = new List<StudentClasse>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("StudentClasses.php?cmd=getStudentClasses");
				studentClasses = JsonConvert.DeserializeObject<List<StudentClasse>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return studentClasses;
		
		}
		
		public static async Task<StudentClasse> AddStudentClasse(StudentClasse studentClasse)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("StudentClasses.php?cmd=addStudentClasse", studentClasse);
				studentClasse = JsonConvert.DeserializeObject<StudentClasse>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return studentClasse;
		
		}
		
	
	}

}
