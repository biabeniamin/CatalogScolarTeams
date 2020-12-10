#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import User
class UserEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'userId', 'firstName', 'lastName', 'email', 'type', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getUsersByUserId':
			return User.getUsersByUserId(self.session, args['userId'])
		return User.getUsers(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['firstName', 'lastName', 'email', 'type'])
		args  = requestedArgs.parse_args()
		user  = dict_as_obj(args, User.User())
		return User.addUser(self.session, user)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['userId'])
		args  = requestedArgs.parse_args()
		return User.deleteUser(self.session, args['userId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['userId', 'firstName', 'lastName', 'email', 'type', 'creationTime'])
		args  = requestedArgs.parse_args()
		user  = User.getUsersByUserId(self.session, args['userId'])[0]
		user  = dict_as_obj(args, user)
		return User.updateUser(self.session, user)
	
	
	

