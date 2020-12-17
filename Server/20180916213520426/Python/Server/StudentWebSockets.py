#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Student
studentsSubscribers = set()
async def requestReceived(websocket, session, request):
	global studentsSubscribers
	if websocket.authenticated == False:
		await websocket.send(convertToJson({'operation' : 'tokenError', 'table' : 'TokenAuthentication'}))
		return
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		students = Student.getStudents(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Students', 'data' : students})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		students = Student.getStudents(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Students', 'data' : students})
		studentsSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['name', 'email']) == False:
			print('Not all parameters were provided for ADD in Students')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		student = dict_as_obj(request['data'], Student.Student(), ['studentId', 'creationTime'])
		student = Student.addStudent(session, student)
		response = convertToJson({'operation' : 'add', 'table' : 'Students', 'data' : student})
		studentsSubscribers = set(filter(removeClosedConnection, studentsSubscribers))
		for subscriber in studentsSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['studentId']) == False:
			print('Not all parameters were provided for UPDATE in Students')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		student = Student.getStudentsByStudentId(session, data['studentId'])[0]
		student = dict_as_obj(data, student)
		student = Student.updateStudent(session, student)
		response = convertToJson({'operation' : 'update', 'table' : 'Students', 'data' : student})
		studentsSubscribers = set(filter(removeClosedConnection, studentsSubscribers))
		for subscriber in studentsSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['studentId']) == False:
			print('Not all parameters were provided for DELETE in Students')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		student = Student.deleteStudent(session, request['data']['studentId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Students', 'data' : student})
		studentsSubscribers = set(filter(removeClosedConnection, studentsSubscribers))
		for subscriber in studentsSubscribers:
			 await subscriber.send(response)
	
	

