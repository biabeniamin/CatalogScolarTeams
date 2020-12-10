#generated automatically
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import validates
from SqlAlchemy import Base
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import *
from sqlalchemy.dialects.mysql import DOUBLE
from ValidationError import ValidationError, validate_integer
from flask_restful import reqparse
import datetime
from math import floor
from ClassRoom import ClassRoom, getClassRooms, getClassRoomsByClassRoomId
from User import User, getUsers, getUsersByUserId
class Classe(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Classes'
	#Fields
	classeId = Column('ClasseId', Integer, primary_key=True)
	name = Column('Name', String(50))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	userId = Column('UserId', Integer, ForeignKey("Users.UserId"))
	users = relationship(User,backref = backref('classes'))
	user = null
	classRoomId = Column('ClassRoomId', Integer, ForeignKey("ClassRooms.ClassRoomId"))
	classRooms = relationship(ClassRoom,backref = backref('classes'))
	classRoom = null
	
	
	#Validation
	@validates('userId')
	def validate_userId(self, key, value):
		return validate_integer(key, value, True)
	@validates('classRoomId')
	def validate_classRoomId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete users funtion
def completeUsers(session, classes):
	users = getUsers(session)
	for row in classes:
		start = 0
		end = len(users)
		while True:
			mid = floor((start + end) / 2)
			if(row.userId > users[mid].userId):
				start = mid + 1
			elif(row.userId < users[mid].userId):
				end = mid - 1
			elif(row.userId == users[mid].userId):
				start = mid + 1
				end = mid - 1
				row.user = users[mid]
			
			if(start > end):
				break
	
	return classes

#complete classRooms funtion
def completeClassRooms(session, classes):
	classRooms = getClassRooms(session)
	for row in classes:
		start = 0
		end = len(classRooms)
		while True:
			mid = floor((start + end) / 2)
			if(row.classRoomId > classRooms[mid].classRoomId):
				start = mid + 1
			elif(row.classRoomId < classRooms[mid].classRoomId):
				end = mid - 1
			elif(row.classRoomId == classRooms[mid].classRoomId):
				start = mid + 1
				end = mid - 1
				row.classRoom = classRooms[mid]
			
			if(start > end):
				break
	
	return classes


#get funtion
def getClasses(session):
	result = session.query(Classe).all()
	result = completeUsers(session, result)
	result = completeClassRooms(session, result)
	return result


#get dedicated request funtions
def getClassesByClasseId(session, classeId):
	result = session.query(Classe).filter(Classe.classeId == classeId).all()
	result = completeUsers(session, result)
	result = completeClassRooms(session, result)
	return result


#add funtion
def addClasse(session, classe):
	classe.creationTime = datetime.datetime.utcnow()
	session.add(classe)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with classeId=', classe.classeId)
	classe.classRoom = getClassRoomsByClassRoomId(session, classe.classRoomId)[0]
	classe.user = getUsersByUserId(session, classe.userId)[0]
	return classe


#update funtion
def updateClasse(session, classe):
	result = session.query(Classe).filter(Classe.classeId == classe.classeId).first()
	result = classe
	session.commit()
	result = session.query(Classe).filter(Classe.classeId == classe.classeId).first()
	result.classRoom = getClassRoomsByClassRoomId(session, result.classRoomId)[0]
	result.user = getUsersByUserId(session, result.userId)[0]
	return result


#delete funtion
def deleteClasse(session, classeId):
	result = session.query(Classe).filter(Classe.classeId == classeId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getclasseRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('userId')
	parser.add_argument('classRoomId')
	parser.add_argument('name')
	return parser



