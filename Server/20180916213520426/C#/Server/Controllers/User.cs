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
	public class UserController : ApiController
	{
		// GET users/values
		public IEnumerable<User> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Users");
			List<User> list = new List<User>();
			
			while(reader.Read())
			{
				list.Add(new User(
					(int)reader["UserId"],
					(string)reader["FirstName"],
					(string)reader["LastName"],
					(string)reader["Email"],
					(int)reader["Type"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST users/values
		public void Post([FromBody]User data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Users(FirstName,  LastName,  Email,  Type,  CreationTime) VALUES(@FirstName,  @LastName,  @Email,  @Type,  @CreationTime)");
			
			command.Parameters.AddWithValue("@FirstName", data.FirstName);
			command.Parameters.AddWithValue("@LastName", data.LastName);
			command.Parameters.AddWithValue("@Email", data.Email);
			command.Parameters.AddWithValue("@Type", data.Type);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE users/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Users WHERE UserId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
