//generated automatically
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Server.Controllers;
namespace DatabaseFunctionsGenerator
{
	public class TokenUserController : ApiController
	{
		// GET tokenUsers/values
		public IEnumerable<TokenUser> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM TokenUsers");
			List<TokenUser> list = new List<TokenUser>();
			
			while(reader.Read())
			{
				list.Add(new TokenUser(
					(int)reader["TokenUserId"],
					(string)reader["Username"],
					(string)reader["Password"],
					(int)reader["Type"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST tokenUsers/values
		public void Post([FromBody]TokenUser data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO TokenUsers(Username,  Password,  Type,  CreationTime) VALUES(@Username,  @Password,  @Type,  @CreationTime)");
			
			command.Parameters.AddWithValue("@Username", data.Username);
			command.Parameters.AddWithValue("@Password", data.Password);
			command.Parameters.AddWithValue("@Type", data.Type);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE tokenUsers/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM TokenUsers WHERE TokenUserId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
