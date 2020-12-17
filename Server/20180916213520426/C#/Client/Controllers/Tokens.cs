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
	public static class Tokens
	{
		public static async Task<List<Token>> GetTokens()
		{
			List<Token> tokens;
			string data;
			
			tokens = new List<Token>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("Tokens.php?cmd=getTokens");
				tokens = JsonConvert.DeserializeObject<List<Token>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return tokens;
		
		}
		
		public static async Task<Token> AddToken(Token token)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("Tokens.php?cmd=addToken", token);
				token = JsonConvert.DeserializeObject<Token>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return token;
		
		}
		
	
	}

}
