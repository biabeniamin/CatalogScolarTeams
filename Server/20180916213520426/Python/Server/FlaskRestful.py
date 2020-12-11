#generated automatically
from flask import Flask, make_response
from flask_restful import Api
from SqlAlchemyMain import createDatabase, session
from SqlAlchemy import convertToJson
from flask_cors import CORS
from ClassRoomEndpoints import ClassRoomEndpoints
from ClasseEndpoints import ClasseEndpoints
from TeacherEndpoints import TeacherEndpoints
from StudentEndpoints import StudentEndpoints
from StudentClasseEndpoints import StudentClasseEndpoints
from MarkEndpoints import MarkEndpoints
from AbsenteEndpoints import AbsenteEndpoints
from NotificationEndpoints import NotificationEndpoints

app = Flask(__name__)
CORS(app)
api = Api(app)
createDatabase()

api.add_resource(ClassRoomEndpoints, '/ClassRooms', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(ClasseEndpoints, '/Classes', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(TeacherEndpoints, '/Teachers', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(StudentEndpoints, '/Students', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(StudentClasseEndpoints, '/StudentClasses', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(MarkEndpoints, '/Marks', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(AbsenteEndpoints, '/Absente', resource_class_kwargs ={ 'session' : session}) 
api.add_resource(NotificationEndpoints, '/Notifications', resource_class_kwargs ={ 'session' : session}) 

@api.representation('application/json')
def output_json(data, code, headers=None):
	print(data)
	resp = make_response(convertToJson(data), code)
	resp.headers.extend(headers or {})
	return resp


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=5000)
