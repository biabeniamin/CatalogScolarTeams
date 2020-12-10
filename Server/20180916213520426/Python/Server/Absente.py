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
from User import User, getUsers, getUsersByUserId
class Absente(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Absente'
	#Fields
	absenteId = Column('AbsenteId', Integer, primary_key=True)
	date = Column('Date', DateTime)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	userId = Column('UserId', Integer, ForeignKey("Users.UserId"))
	users = relationship(User,backref = backref('absente'))
	user = null
	
	
	#Validation
	@validates('userId')
	def validate_userId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete users funtion
def completeUsers(session, absente):
	users = getUsers(session)
	for row in absente:
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
	
	return absente


#get funtion
def getAbsente(session):
	result = session.query(Absente).all()
	result = completeUsers(session, result)
	return result


#get dedicated request funtions
def getAbsenteByAbsenteId(session, absenteId):
	result = session.query(Absente).filter(Absente.absenteId == absenteId).all()
	result = completeUsers(session, result)
	return result


#add funtion
def addAbsente(session, absente):
	absente.creationTime = datetime.datetime.utcnow()
	session.add(absente)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with absenteId=', absente.absenteId)
	absente.user = getUsersByUserId(session, absente.userId)[0]
	return absente


#update funtion
def updateAbsente(session, absente):
	result = session.query(Absente).filter(Absente.absenteId == absente.absenteId).first()
	result = absente
	session.commit()
	result = session.query(Absente).filter(Absente.absenteId == absente.absenteId).first()
	result.user = getUsersByUserId(session, result.userId)[0]
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
	parser.add_argument('userId')
	parser.add_argument('date')
	return parser



