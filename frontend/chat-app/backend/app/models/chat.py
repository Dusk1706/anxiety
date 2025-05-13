from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ChatMessage(Base):
    __tablename__ = 'chat_messages'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    message = Column(Text, nullable=False)
    timestamp = Column(String, nullable=False)

    def __repr__(self):
        return f"<ChatMessage(id={self.id}, user_id={self.user_id}, message={self.message}, timestamp={self.timestamp})>"