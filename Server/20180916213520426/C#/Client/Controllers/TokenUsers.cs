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
	public static class TokenUsers
	{
		public static async Task<List<TokenUser>> GetTokenUsers()
		{
			List<TokenUser> tokenUsers;
			string data;
			
			tokenUsers = new List<TokenUser>();
			data = "";
			
			try
			{
				data = await HttpRequestClient.GetRequest("TokenUsers.php?cmd=getTokenUsers");
				tokenUsers = JsonConvert.DeserializeObject<List<TokenUser>>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return tokenUsers;
		
		}
		
		public static async Task<TokenUser> AddTokenUser(TokenUser tokenUser)
		{
			string data;
			
			data = "";
			
			try
			{
				data = await HttpRequestClient.PostRequest("TokenUsers.php?cmd=addTokenUser", tokenUser);
				tokenUser = JsonConvert.DeserializeObject<TokenUser>(data);
			}
			catch(Exception ee)
			{
				Console.WriteLine(ee.Message);
			}
			
			return tokenUser;
		
		}
		
	
	}

}
