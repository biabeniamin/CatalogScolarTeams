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
	public static class Absente
	{
		public static async Task<List<Absente>> GetAbsente()
		{
			List<Absente> absente;
			string data;
			
			absente = new List<Absente>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Absente.php?cmd=getAbsente");
				absente = JsonConvert.DeserializeObject<List<Absente>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return absente;
		
		}
		
		public static async Task<Absente> AddAbsente(Absente absente)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Absente.php?cmd=addAbsente", absente);
				absente = JsonConvert.DeserializeObject<Absente>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return absente;
		
		}
		
	
	}

}
