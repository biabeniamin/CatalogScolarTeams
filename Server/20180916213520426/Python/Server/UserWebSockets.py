#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import User
usersSubscribers = set()
async def requestReceived(websocket, session, request):
	global usersSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		users = User.getUsers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Users', 'data' : users})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		users = User.getUsers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Users', 'data' : users})
		usersSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['firstName', 'lastName', 'email', 'type']) == False:
			print('Not all parameters were provided for ADD in Users')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		user = dict_as_obj(request['data'], User.User(), ['userId', 'creationTime'])
		user = User.addUser(session, user)
		response = convertToJson({'operation' : 'add', 'table' : 'Users', 'data' : user})
		usersSubscribers = set(filter(removeClosedConnection, usersSubscribers))
		for subscriber in usersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['userId']) == False:
			print('Not all parameters were provided for UPDATE in Users')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		user = User.getUsersByUserId(session, data['userId'])[0]
		user = dict_as_obj(data, user)
		user = User.updateUser(session, user)
		response = convertToJson({'operation' : 'update', 'table' : 'Users', 'data' : user})
		usersSubscribers = set(filter(removeClosedConnection, usersSubscribers))
		for subscriber in usersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['userId']) == False:
			print('Not all parameters were provided for DELETE in Users')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		user = User.deleteUser(session, request['data']['userId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Users', 'data' : user})
		usersSubscribers = set(filter(removeClosedConnection, usersSubscribers))
		for subscriber in usersSubscribers:
			 await subscriber.send(response)
	
	

