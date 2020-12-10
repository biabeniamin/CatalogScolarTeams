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
class Mark(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Marks'
	#Fields
	markId = Column('MarkId', Integer, primary_key=True)
	value = Column('Value', Integer)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	userId = Column('UserId', Integer, ForeignKey("Users.UserId"))
	users = relationship(User,backref = backref('marks'))
	user = null
	
	
	#Validation
	@validates('userId')
	def validate_userId(self, key, value):
		return validate_integer(key, value, True)
	@validates('value')
	def validate_value(self, key, value):
		return validate_integer(key, value, False)
	

#Functions
#complete users funtion
def completeUsers(session, marks):
	users = getUsers(session)
	for row in marks:
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
	
	return marks


#get funtion
def getMarks(session):
	result = session.query(Mark).all()
	result = completeUsers(session, result)
	return result


#get dedicated request funtions
def getMarksByMarkId(session, markId):
	result = session.query(Mark).filter(Mark.markId == markId).all()
	result = completeUsers(session, result)
	return result


#add funtion
def addMark(session, mark):
	mark.creationTime = datetime.datetime.utcnow()
	session.add(mark)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with markId=', mark.markId)
	mark.user = getUsersByUserId(session, mark.userId)[0]
	return mark


#update funtion
def updateMark(session, mark):
	result = session.query(Mark).filter(Mark.markId == mark.markId).first()
	result = mark
	session.commit()
	result = session.query(Mark).filter(Mark.markId == mark.markId).first()
	result.user = getUsersByUserId(session, result.userId)[0]
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
	parser.add_argument('userId')
	parser.add_argument('value')
	return parser



