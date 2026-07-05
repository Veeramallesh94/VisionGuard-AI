"""
model_loader.py
-----------------
This file defines and loads the EfficientNet-B4 deep learning model
used to classify Diabetic Retinopathy (DR) severity.

IMPORTANT FOR BEGINNERS:
- Training a real EfficientNet-B4 model on the APTOS 2019 dataset takes
  a GPU, many hours, and a few GB of data that are NOT included here.
- So this project ships with the REAL model architecture wired up and
  ready to go, but if no trained weight file is found on disk, it
  automatically falls back to a "dummy mode" that still returns
  realistic-looking predictions so you can build/demo the full app today.
- Later, drop your trained weights file at:
      backend/model/dr_efficientnet_b4.pth
  and the app will automatically start using your real trained model.
  No other code changes needed.
"""

import os
import torch
import torch.nn as nn

try:
    from torchvision.models import efficientnet_b4, EfficientNet_B4_Weights
    TORCHVISION_AVAILABLE = True
except Exception:
    TORCHVISION_AVAILABLE = False

# Path where a real trained model's weights would be placed
WEIGHTS_PATH = os.path.join(os.path.dirname(__file__), "dr_efficientnet_b4.pth")

# Diabetic Retinopathy has 5 severity classes (APTOS 2019 dataset)
NUM_CLASSES = 5

CLASS_NAMES = {
    0: "No DR",
    1: "Mild DR",
    2: "Moderate DR",
    3: "Severe DR",
    4: "Proliferative DR",
}


def build_model() -> nn.Module:
    """
    Build the EfficientNet-B4 architecture with a final layer
    changed to output 5 classes instead of ImageNet's 1000 classes.
    """
    model = efficientnet_b4(weights=None)  # architecture only, no pretrained weights here
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, NUM_CLASSES)
    return model


class DRModel:
    """
    Wrapper class around the EfficientNet-B4 model.

    - If trained weights exist on disk -> uses the REAL model for prediction.
    - If not -> runs in DUMMY MODE, returning simulated (but realistic)
      predictions so the rest of the app (frontend, API, dashboard) can be
      fully built and demoed without waiting for model training.
    """

    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.dummy_mode = True
        self.model = None

        if TORCHVISION_AVAILABLE and os.path.exists(WEIGHTS_PATH):
            try:
                self.model = build_model()
                state_dict = torch.load(WEIGHTS_PATH, map_location=self.device)
                self.model.load_state_dict(state_dict)
                self.model.to(self.device)
                self.model.eval()
                self.dummy_mode = False
                print("[VisionGuard AI] Real trained EfficientNet-B4 model loaded.")
            except Exception as e:
                print(f"[VisionGuard AI] Could not load trained weights, using dummy mode. Reason: {e}")
        else:
            print("[VisionGuard AI] No trained weights found -> running in DUMMY MODE.")
            print(f"[VisionGuard AI] To use a real model, place weights at: {WEIGHTS_PATH}")

    def predict(self, input_tensor: torch.Tensor):
        """
        Run inference on a preprocessed image tensor.

        Returns:
            grade (int): predicted DR grade (0-4)
            confidence (float): model confidence score (0-100)
            probabilities (list[float]): probability for each of the 5 classes
        """
        if self.dummy_mode:
            return self._dummy_predict()

        with torch.no_grad():
            input_tensor = input_tensor.to(self.device)
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)[0]
            grade = int(torch.argmax(probabilities).item())
            confidence = float(probabilities[grade].item() * 100)
            return grade, round(confidence, 2), [round(p.item() * 100, 2) for p in probabilities]

    def _dummy_predict(self):
        """
        Generates a realistic-looking dummy prediction.
        This lets the whole application (UI, API, dashboard) work
        end-to-end before a real trained model is available.
        """
        import random

        grade = random.choices(
            population=[0, 1, 2, 3, 4],
            weights=[35, 25, 20, 12, 8],  # No-DR is most common, matches real-world distribution
            k=1,
        )[0]

        # Build probabilities that peak around the chosen grade
        probs = [0.0] * 5
        probs[grade] = random.uniform(0.70, 0.95)
        remaining = 1 - probs[grade]
        other_indices = [i for i in range(5) if i != grade]
        for idx in other_indices[:-1]:
            share = random.uniform(0, remaining)
            probs[idx] = share
            remaining -= share
        probs[other_indices[-1]] = max(remaining, 0)

        confidence = round(probs[grade] * 100, 2)
        probabilities = [round(p * 100, 2) for p in probs]
        return grade, confidence, probabilities


# Create a single shared model instance when the server starts
dr_model = DRModel()
