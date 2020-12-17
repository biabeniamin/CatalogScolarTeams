#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import TokenUser
tokenUsersSubscribers = set()
async def requestReceived(websocket, session, request):
	global tokenUsersSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		tokenUsers = TokenUser.getTokenUsers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'TokenUsers', 'data' : tokenUsers})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		tokenUsers = TokenUser.getTokenUsers(session)
		response = convertToJson({'operation' : 'get', 'table' : 'TokenUsers', 'data' : tokenUsers})
		tokenUsersSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['username', 'password']) == False:
			print('Not all parameters were provided for ADD in TokenUsers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		tokenUser = dict_as_obj(request['data'], TokenUser.TokenUser(), ['tokenUserId', 'creationTime'])
		tokenUser = TokenUser.addTokenUser(session, tokenUser)
		response = convertToJson({'operation' : 'add', 'table' : 'TokenUsers', 'data' : tokenUser})
		tokenUsersSubscribers = set(filter(removeClosedConnection, tokenUsersSubscribers))
		for subscriber in tokenUsersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['tokenUserId']) == False:
			print('Not all parameters were provided for UPDATE in TokenUsers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		tokenUser = TokenUser.getTokenUsersByTokenUserId(session, data['tokenUserId'])[0]
		tokenUser = dict_as_obj(data, tokenUser)
		tokenUser = TokenUser.updateTokenUser(session, tokenUser)
		response = convertToJson({'operation' : 'update', 'table' : 'TokenUsers', 'data' : tokenUser})
		tokenUsersSubscribers = set(filter(removeClosedConnection, tokenUsersSubscribers))
		for subscriber in tokenUsersSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['tokenUserId']) == False:
			print('Not all parameters were provided for DELETE in TokenUsers')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		tokenUser = TokenUser.deleteTokenUser(session, request['data']['tokenUserId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'TokenUsers', 'data' : tokenUser})
		tokenUsersSubscribers = set(filter(removeClosedConnection, tokenUsersSubscribers))
		for subscriber in tokenUsersSubscribers:
			 await subscriber.send(response)
	
	

