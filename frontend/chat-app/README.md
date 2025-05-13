# Chat Application

This project is a chat application that utilizes a local language model (LLM) with Transformers. It consists of a frontend built with React and a backend powered by FastAPI. The application allows users to send and receive messages in real-time.

## Project Structure

```
chat-app
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── dashboard
│   │   │   │   ├── chat
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   └── profile
│   │   │   │       └── page.tsx
│   │   │   ├── api
│   │   │   │   └── chat
│   │   │   │       └── route.ts
│   │   │   ├── components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   └── ChatHistory.tsx
│   │   │   ├── hooks
│   │   │   │   └── useChat.ts
│   │   │   ├── providers
│   │   │   │   ├── AuthProvider.tsx
│   │   │   │   └── ChatProvider.tsx
│   │   │   ├── services
│   │   │   │   └── chatService.ts
│   │   │   ├── types
│   │   │   │   └── chat.ts
│   │   │   ├── utils
│   │   │   │   └── formatters.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── styles
│   │   │   └── globals.css
│   ├── package.json
│   └── tsconfig.json
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models
│   │   │   └── chat.py
│   │   ├── services
│   │   │   └── llm_service.py
│   │   └── utils
│   │       └── text_processing.py
│   ├── requirements.txt
│   └── transformers_config.py
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- Python and pip for the backend

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```
   uvicorn app.main:app --host 127.0.0.1 --port 11435
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the chat application.
- You can send messages in the chat interface, and the local LLM will respond accordingly.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.