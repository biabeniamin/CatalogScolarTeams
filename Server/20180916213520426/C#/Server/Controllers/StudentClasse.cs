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
	public class StudentClasseController : ApiController
	{
		// GET studentClasses/values
		public IEnumerable<StudentClasse> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM StudentClasses");
			List<StudentClasse> list = new List<StudentClasse>();
			
			while(reader.Read())
			{
				list.Add(new StudentClasse(
					(int)reader["StudentClasseId"],
					(int)reader["StudentId"],
					(int)reader["ClasseId"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST studentClasses/values
		public void Post([FromBody]StudentClasse data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO StudentClasses(StudentId,  ClasseId,  CreationTime) VALUES(@StudentId,  @ClasseId,  @CreationTime)");
			
			command.Parameters.AddWithValue("@StudentId", data.StudentId);
			command.Parameters.AddWithValue("@ClasseId", data.ClasseId);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE studentClasses/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM StudentClasses WHERE StudentClasseId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
