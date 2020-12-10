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
class User(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Users'
	#Fields
	userId = Column('UserId', Integer, primary_key=True)
	firstName = Column('FirstName', String(30))
	lastName = Column('LastName', String(30))
	email = Column('Email', String(30))
	type = Column('Type', Integer)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	
	
	#Validation
	@validates('type')
	def validate_type(self, key, value):
		return validate_integer(key, value, False)
	

#Functions

#get funtion
def getUsers(session):
	result = session.query(User).all()
	return result


#get dedicated request funtions
def getUsersByUserId(session, userId):
	result = session.query(User).filter(User.userId == userId).all()
	return result


#add funtion
def addUser(session, user):
	user.creationTime = datetime.datetime.utcnow()
	session.add(user)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with userId=', user.userId)
	return user


#update funtion
def updateUser(session, user):
	result = session.query(User).filter(User.userId == user.userId).first()
	result = user
	session.commit()
	result = session.query(User).filter(User.userId == user.userId).first()
	return result


#delete funtion
def deleteUser(session, userId):
	result = session.query(User).filter(User.userId == userId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def getuserRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('firstName')
	parser.add_argument('lastName')
	parser.add_argument('email')
	parser.add_argument('type')
	return parser



