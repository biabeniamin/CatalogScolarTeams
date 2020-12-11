#generated automatically
from SqlAlchemy import convertToJson, dict_as_obj
from WebSocketsHelpers import checkArguments, removeClosedConnection
import Mark
marksSubscribers = set()
async def requestReceived(websocket, session, request):
	global marksSubscribers
	#Websockets endpoints
	if request['operation'] == 'get':
		#get endpoint
		marks = Mark.getMarks(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Marks', 'data' : marks})
		await websocket.send(response)
	
	elif request['operation'] == 'subscribe':
		#subscription endpoint
		marks = Mark.getMarks(session)
		response = convertToJson({'operation' : 'get', 'table' : 'Marks', 'data' : marks})
		marksSubscribers.add(websocket)
		await websocket.send(response)
	
	elif request['operation'] == 'add':
		#add endpoint
		if checkArguments(request, ['classeId', 'studentId', 'teacherId', 'value']) == False:
			print('Not all parameters were provided for ADD in Marks')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		mark = dict_as_obj(request['data'], Mark.Mark(), ['markId', 'creationTime'])
		mark = Mark.addMark(session, mark)
		response = convertToJson({'operation' : 'add', 'table' : 'Marks', 'data' : mark})
		marksSubscribers = set(filter(removeClosedConnection, marksSubscribers))
		for subscriber in marksSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'update':
		#update endpoint
		if checkArguments(request, ['markId']) == False:
			print('Not all parameters were provided for UPDATE in Marks')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		data = request['data']
		mark = Mark.getMarksByMarkId(session, data['markId'])[0]
		mark = dict_as_obj(data, mark)
		mark = Mark.updateMark(session, mark)
		response = convertToJson({'operation' : 'update', 'table' : 'Marks', 'data' : mark})
		marksSubscribers = set(filter(removeClosedConnection, marksSubscribers))
		for subscriber in marksSubscribers:
			 await subscriber.send(response)
	
	elif request['operation'] == 'delete':
		#delete endpoint
		if checkArguments(request, ['markId']) == False:
			print('Not all parameters were provided for DELETE in Marks')
			await websocket.send(convertToJson({'error' : 'Invalid request'}))
			return
		mark = Mark.deleteMark(session, request['data']['markId'])
		response = convertToJson({'operation' : 'delete', 'table' : 'Marks', 'data' : mark})
		marksSubscribers = set(filter(removeClosedConnection, marksSubscribers))
		for subscriber in marksSubscribers:
			 await subscriber.send(response)
	
	

