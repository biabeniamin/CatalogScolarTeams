#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import TokenUser
class TokenUserEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'tokenUserId', 'username', 'password', 'type', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getTokenUsersByUsernamePassword':
			return TokenUser.getTokenUsersByUsernamePassword(self.session, args['username'], args['password'])
		if args['cmd'] == 'getTokenUsersByTokenUserId':
			return TokenUser.getTokenUsersByTokenUserId(self.session, args['tokenUserId'])
		return TokenUser.getTokenUsers(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['username', 'password', 'type'])
		args  = requestedArgs.parse_args()
		tokenUser  = dict_as_obj(args, TokenUser.TokenUser())
		return TokenUser.addTokenUser(self.session, tokenUser)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['tokenUserId'])
		args  = requestedArgs.parse_args()
		return TokenUser.deleteTokenUser(self.session, args['tokenUserId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['tokenUserId', 'username', 'password', 'type', 'creationTime'])
		args  = requestedArgs.parse_args()
		tokenUser  = TokenUser.getTokenUsersByTokenUserId(self.session, args['tokenUserId'])[0]
		tokenUser  = dict_as_obj(args, tokenUser)
		return TokenUser.updateTokenUser(self.session, tokenUser)
	
	
	

