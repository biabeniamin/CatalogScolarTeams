#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import Token
class TokenEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'tokenId', 'tokenUserId', 'value', 'address', 'lastUpdate', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getTokensByValue':
			return Token.getTokensByValue(self.session, args['value'])
		if args['cmd'] == 'getTokensByTokenId':
			return Token.getTokensByTokenId(self.session, args['tokenId'])
		return Token.getTokens(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['tokenUserId', 'value', 'address', 'lastUpdate'])
		args  = requestedArgs.parse_args()
		token  = dict_as_obj(args, Token.Token())
		return Token.addToken(self.session, token)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['tokenId'])
		args  = requestedArgs.parse_args()
		return Token.deleteToken(self.session, args['tokenId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['tokenId', 'tokenUserId', 'value', 'address', 'lastUpdate', 'creationTime'])
		args  = requestedArgs.parse_args()
		token  = Token.getTokensByTokenId(self.session, args['tokenId'])[0]
		token  = dict_as_obj(args, token)
		return Token.updateToken(self.session, token)
	
	
	

