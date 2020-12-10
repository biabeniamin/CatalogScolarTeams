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
class ClassRoom(Base):
	@declared_attr
	def __tablename__(cls):
		return 'ClassRooms'
	#Fields
	classRoomId = Column('ClassRoomId', Integer, primary_key=True)
	name = Column('Name', String(50))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	
	
	#Validation
	

#Functions

#get funtion
def getClassRooms(session):
	result = session.query(ClassRoom).all()
	return result


#get dedicated request funtions
def getClassRoomsByClassRoomId(session, classRoomId):
	result = session.query(ClassRoom).filter(ClassRoom.classRoomId == classRoomId).all()
	return result


#add funtion
def addClassRoom(session, classRoom):
	classRoom.creationTime = datetime.datetime.utcnow()
	session.add(classRoom)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with classRoomId=', classRoom.classRoomId)
	return classRoom


#update funtion
def updateClassRoom(session, classRoom):
	result = session.query(ClassRoom).filter(ClassRoom.classRoomId == classRoom.classRoomId).first()
	result = classRoom
	session.commit()
	result = session.query(ClassRoom).filter(ClassRoom.classRoomId == classRoom.classRoomId).first()
	return result


#delete funtion
def deleteClassRoom(session, classRoomId):
	result = session.query(ClassRoom).filter(ClassRoom.classRoomId == classRoomId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getclassRoomRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('name')
	return parser



