#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Teacher
teachersSubscribers = set()
async def requestReceived(websocket, session, request):
	global teachersSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		teachers = Teacher.getTeachers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Teachers', 'data' : teachers})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		teachers = Teacher.getTeachers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Teachers', 'data' : teachers})
		teachersSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['name', 'email']) == False:
			print('Not all parameters were provided for ADD in Teachers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		teacher = dict_as_obj(request['data'], Teacher.Teacher(), ['teacherId', 'creationTime'])
		teacher = Teacher.addTeacher(session, teacher)
		response = convertToJson({'operation' : 'add', 'table' : 'Teachers', 'data' : teacher})
		teachersSubscribers = set(filter(removeClosedConnection, teachersSubscribers))
		for subscriber in teachersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['teacherId']) == False:
			print('Not all parameters were provided for UPDATE in Teachers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		teacher = Teacher.getTeachersByTeacherId(session, data['teacherId'])[0]
		teacher = dict_as_obj(data, teacher)
		teacher = Teacher.updateTeacher(session, teacher)
		response = convertToJson({'operation' : 'update', 'table' : 'Teachers', 'data' : teacher})
		teachersSubscribers = set(filter(removeClosedConnection, teachersSubscribers))
		for subscriber in teachersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['teacherId']) == False:
			print('Not all parameters were provided for DELETE in Teachers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		teacher = Teacher.deleteTeacher(session, request['data']['teacherId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Teachers', 'data' : teacher})
		teachersSubscribers = set(filter(removeClosedConnection, teachersSubscribers))
		for subscriber in teachersSubscribers:
			 await subscriber.send(response)
	
	

