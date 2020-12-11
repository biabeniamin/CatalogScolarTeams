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
class Mark(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Marks'
	#Fields
	markId = Column('MarkId', Integer, primary_key=True)
	value = Column('Value', Integer)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	classeId = Column('ClasseId', Integer, ForeignKey("Classes.ClasseId"))
	classes = relationship(Classe,backref = backref('marks'))
	classe = null
	studentId = Column('StudentId', Integer, ForeignKey("Students.StudentId"))
	students = relationship(Student,backref = backref('marks'))
	student = null
	teacherId = Column('TeacherId', Integer, ForeignKey("Teachers.TeacherId"))
	teachers = relationship(Teacher,backref = backref('marks'))
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
	@validates('value')
	def validate_value(self, key, value):
		return validate_integer(key, value, False)
	

#Functions
#complete classes funtion
def completeClasses(session, marks):
	classes = getClasses(session)
	for row in marks:
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
	
	return marks

#complete students funtion
def completeStudents(session, marks):
	students = getStudents(session)
	for row in marks:
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
	
	return marks

#complete teachers funtion
def completeTeachers(session, marks):
	teachers = getTeachers(session)
	for row in marks:
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
	
	return marks


#get funtion
def getMarks(session):
	result = session.query(Mark).all()
	result = completeClasses(session, result)
	result = completeStudents(session, result)
	result = completeTeachers(session, result)
	return result


#get dedicated request funtions
def getMarksByClasseIdStudentId(session, classeId, studentId):
	result = session.query(Mark).filter(Mark.classeId == classeId, Mark.studentId == studentId).all()
	result = completeClasses(session, result)
	result = completeStudents(session, result)
	result = completeTeachers(session, result)
	return result

def getMarksByMarkId(session, markId):
	result = session.query(Mark).filter(Mark.markId == markId).all()
	result = completeClasses(session, result)
	result = completeStudents(session, result)
	result = completeTeachers(session, result)
	return result


#add funtion
def addMark(session, mark):
	mark.creationTime = datetime.datetime.utcnow()
	session.add(mark)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with markId=', mark.markId)
	mark.teacher = getTeachersByTeacherId(session, mark.teacherId)[0]
	mark.student = getStudentsByStudentId(session, mark.studentId)[0]
	mark.classe = getClassesByClasseId(session, mark.classeId)[0]
	return mark


#update funtion
def updateMark(session, mark):
	result = session.query(Mark).filter(Mark.markId == mark.markId).first()
	result = mark
	session.commit()
	result = session.query(Mark).filter(Mark.markId == mark.markId).first()
	result.teacher = getTeachersByTeacherId(session, result.teacherId)[0]
	result.student = getStudentsByStudentId(session, result.studentId)[0]
	result.classe = getClassesByClasseId(session, result.classeId)[0]
	return result


#delete funtion
def deleteMark(session, markId):
	result = session.query(Mark).filter(Mark.markId == markId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getmarkRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('classeId')
	parser.add_argument('studentId')
	parser.add_argument('teacherId')
	parser.add_argument('value')
	return parser



