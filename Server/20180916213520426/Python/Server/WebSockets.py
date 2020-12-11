#generated automatically
import asyncio
import websockets
import json
from SqlAlchemyMain import session
import ClassRoomWebSockets
import ClasseWebSockets
import TeacherWebSockets
import StudentWebSockets
import StudentClasseWebSockets
import MarkWebSockets
import AbsenteWebSockets
import NotificationWebSockets

users = set()
def connectedSuccessfullyEvent():
	return json.dumps({'table': 'WebSockets', 'operation' : 'connectedSuccessfully'})


async def requestReceived(websocket, path):
	users.add(websocket)
	websocket.authenticated = False
	try:
		await websocket.send(connectedSuccessfullyEvent())
		print('client connected')
		async for requestJson in websocket:
			request = json.loads(requestJson)
			print(request)
			if request['table'] == 'ClassRooms':
				await ClassRoomWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Classes':
				await ClasseWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Teachers':
				await TeacherWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Students':
				await StudentWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'StudentClasses':
				await StudentClasseWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Marks':
				await MarkWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Absente':
				await AbsenteWebSockets.requestReceived(websocket, session, request)
			elif request['table'] == 'Notifications':
				await NotificationWebSockets.requestReceived(websocket, session, request)
	
	finally:
		print('client disconnected')
		users.remove(websocket)
	

start_server = websockets.serve(requestReceived, 'localhost', 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
