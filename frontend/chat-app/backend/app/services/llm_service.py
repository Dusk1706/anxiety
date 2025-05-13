from transformers import pipeline

class LLMService:
    def __init__(self):
        self.model = pipeline("text-generation", model="gpt2")  # Replace with your local model

    def generate_response(self, prompt: str) -> str:
        response = self.model(prompt, max_length=150, num_return_sequences=1)
        return response[0]['generated_text']

llm_service = LLMService()