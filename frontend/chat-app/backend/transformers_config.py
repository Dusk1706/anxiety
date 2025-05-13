from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_NAME = "gpt2"  # Replace with your model name or path

# Load the model and tokenizer
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# Configuration settings
MAX_LENGTH = 100  # Maximum length of generated responses
TEMPERATURE = 0.7  # Controls randomness in the output
TOP_K = 50  # Limits the number of highest probability vocabulary tokens to keep for top-k sampling
TOP_P = 0.95  # Nucleus sampling parameter

def get_model():
    return model, tokenizer

def get_config():
    return {
        "max_length": MAX_LENGTH,
        "temperature": TEMPERATURE,
        "top_k": TOP_K,
        "top_p": TOP_P,
    }