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
	public class TeacherController : ApiController
	{
		// GET teachers/values
		public IEnumerable<Teacher> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Teachers");
			List<Teacher> list = new List<Teacher>();
			
			while(reader.Read())
			{
				list.Add(new Teacher(
					(int)reader["TeacherId"],
					(string)reader["FirstName"],
					(string)reader["LastName"],
					(string)reader["Email"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST teachers/values
		public void Post([FromBody]Teacher data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Teachers(FirstName,  LastName,  Email,  CreationTime) VALUES(@FirstName,  @LastName,  @Email,  @CreationTime)");
			
			command.Parameters.AddWithValue("@FirstName", data.FirstName);
			command.Parameters.AddWithValue("@LastName", data.LastName);
			command.Parameters.AddWithValue("@Email", data.Email);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE teachers/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Teachers WHERE TeacherId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
