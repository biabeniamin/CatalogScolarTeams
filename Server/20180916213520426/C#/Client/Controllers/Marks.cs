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
	public static class Marks
	{
		public static async Task<List<Mark>> GetMarks()
		{
			List<Mark> marks;
			string data;
			
			marks = new List<Mark>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Marks.php?cmd=getMarks");
				marks = JsonConvert.DeserializeObject<List<Mark>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return marks;
		
		}
		
		public static async Task<Mark> AddMark(Mark mark)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Marks.php?cmd=addMark", mark);
				mark = JsonConvert.DeserializeObject<Mark>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return mark;
		
		}
		
	
	}

}
