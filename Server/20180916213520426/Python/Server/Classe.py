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
from Teacher import Teacher, getTeachers, getTeachersByTeacherId
class Classe(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Classes'
	#Fields
	classeId = Column('ClasseId', Integer, primary_key=True)
	name = Column('Name', String(50))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	teacherId = Column('TeacherId', Integer, ForeignKey("Teachers.TeacherId"))
	teachers = relationship(Teacher,backref = backref('classes'))
	teacher = null
	classRoomId = Column('ClassRoomId', Integer, ForeignKey("ClassRooms.ClassRoomId"))
	classRooms = relationship(ClassRoom,backref = backref('classes'))
	classRoom = null
	
	
	#Validation
	@validates('teacherId')
	def validate_teacherId(self, key, value):
		return validate_integer(key, value, True)
	@validates('classRoomId')
	def validate_classRoomId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete teachers funtion
def completeTeachers(session, classes):
	teachers = getTeachers(session)
	for row in classes:
		start = 0
		end = len(teachers)
		while True:
			mid = floor((start + end) / 2)
			if(row.teacherId > teachers[mid].teacherId):
				start = mid + 1
			elif(row.teacherId < teachers[mid].teacherId):
				end = mid - 1
			elif(row.teacherId == teachers[mid].teacherId):
				start = mid + 1
				end = mid - 1
				row.teacher = teachers[mid]
			
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
	result = completeTeachers(session, result)
	result = completeClassRooms(session, result)
	return result


#get dedicated request funtions
def getClassesByClassRoomId(session, classRoomId):
	result = session.query(Classe).filter(Classe.classRoomId == classRoomId).all()
	result = completeTeachers(session, result)
	result = completeClassRooms(session, result)
	return result

def getClassesByClasseId(session, classeId):
	result = session.query(Classe).filter(Classe.classeId == classeId).all()
	result = completeTeachers(session, result)
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
	classe.teacher = getTeachersByTeacherId(session, classe.teacherId)[0]
	return classe


#update funtion
def updateClasse(session, classe):
	result = session.query(Classe).filter(Classe.classeId == classe.classeId).first()
	result = classe
	session.commit()
	result = session.query(Classe).filter(Classe.classeId == classe.classeId).first()
	result.classRoom = getClassRoomsByClassRoomId(session, result.classRoomId)[0]
	result.teacher = getTeachersByTeacherId(session, result.teacherId)[0]
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
	parser.add_argument('teacherId')
	parser.add_argument('classRoomId')
	parser.add_argument('name')
	return parser



