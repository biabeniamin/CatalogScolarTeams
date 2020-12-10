#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Classe
classesSubscribers = set()
async def requestReceived(websocket, session, request):
	global classesSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		classes = Classe.getClasses(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Classes', 'data' : classes})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		classes = Classe.getClasses(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Classes', 'data' : classes})
		classesSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['userId', 'classRoomId', 'name']) == False:
			print('Not all parameters were provided for ADD in Classes')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		classe = dict_as_obj(request['data'], Classe.Classe(), ['classeId', 'creationTime'])
		classe = Classe.addClasse(session, classe)
		response = convertToJson({'operation' : 'add', 'table' : 'Classes', 'data' : classe})
		classesSubscribers = set(filter(removeClosedConnection, classesSubscribers))
		for subscriber in classesSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['classeId']) == False:
			print('Not all parameters were provided for UPDATE in Classes')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		classe = Classe.getClassesByClasseId(session, data['classeId'])[0]
		classe = dict_as_obj(data, classe)
		classe = Classe.updateClasse(session, classe)
		response = convertToJson({'operation' : 'update', 'table' : 'Classes', 'data' : classe})
		classesSubscribers = set(filter(removeClosedConnection, classesSubscribers))
		for subscriber in classesSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['classeId']) == False:
			print('Not all parameters were provided for DELETE in Classes')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		classe = Classe.deleteClasse(session, request['data']['classeId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Classes', 'data' : classe})
		classesSubscribers = set(filter(removeClosedConnection, classesSubscribers))
		for subscriber in classesSubscribers:
			 await subscriber.send(response)
	
	

