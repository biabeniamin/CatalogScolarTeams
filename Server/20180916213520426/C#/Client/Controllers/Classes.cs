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
	public static class Classes
	{
		public static async Task<List<Classe>> GetClasses()
		{
			List<Classe> classes;
			string data;
			
			classes = new List<Classe>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Classes.php?cmd=getClasses");
				classes = JsonConvert.DeserializeObject<List<Classe>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return classes;
		
		}
		
		public static async Task<Classe> AddClasse(Classe classe)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Classes.php?cmd=addClasse", classe);
				classe = JsonConvert.DeserializeObject<Classe>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return classe;
		
		}
		
	
	}

}
