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
	public class ClasseController : ApiController
	{
		// GET classes/values
		public IEnumerable<Classe> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Classes");
			List<Classe> list = new List<Classe>();
			
			while(reader.Read())
			{
				list.Add(new Classe(
					(int)reader["ClasseId"],
					(int)reader["TeacherId"],
					(int)reader["ClassRoomId"],
					(string)reader["Name"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST classes/values
		public void Post([FromBody]Classe data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Classes(TeacherId,  ClassRoomId,  Name,  CreationTime) VALUES(@TeacherId,  @ClassRoomId,  @Name,  @CreationTime)");
			
			command.Parameters.AddWithValue("@TeacherId", data.TeacherId);
			command.Parameters.AddWithValue("@ClassRoomId", data.ClassRoomId);
			command.Parameters.AddWithValue("@Name", data.Name);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE classes/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Classes WHERE ClasseId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
