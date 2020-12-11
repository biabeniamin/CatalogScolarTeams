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
	public class AbsenteController : ApiController
	{
		// GET absente/values
		public IEnumerable<Absente> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Absente");
			List<Absente> list = new List<Absente>();
			
			while(reader.Read())
			{
				list.Add(new Absente(
					(int)reader["AbsenteId"],
					(int)reader["ClasseId"],
					(int)reader["StudentId"],
					(int)reader["TeacherId"],
					(DateTime)reader["Date"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST absente/values
		public void Post([FromBody]Absente data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Absente(ClasseId,  StudentId,  TeacherId,  Date,  CreationTime) VALUES(@ClasseId,  @StudentId,  @TeacherId,  @Date,  @CreationTime)");
			
			command.Parameters.AddWithValue("@ClasseId", data.ClasseId);
			command.Parameters.AddWithValue("@StudentId", data.StudentId);
			command.Parameters.AddWithValue("@TeacherId", data.TeacherId);
			command.Parameters.AddWithValue("@Date", data.Date);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE absente/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Absente WHERE AbsenteId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
