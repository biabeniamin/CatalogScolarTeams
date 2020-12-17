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
	public class TokenController : ApiController
	{
		// GET tokens/values
		public IEnumerable<Token> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Tokens");
			List<Token> list = new List<Token>();
			
			while(reader.Read())
			{
				list.Add(new Token(
					(int)reader["TokenId"],
					(int)reader["TokenUserId"],
					(NOT_EXISTING)reader["Value"],
					(string)reader["Address"],
					(DateTime)reader["LastUpdate"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST tokens/values
		public void Post([FromBody]Token data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Tokens(TokenUserId,  Value,  Address,  LastUpdate,  CreationTime) VALUES(@TokenUserId,  @Value,  @Address,  @LastUpdate,  @CreationTime)");
			
			command.Parameters.AddWithValue("@TokenUserId", data.TokenUserId);
			command.Parameters.AddWithValue("@Value", data.Value);
			command.Parameters.AddWithValue("@Address", data.Address);
			command.Parameters.AddWithValue("@LastUpdate", data.LastUpdate);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE tokens/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Tokens WHERE TokenId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
