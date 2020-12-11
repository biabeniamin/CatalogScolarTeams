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
from Classe import Classe, getClasses, getClassesByClasseId
from Student import Student, getStudents, getStudentsByStudentId
class StudentClasse(Base):
	@declared_attr
	def __tablename__(cls):
		return 'StudentClasses'
	#Fields
	studentClasseId = Column('StudentClasseId', Integer, primary_key=True)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	studentId = Column('StudentId', Integer, ForeignKey("Students.StudentId"))
	students = relationship(Student,backref = backref('studentClasses'))
	student = null
	classeId = Column('ClasseId', Integer, ForeignKey("Classes.ClasseId"))
	classes = relationship(Classe,backref = backref('studentClasses'))
	classe = null
	
	
	#Validation
	@validates('studentId')
	def validate_studentId(self, key, value):
		return validate_integer(key, value, True)
	@validates('classeId')
	def validate_classeId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete students funtion
def completeStudents(session, studentClasses):
	students = getStudents(session)
	for row in studentClasses:
		start = 0
		end = len(students)
		while True:
			mid = floor((start + end) / 2)
			if(row.studentId > students[mid].studentId):
				start = mid + 1
			elif(row.studentId < students[mid].studentId):
				end = mid - 1
			elif(row.studentId == students[mid].studentId):
				start = mid + 1
				end = mid - 1
				row.student = students[mid]
			
			if(start > end):
				break
	
	return studentClasses

#complete classes funtion
def completeClasses(session, studentClasses):
	classes = getClasses(session)
	for row in studentClasses:
		start = 0
		end = len(classes)
		while True:
			mid = floor((start + end) / 2)
			if(row.classeId > classes[mid].classeId):
				start = mid + 1
			elif(row.classeId < classes[mid].classeId):
				end = mid - 1
			elif(row.classeId == classes[mid].classeId):
				start = mid + 1
				end = mid - 1
				row.classe = classes[mid]
			
			if(start > end):
				break
	
	return studentClasses


#get funtion
def getStudentClasses(session):
	result = session.query(StudentClasse).all()
	result = completeStudents(session, result)
	result = completeClasses(session, result)
	return result


#get dedicated request funtions
def getStudentClassesByStudentClasseId(session, studentClasseId):
	result = session.query(StudentClasse).filter(StudentClasse.studentClasseId == studentClasseId).all()
	result = completeStudents(session, result)
	result = completeClasses(session, result)
	return result


#add funtion
def addStudentClasse(session, studentClasse):
	studentClasse.creationTime = datetime.datetime.utcnow()
	session.add(studentClasse)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with studentClasseId=', studentClasse.studentClasseId)
	studentClasse.classe = getClassesByClasseId(session, studentClasse.classeId)[0]
	studentClasse.student = getStudentsByStudentId(session, studentClasse.studentId)[0]
	return studentClasse


#update funtion
def updateStudentClasse(session, studentClasse):
	result = session.query(StudentClasse).filter(StudentClasse.studentClasseId == studentClasse.studentClasseId).first()
	result = studentClasse
	session.commit()
	result = session.query(StudentClasse).filter(StudentClasse.studentClasseId == studentClasse.studentClasseId).first()
	result.classe = getClassesByClasseId(session, result.classeId)[0]
	result.student = getStudentsByStudentId(session, result.studentId)[0]
	return result


#delete funtion
def deleteStudentClasse(session, studentClasseId):
	result = session.query(StudentClasse).filter(StudentClasse.studentClasseId == studentClasseId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getstudentClasseRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('studentId')
	parser.add_argument('classeId')
	return parser



