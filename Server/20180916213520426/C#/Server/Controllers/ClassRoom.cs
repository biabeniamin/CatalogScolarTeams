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
	public class ClassRoomController : ApiController
	{
		// GET classRooms/values
		public IEnumerable<ClassRoom> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM ClassRooms");
			List<ClassRoom> list = new List<ClassRoom>();
			
			while(reader.Read())
			{
				list.Add(new ClassRoom(
					(int)reader["ClassRoomId"],
					(string)reader["Name"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST classRooms/values
		public void Post([FromBody]ClassRoom data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO ClassRooms(Name,  CreationTime) VALUES(@Name,  @CreationTime)");
			
			command.Parameters.AddWithValue("@Name", data.Name);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE classRooms/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM ClassRooms WHERE ClassRoomId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
