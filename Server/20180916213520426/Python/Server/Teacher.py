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
class Teacher(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Teachers'
	#Fields
	teacherId = Column('TeacherId', Integer, primary_key=True)
	name = Column('Name', String(50))
	email = Column('Email', String(60))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	
	
	#Validation
	

#Functions

#get funtion
def getTeachers(session):
	result = session.query(Teacher).all()
	return result


#get dedicated request funtions
def getTeachersByEmail(session, email):
	result = session.query(Teacher).filter(Teacher.email == email).all()
	return result

def getTeachersByTeacherId(session, teacherId):
	result = session.query(Teacher).filter(Teacher.teacherId == teacherId).all()
	return result


#add funtion
def addTeacher(session, teacher):
	teacher.creationTime = datetime.datetime.utcnow()
	session.add(teacher)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with teacherId=', teacher.teacherId)
	return teacher


#update funtion
def updateTeacher(session, teacher):
	result = session.query(Teacher).filter(Teacher.teacherId == teacher.teacherId).first()
	result = teacher
	session.commit()
	result = session.query(Teacher).filter(Teacher.teacherId == teacher.teacherId).first()
	return result


#delete funtion
def deleteTeacher(session, teacherId):
	result = session.query(Teacher).filter(Teacher.teacherId == teacherId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getteacherRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('name')
	parser.add_argument('email')
	return parser



