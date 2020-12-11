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
from Teacher import Teacher, getTeachers, getTeachersByTeacherId
from Student import Student, getStudents, getStudentsByStudentId
from Classe import Classe, getClasses, getClassesByClasseId
class Absente(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Absente'
	#Fields
	absenteId = Column('AbsenteId', Integer, primary_key=True)
	date = Column('Date', DateTime)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	classeId = Column('ClasseId', Integer, ForeignKey("Classes.ClasseId"))
	classes = relationship(Classe,backref = backref('absente'))
	classe = null
	studentId = Column('StudentId', Integer, ForeignKey("Students.StudentId"))
	students = relationship(Student,backref = backref('absente'))
	student = null
	teacherId = Column('TeacherId', Integer, ForeignKey("Teachers.TeacherId"))
	teachers = relationship(Teacher,backref = backref('absente'))
	teacher = null
	
	
	#Validation
	@validates('classeId')
	def validate_classeId(self, key, value):
		return validate_integer(key, value, True)
	@validates('studentId')
	def validate_studentId(self, key, value):
		return validate_integer(key, value, True)
	@validates('teacherId')
	def validate_teacherId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete classes funtion
def completeClasses(session, absente):
	classes = getClasses(session)
	for row in absente:
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
	
	return absente

#complete students funtion
def completeStudents(session, absente):
	students = getStudents(session)
	for row in absente:
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
	
	return absente

#complete teachers funtion
def completeTeachers(session, absente):
	teachers = getTeachers(session)
	for row in absente:
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
	
	return absente


#get funtion
def getAbsente(session):
	result = session.query(Absente).all()
	result = completeClasses(session, result)
	result = completeStudents(session, result)
	result = completeTeachers(session, result)
	return result


#get dedicated request funtions
def getAbsenteByAbsenteId(session, absenteId):
	result = session.query(Absente).filter(Absente.absenteId == absenteId).all()
	result = completeClasses(session, result)
	result = completeStudents(session, result)
	result = completeTeachers(session, result)
	return result


#add funtion
def addAbsente(session, absente):
	absente.creationTime = datetime.datetime.utcnow()
	session.add(absente)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with absenteId=', absente.absenteId)
	absente.teacher = getTeachersByTeacherId(session, absente.teacherId)[0]
	absente.student = getStudentsByStudentId(session, absente.studentId)[0]
	absente.classe = getClassesByClasseId(session, absente.classeId)[0]
	return absente


#update funtion
def updateAbsente(session, absente):
	result = session.query(Absente).filter(Absente.absenteId == absente.absenteId).first()
	result = absente
	session.commit()
	result = session.query(Absente).filter(Absente.absenteId == absente.absenteId).first()
	result.teacher = getTeachersByTeacherId(session, result.teacherId)[0]
	result.student = getStudentsByStudentId(session, result.studentId)[0]
	result.classe = getClassesByClasseId(session, result.classeId)[0]
	return result


#delete funtion
def deleteAbsente(session, absenteId):
	result = session.query(Absente).filter(Absente.absenteId == absenteId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getabsenteRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('classeId')
	parser.add_argument('studentId')
	parser.add_argument('teacherId')
	parser.add_argument('date')
	return parser



