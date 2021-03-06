#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Absente
class AbsenteEndpoints(Resource):
	from TokenAuthenticationEndpoints import authenticate
	method_decorators = [authenticate]
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'absenteId', 'classeId', 'studentId', 'teacherId', 'date', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getAbsenteByAbsenteId':
			return Absente.getAbsenteByAbsenteId(self.session, args['absenteId'])
		return Absente.getAbsente(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['classeId', 'studentId', 'teacherId', 'date'])
		args  = requestedArgs.parse_args()
		absente  = dict_as_obj(args, Absente.Absente())
		return Absente.addAbsente(self.session, absente)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['absenteId'])
		args  = requestedArgs.parse_args()
		return Absente.deleteAbsente(self.session, args['absenteId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['absenteId', 'classeId', 'studentId', 'teacherId', 'date', 'creationTime'])
		args  = requestedArgs.parse_args()
		absente  = Absente.getAbsenteByAbsenteId(self.session, args['absenteId'])[0]
		absente  = dict_as_obj(args, absente)
		return Absente.updateAbsente(self.session, absente)
	
	
	

