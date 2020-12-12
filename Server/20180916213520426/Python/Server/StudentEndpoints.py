#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Student
class StudentEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'studentId', 'name', 'email', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getStudentsByStudentId':
			return Student.getStudentsByStudentId(self.session, args['studentId'])
		return Student.getStudents(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['name', 'email'])
		args  = requestedArgs.parse_args()
		student  = dict_as_obj(args, Student.Student())
		return Student.addStudent(self.session, student)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['studentId'])
		args  = requestedArgs.parse_args()
		return Student.deleteStudent(self.session, args['studentId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['studentId', 'name', 'email', 'creationTime'])
		args  = requestedArgs.parse_args()
		student  = Student.getStudentsByStudentId(self.session, args['studentId'])[0]
		student  = dict_as_obj(args, student)
		return Student.updateStudent(self.session, student)
	
	
	

