#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import StudentClasse
studentClassesSubscribers = set()
async def requestReceived(websocket, session, request):
	global studentClassesSubscribers
	if websocket.authenticated == False:
		await websocket.send(convertToJson({'operation' : 'tokenError', 'table' : 'TokenAuthentication'}))
		return
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		studentClasses = StudentClasse.getStudentClasses(session)
		response = convertToJson({'operation' : 'get', 'table' : 'StudentClasses', 'data' : studentClasses})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		studentClasses = StudentClasse.getStudentClasses(session)
		response = convertToJson({'operation' : 'get', 'table' : 'StudentClasses', 'data' : studentClasses})
		studentClassesSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['studentId', 'classeId']) == False:
			print('Not all parameters were provided for ADD in StudentClasses')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		studentClasse = dict_as_obj(request['data'], StudentClasse.StudentClasse(), ['studentClasseId', 'creationTime'])
		studentClasse = StudentClasse.addStudentClasse(session, studentClasse)
		response = convertToJson({'operation' : 'add', 'table' : 'StudentClasses', 'data' : studentClasse})
		studentClassesSubscribers = set(filter(removeClosedConnection, studentClassesSubscribers))
		for subscriber in studentClassesSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['studentClasseId']) == False:
			print('Not all parameters were provided for UPDATE in StudentClasses')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		studentClasse = StudentClasse.getStudentClassesByStudentClasseId(session, data['studentClasseId'])[0]
		studentClasse = dict_as_obj(data, studentClasse)
		studentClasse = StudentClasse.updateStudentClasse(session, studentClasse)
		response = convertToJson({'operation' : 'update', 'table' : 'StudentClasses', 'data' : studentClasse})
		studentClassesSubscribers = set(filter(removeClosedConnection, studentClassesSubscribers))
		for subscriber in studentClassesSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['studentClasseId']) == False:
			print('Not all parameters were provided for DELETE in StudentClasses')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		studentClasse = StudentClasse.deleteStudentClasse(session, request['data']['studentClasseId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'StudentClasses', 'data' : studentClasse})
		studentClassesSubscribers = set(filter(removeClosedConnection, studentClassesSubscribers))
		for subscriber in studentClassesSubscribers:
			 await subscriber.send(response)
	
	

