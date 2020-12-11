#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import StudentClasse
class StudentClasseEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'studentClasseId', 'studentId', 'classeId', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getStudentClassesByClasseId':
			return StudentClasse.getStudentClassesByClasseId(self.session, args['classeId'])
		if args['cmd'] == 'getStudentClassesByStudentId':
			return StudentClasse.getStudentClassesByStudentId(self.session, args['studentId'])
		if args['cmd'] == 'getStudentClassesByStudentClasseId':
			return StudentClasse.getStudentClassesByStudentClasseId(self.session, args['studentClasseId'])
		return StudentClasse.getStudentClasses(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['studentId', 'classeId'])
		args  = requestedArgs.parse_args()
		studentClasse  = dict_as_obj(args, StudentClasse.StudentClasse())
		return StudentClasse.addStudentClasse(self.session, studentClasse)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['studentClasseId'])
		args  = requestedArgs.parse_args()
		return StudentClasse.deleteStudentClasse(self.session, args['studentClasseId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['studentClasseId', 'studentId', 'classeId', 'creationTime'])
		args  = requestedArgs.parse_args()
		studentClasse  = StudentClasse.getStudentClassesByStudentClasseId(self.session, args['studentClasseId'])[0]
		studentClasse  = dict_as_obj(args, studentClasse)
		return StudentClasse.updateStudentClasse(self.session, studentClasse)
	
	
	

