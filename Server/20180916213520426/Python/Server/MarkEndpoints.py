#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Mark
class MarkEndpoints(Resource):
	from TokenAuthenticationEndpoints import authenticate
	method_decorators = [authenticate]
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'markId', 'classeId', 'studentId', 'teacherId', 'value', 'date', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getMarksByClasseIdStudentId':
			return Mark.getMarksByClasseIdStudentId(self.session, args['classeId'], args['studentId'])
		if args['cmd'] == 'getMarksByMarkId':
			return Mark.getMarksByMarkId(self.session, args['markId'])
		return Mark.getMarks(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['classeId', 'studentId', 'teacherId', 'value', 'date'])
		args  = requestedArgs.parse_args()
		mark  = dict_as_obj(args, Mark.Mark())
		return Mark.addMark(self.session, mark)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['markId'])
		args  = requestedArgs.parse_args()
		return Mark.deleteMark(self.session, args['markId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['markId', 'classeId', 'studentId', 'teacherId', 'value', 'date', 'creationTime'])
		args  = requestedArgs.parse_args()
		mark  = Mark.getMarksByMarkId(self.session, args['markId'])[0]
		mark  = dict_as_obj(args, mark)
		return Mark.updateMark(self.session, mark)
	
	
	

