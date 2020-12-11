#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Absente
absenteSubscribers = set()
async def requestReceived(websocket, session, request):
	global absenteSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		absente = Absente.getAbsente(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Absente', 'data' : absente})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		absente = Absente.getAbsente(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Absente', 'data' : absente})
		absenteSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['teacherId', 'date']) == False:
			print('Not all parameters were provided for ADD in Absente')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		absente = dict_as_obj(request['data'], Absente.Absente(), ['absenteId', 'creationTime'])
		absente = Absente.addAbsente(session, absente)
		response = convertToJson({'operation' : 'add', 'table' : 'Absente', 'data' : absente})
		absenteSubscribers = set(filter(removeClosedConnection, absenteSubscribers))
		for subscriber in absenteSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['absenteId']) == False:
			print('Not all parameters were provided for UPDATE in Absente')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		absente = Absente.getAbsenteByAbsenteId(session, data['absenteId'])[0]
		absente = dict_as_obj(data, absente)
		absente = Absente.updateAbsente(session, absente)
		response = convertToJson({'operation' : 'update', 'table' : 'Absente', 'data' : absente})
		absenteSubscribers = set(filter(removeClosedConnection, absenteSubscribers))
		for subscriber in absenteSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['absenteId']) == False:
			print('Not all parameters were provided for DELETE in Absente')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		absente = Absente.deleteAbsente(session, request['data']['absenteId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Absente', 'data' : absente})
		absenteSubscribers = set(filter(removeClosedConnection, absenteSubscribers))
		for subscriber in absenteSubscribers:
			 await subscriber.send(response)
	
	

