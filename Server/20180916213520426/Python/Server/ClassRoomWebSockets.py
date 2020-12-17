#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import ClassRoom
classRoomsSubscribers = set()
async def requestReceived(websocket, session, request):
	global classRoomsSubscribers
	if websocket.authenticated == False:
		await websocket.send(convertToJson({'operation' : 'tokenError', 'table' : 'TokenAuthentication'}))
		return
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		classRooms = ClassRoom.getClassRooms(session)
		response = convertToJson({'operation' : 'get', 'table' : 'ClassRooms', 'data' : classRooms})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		classRooms = ClassRoom.getClassRooms(session)
		response = convertToJson({'operation' : 'get', 'table' : 'ClassRooms', 'data' : classRooms})
		classRoomsSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['name']) == False:
			print('Not all parameters were provided for ADD in ClassRooms')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		classRoom = dict_as_obj(request['data'], ClassRoom.ClassRoom(), ['classRoomId', 'creationTime'])
		classRoom = ClassRoom.addClassRoom(session, classRoom)
		response = convertToJson({'operation' : 'add', 'table' : 'ClassRooms', 'data' : classRoom})
		classRoomsSubscribers = set(filter(removeClosedConnection, classRoomsSubscribers))
		for subscriber in classRoomsSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['classRoomId']) == False:
			print('Not all parameters were provided for UPDATE in ClassRooms')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		classRoom = ClassRoom.getClassRoomsByClassRoomId(session, data['classRoomId'])[0]
		classRoom = dict_as_obj(data, classRoom)
		classRoom = ClassRoom.updateClassRoom(session, classRoom)
		response = convertToJson({'operation' : 'update', 'table' : 'ClassRooms', 'data' : classRoom})
		classRoomsSubscribers = set(filter(removeClosedConnection, classRoomsSubscribers))
		for subscriber in classRoomsSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['classRoomId']) == False:
			print('Not all parameters were provided for DELETE in ClassRooms')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		classRoom = ClassRoom.deleteClassRoom(session, request['data']['classRoomId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'ClassRooms', 'data' : classRoom})
		classRoomsSubscribers = set(filter(removeClosedConnection, classRoomsSubscribers))
		for subscriber in classRoomsSubscribers:
			 await subscriber.send(response)
	
	

