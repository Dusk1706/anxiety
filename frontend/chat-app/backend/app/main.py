from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.chat import ChatMessage
from app.services.llm_service import generate_response
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    user_id: str
    message: str

class MessageResponse(BaseModel):
    user_id: str
    message: str
    response: str

@app.post("/chat", response_model=MessageResponse)
async def chat(message_request: MessageRequest):
    response_text = await generate_response(message_request.message)
    return MessageResponse(
        user_id=message_request.user_id,
        message=message_request.message,
        response=response_text
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=11435)