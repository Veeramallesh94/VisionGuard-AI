"""
preprocessing.py
-----------------
This file prepares a retinal fundus image so that it can be fed into the
EfficientNet-B4 deep learning model.

Steps performed (in order):
1. Read the image and convert it to RGB (some images are uploaded in BGR/other formats)
2. Resize the image to 380x380 (the input size EfficientNet-B4 expects)
3. Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
   -> This makes blood vessels / lesions in the retina more visible,
      which is a very common trick used in Diabetic Retinopathy research.
4. Normalize pixel values (scale 0-255 -> 0-1, then standardize using
   ImageNet mean/std since EfficientNet is pretrained on ImageNet)
5. Convert the final image into a PyTorch-ready tensor shape (C, H, W)

Beginner note:
You do NOT need to fully understand every line to use this project.
Just know: this file turns a normal photo into "model-friendly" numbers.
"""

import cv2
import numpy as np
from PIL import Image

# EfficientNet-B4 default input size
IMAGE_SIZE = 380

# Standard ImageNet normalization values (used because EfficientNet-B4
# is usually pretrained on ImageNet before fine-tuning on APTOS 2019)
MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)


def apply_clahe(image_rgb: np.ndarray) -> np.ndarray:
    """
    Apply CLAHE enhancement to make retinal details (blood vessels,
    hemorrhages, exudates) stand out more clearly.

    CLAHE works on brightness/contrast, so we:
    1. Convert RGB -> LAB color space (L = lightness channel)
    2. Apply CLAHE only on the L channel
    3. Convert back to RGB
    """
    lab = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    enhanced_l = clahe.apply(l_channel)

    merged_lab = cv2.merge((enhanced_l, a_channel, b_channel))
    enhanced_rgb = cv2.cvtColor(merged_lab, cv2.COLOR_LAB2RGB)
    return enhanced_rgb


def preprocess_image(pil_image: Image.Image) -> np.ndarray:
    """
    Full preprocessing pipeline.

    Input : a PIL.Image (as received from the FastAPI upload)
    Output: a numpy array of shape (3, 380, 380), ready to be
            converted into a torch.Tensor before feeding the model.
    """

    # 1. Make sure the image has 3 color channels (RGB)
    image_rgb = np.array(pil_image.convert("RGB"))

    # 2. Resize to the size EfficientNet-B4 expects
    resized = cv2.resize(image_rgb, (IMAGE_SIZE, IMAGE_SIZE), interpolation=cv2.INTER_AREA)

    # 3. Enhance contrast so DR lesions are easier for the model to "see"
    enhanced = apply_clahe(resized)

    # 4. Normalize: scale to 0-1, then standardize using ImageNet mean/std
    normalized = enhanced.astype(np.float32) / 255.0
    normalized = (normalized - MEAN) / STD

    # 5. Convert from HWC (Height, Width, Channel) -> CHW (Channel, Height, Width)
    #    because PyTorch models expect channel-first tensors
    chw_image = np.transpose(normalized, (2, 0, 1))

    return chw_image
