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
	public class MarkController : ApiController
	{
		// GET marks/values
		public IEnumerable<Mark> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Marks");
			List<Mark> list = new List<Mark>();
			
			while(reader.Read())
			{
				list.Add(new Mark(
					(int)reader["MarkId"],
					(int)reader["UserId"],
					(int)reader["Value"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST marks/values
		public void Post([FromBody]Mark data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Marks(UserId,  Value,  CreationTime) VALUES(@UserId,  @Value,  @CreationTime)");
			
			command.Parameters.AddWithValue("@UserId", data.UserId);
			command.Parameters.AddWithValue("@Value", data.Value);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE marks/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Marks WHERE MarkId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
