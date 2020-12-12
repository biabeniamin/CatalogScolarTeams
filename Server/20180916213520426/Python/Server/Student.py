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
class Student(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Students'
	#Fields
	studentId = Column('StudentId', Integer, primary_key=True)
	name = Column('Name', String(50))
	email = Column('Email', String(30))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	
	
	#Validation
	

#Functions

#get funtion
def getStudents(session):
	result = session.query(Student).all()
	return result


#get dedicated request funtions
def getStudentsByStudentId(session, studentId):
	result = session.query(Student).filter(Student.studentId == studentId).all()
	return result


#add funtion
def addStudent(session, student):
	student.creationTime = datetime.datetime.utcnow()
	session.add(student)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with studentId=', student.studentId)
	return student


#update funtion
def updateStudent(session, student):
	result = session.query(Student).filter(Student.studentId == student.studentId).first()
	result = student
	session.commit()
	result = session.query(Student).filter(Student.studentId == student.studentId).first()
	return result


#delete funtion
def deleteStudent(session, studentId):
	result = session.query(Student).filter(Student.studentId == studentId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getstudentRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('name')
	parser.add_argument('email')
	return parser



