#generated automatically
from flask_restful import Resource
from SqlAlchemy import dict_as_obj
from FlaskRestfulHelpers import getArguments
import ClassRoom
class ClassRoomEndpoints(Resource):
	def __init__(self, **kwargs):
		self.session = kwargs['session']
	
	
	#API endpoints
	#get endpoint
	def get(self):
		requestedArgs = getArguments(['cmd', 'classRoomId', 'name', 'creationTime'])
		args  = requestedArgs.parse_args()
		if args['cmd'] == 'getClassRoomsByClassRoomId':
			return ClassRoom.getClassRoomsByClassRoomId(self.session, args['classRoomId'])
		return ClassRoom.getClassRooms(self.session)
	
	
	#post endpoint
	def post(self):
		requestedArgs = getArguments(['name'])
		args  = requestedArgs.parse_args()
		classRoom  = dict_as_obj(args, ClassRoom.ClassRoom())
		return ClassRoom.addClassRoom(self.session, classRoom)
	
	
	#delete endpoint
	def delete(self):
		requestedArgs = getArguments(['classRoomId'])
		args  = requestedArgs.parse_args()
		return ClassRoom.deleteClassRoom(self.session, args['classRoomId'])
	
	
	#patch endpoint
	def patch(self):
		requestedArgs = getArguments(['classRoomId', 'name', 'creationTime'])
		args  = requestedArgs.parse_args()
		classRoom  = ClassRoom.getClassRoomsByClassRoomId(self.session, args['classRoomId'])[0]
		classRoom  = dict_as_obj(args, classRoom)
		return ClassRoom.updateClassRoom(self.session, classRoom)
	
	
	

