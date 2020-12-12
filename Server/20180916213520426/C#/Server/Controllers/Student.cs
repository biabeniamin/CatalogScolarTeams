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
	public class StudentController : ApiController
	{
		// GET students/values
		public IEnumerable<Student> Get()
		{
			MySqlDataReader reader = new DatabaseOperations().GetReader("SELECT * FROM Students");
			List<Student> list = new List<Student>();
			
			while(reader.Read())
			{
				list.Add(new Student(
					(int)reader["StudentId"],
					(string)reader["Name"],
					(string)reader["Email"],
					(DateTime)reader["CreationTime"]
				));
			}
			
			return list;
		}
		
		// POST students/values
		public void Post([FromBody]Student data)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("INSERT INTO Students(Name,  Email,  CreationTime) VALUES(@Name,  @Email,  @CreationTime)");
			
			command.Parameters.AddWithValue("@Name", data.Name);
			command.Parameters.AddWithValue("@Email", data.Email);
			command.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
			
			db.ExecuteQuery(command);
		}
		
		// DELETE students/values/id
		public void Delete(int id)
		{
			DatabaseOperations db = new DatabaseOperations();
			MySqlCommand command = new MySqlCommand("DELETE FROM Students WHERE StudentId=@Id");
			
			command.Parameters.AddWithValue("@Id", id);
			
			db.ExecuteQuery(command);
		}
		
	
	}

}
