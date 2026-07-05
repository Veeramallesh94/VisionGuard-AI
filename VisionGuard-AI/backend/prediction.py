"""
prediction.py
---------------
This file connects everything together:
  1. Takes a raw uploaded image
  2. Preprocesses it (resize, CLAHE, normalize)
  3. Sends it to the EfficientNet-B4 model (real or dummy)
  4. Returns a clean, easy-to-read result for the frontend
"""

import torch
from PIL import Image
import io

from utils.preprocessing import preprocess_image
from model.model_loader import dr_model, CLASS_NAMES

# Simple, beginner-friendly recommendation text for each DR grade.
# NOTE: This is NOT medical advice — it's placeholder guidance text
# meant to demonstrate the feature. Always consult a real doctor.
RECOMMENDATIONS = {
    0: "No signs of Diabetic Retinopathy detected. Continue annual eye check-ups.",
    1: "Mild DR detected. Schedule a follow-up with an eye specialist within 6-12 months.",
    2: "Moderate DR detected. Please consult an ophthalmologist within the next few months.",
    3: "Severe DR detected. Prompt consultation with a retina specialist is strongly advised.",
    4: "Proliferative DR detected. This is an advanced stage — seek immediate medical attention.",
}


def run_prediction(image_bytes: bytes) -> dict:
    """
    Main prediction function called by the FastAPI /predict endpoint.

    Args:
        image_bytes: raw bytes of the uploaded retinal image

    Returns:
        A dictionary containing grade, disease name, confidence score,
        recommendation text, and the full probability breakdown.
    """
    # Step 1: Open the image using PIL
    pil_image = Image.open(io.BytesIO(image_bytes))

    # Step 2: Preprocess (resize + CLAHE + normalize)
    processed_array = preprocess_image(pil_image)

    # Step 3: Convert numpy array -> PyTorch tensor with a batch dimension
    input_tensor = torch.tensor(processed_array, dtype=torch.float32).unsqueeze(0)

    # Step 4: Run the model (real EfficientNet-B4 or dummy fallback)
    grade, confidence, probabilities = dr_model.predict(input_tensor)

    # Step 5: Package a clean, readable response
    result = {
        "grade": grade,
        "disease_name": CLASS_NAMES[grade],
        "confidence": confidence,
        "recommendation": RECOMMENDATIONS[grade],
        "probabilities": {
            CLASS_NAMES[i]: probabilities[i] for i in range(5)
        },
        "is_dummy_model": dr_model.dummy_mode,
    }

    return result
