#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Token
tokensSubscribers = set()
async def requestReceived(websocket, session, request):
	global tokensSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		tokens = Token.getTokens(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Tokens', 'data' : tokens})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		tokens = Token.getTokens(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Tokens', 'data' : tokens})
		tokensSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['tokenUserId', 'value', 'address', 'lastUpdate']) == False:
			print('Not all parameters were provided for ADD in Tokens')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		token = dict_as_obj(request['data'], Token.Token(), ['tokenId', 'creationTime'])
		token = Token.addToken(session, token)
		response = convertToJson({'operation' : 'add', 'table' : 'Tokens', 'data' : token})
		tokensSubscribers = set(filter(removeClosedConnection, tokensSubscribers))
		for subscriber in tokensSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['tokenId']) == False:
			print('Not all parameters were provided for UPDATE in Tokens')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		token = Token.getTokensByTokenId(session, data['tokenId'])[0]
		token = dict_as_obj(data, token)
		token = Token.updateToken(session, token)
		response = convertToJson({'operation' : 'update', 'table' : 'Tokens', 'data' : token})
		tokensSubscribers = set(filter(removeClosedConnection, tokensSubscribers))
		for subscriber in tokensSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['tokenId']) == False:
			print('Not all parameters were provided for DELETE in Tokens')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		token = Token.deleteToken(session, request['data']['tokenId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Tokens', 'data' : token})
		tokensSubscribers = set(filter(removeClosedConnection, tokensSubscribers))
		for subscriber in tokensSubscribers:
			 await subscriber.send(response)
	
	

