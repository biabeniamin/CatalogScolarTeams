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
class TokenUser(Base):
	@declared_attr
	def __tablename__(cls):
		return 'TokenUsers'
	#Fields
	tokenUserId = Column('TokenUserId', Integer, primary_key=True)
	username = Column('Username', String(40))
	password = Column('Password', String(40))
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	
	
	#Validation
	

#Functions

#get funtion
def getTokenUsers(session):
	result = session.query(TokenUser).all()
	return result


#get dedicated request funtions
def getTokenUsersByUsernamePassword(session, username, password):
	result = session.query(TokenUser).filter(TokenUser.username == username, TokenUser.password == password).all()
	return result

def getTokenUsersByTokenUserId(session, tokenUserId):
	result = session.query(TokenUser).filter(TokenUser.tokenUserId == tokenUserId).all()
	return result


#add funtion
def addTokenUser(session, tokenUser):
	tokenUser.creationTime = datetime.datetime.utcnow()
	session.add(tokenUser)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with tokenUserId=', tokenUser.tokenUserId)
	return tokenUser


#update funtion
def updateTokenUser(session, tokenUser):
	result = session.query(TokenUser).filter(TokenUser.tokenUserId == tokenUser.tokenUserId).first()
	result = tokenUser
	session.commit()
	result = session.query(TokenUser).filter(TokenUser.tokenUserId == tokenUser.tokenUserId).first()
	return result


#delete funtion
def deleteTokenUser(session, tokenUserId):
	result = session.query(TokenUser).filter(TokenUser.tokenUserId == tokenUserId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def gettokenUserRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('username')
	parser.add_argument('password')
	return parser



