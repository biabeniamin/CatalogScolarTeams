#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Classe
class ClasseEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'classeId', 'userId', 'classRoomId', 'name', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getClassesByClasseId':
			return Classe.getClassesByClasseId(self.session, args['classeId'])
		return Classe.getClasses(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['userId', 'classRoomId', 'name'])
		args  = requestedArgs.parse_args()
		classe  = dict_as_obj(args, Classe.Classe())
		return Classe.addClasse(self.session, classe)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['classeId'])
		args  = requestedArgs.parse_args()
		return Classe.deleteClasse(self.session, args['classeId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['classeId', 'userId', 'classRoomId', 'name', 'creationTime'])
		args  = requestedArgs.parse_args()
		classe  = Classe.getClassesByClasseId(self.session, args['classeId'])[0]
		classe  = dict_as_obj(args, classe)
		return Classe.updateClasse(self.session, classe)
	
	
	

