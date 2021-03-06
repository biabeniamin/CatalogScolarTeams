#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Teacher
class TeacherEndpoints(Resource):
	from TokenAuthenticationEndpoints import authenticate
	method_decorators = [authenticate]
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'teacherId', 'name', 'email', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getTeachersByEmail':
			return Teacher.getTeachersByEmail(self.session, args['email'])
		if args['cmd'] == 'getTeachersByTeacherId':
			return Teacher.getTeachersByTeacherId(self.session, args['teacherId'])
		return Teacher.getTeachers(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['name', 'email'])
		args  = requestedArgs.parse_args()
		teacher  = dict_as_obj(args, Teacher.Teacher())
		return Teacher.addTeacher(self.session, teacher)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['teacherId'])
		args  = requestedArgs.parse_args()
		return Teacher.deleteTeacher(self.session, args['teacherId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['teacherId', 'name', 'email', 'creationTime'])
		args  = requestedArgs.parse_args()
		teacher  = Teacher.getTeachersByTeacherId(self.session, args['teacherId'])[0]
		teacher  = dict_as_obj(args, teacher)
		return Teacher.updateTeacher(self.session, teacher)
	
	
	

