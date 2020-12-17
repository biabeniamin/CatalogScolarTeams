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
from TokenUser import TokenUser, getTokenUsers, getTokenUsersByTokenUserId
class Token(Base):
	@declared_attr
	def __tablename__(cls):
		return 'Tokens'
	#Fields
	tokenId = Column('TokenId', Integer, primary_key=True)
	value = Column('Value', String(40))
	address = Column('Address', String(15))
	lastUpdate = Column('LastUpdate', DateTime)
	creationTime = Column('CreationTime', DateTime, default=datetime.datetime.utcnow)
	#Foreign Fields
	tokenUserId = Column('TokenUserId', Integer, ForeignKey("TokenUsers.TokenUserId"))
	tokenUsers = relationship(TokenUser,backref = backref('tokens'))
	tokenUser = null
	
	
	#Validation
	@validates('tokenUserId')
	def validate_tokenUserId(self, key, value):
		return validate_integer(key, value, True)
	

#Functions
#complete tokenUsers funtion
def completeTokenUsers(session, tokens):
	tokenUsers = getTokenUsers(session)
	for row in tokens:
		start = 0
		end = len(tokenUsers)
		while True:
			mid = floor((start + end) / 2)
			if(row.tokenUserId > tokenUsers[mid].tokenUserId):
				start = mid + 1
			elif(row.tokenUserId < tokenUsers[mid].tokenUserId):
				end = mid - 1
			elif(row.tokenUserId == tokenUsers[mid].tokenUserId):
				start = mid + 1
				end = mid - 1
				row.tokenUser = tokenUsers[mid]
			
			if(start > end):
				break
	
	return tokens


#get funtion
def getTokens(session):
	result = session.query(Token).all()
	result = completeTokenUsers(session, result)
	return result


#get dedicated request funtions
def getTokensByValue(session, value):
	result = session.query(Token).filter(Token.value == value).all()
	result = completeTokenUsers(session, result)
	return result

def getTokensByTokenId(session, tokenId):
	result = session.query(Token).filter(Token.tokenId == tokenId).all()
	result = completeTokenUsers(session, result)
	return result


#add funtion
def addToken(session, token):
	token.creationTime = datetime.datetime.utcnow()
	session.add(token)
	session.commit()
	#this must stay because sqlalchemy query the database because of this line
	print('Value inserted with tokenId=', token.tokenId)
	token.tokenUser = getTokenUsersByTokenUserId(session, token.tokenUserId)[0]
	return token


#update funtion
def updateToken(session, token):
	result = session.query(Token).filter(Token.tokenId == token.tokenId).first()
	result = token
	session.commit()
	result = session.query(Token).filter(Token.tokenId == token.tokenId).first()
	result.tokenUser = getTokenUsersByTokenUserId(session, result.tokenUserId)[0]
	return result


#delete funtion
def deleteToken(session, tokenId):
	result = session.query(Token).filter(Token.tokenId == tokenId).first()
	session.delete(result)
	session.commit()
	return result



#API endpoints
#request parser funtion
def gettokenRequestArguments():
	parser = reqparse.RequestParser()
	parser.add_argument('tokenUserId')
	parser.add_argument('value')
	parser.add_argument('address')
	parser.add_argument('lastUpdate')
	return parser



