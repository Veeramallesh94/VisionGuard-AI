# VisionGuard AI

**Early Detection of Diabetic Retinopathy Using Deep Learning and Computer Vision**

VisionGuard AI is a full-stack web application that analyzes retinal fundus
photographs and predicts the severity of Diabetic Retinopathy (DR) on a
5-point scale — helping enable earlier screening, especially in areas with
limited access to eye specialists.

> ⚠️ **Disclaimer**: This is an educational / research demo project. It is
> **not** a certified medical device and must never replace diagnosis by a
> licensed ophthalmologist.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Running with Docker](#running-with-docker)
6. [API Reference](#api-reference)
7. [Connecting a Real Trained Model](#connecting-a-real-trained-model)
8. [Disclaimer](#disclaimer)

---

## Features

- Upload a retinal fundus image (JPG/PNG)
- AI-powered DR severity prediction (Grade 0 – Grade 4)
- Result shows: Grade, disease name, confidence score, and recommendation
- Clean, modern dashboard with grade-distribution chart
- Patient history log of all past predictions
- Fully responsive frontend (mobile, tablet, desktop)
- Beginner-friendly, heavily commented code throughout

---

## Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React.js (Vite), Tailwind CSS, Axios, Recharts, React Router |
| Backend   | FastAPI, Python, Uvicorn, Pillow, OpenCV, NumPy |
| AI Model  | EfficientNet-B4 (PyTorch), trained on APTOS 2019 dataset |

---

## Project Structure

```
VisionGuard-AI/
├── frontend/                  # React + Tailwind web app
│   ├── src/
│   │   ├── components/        # Navbar, Footer, UploadBox, ResultCard, HistoryTable
│   │   ├── pages/              # Home, Upload, Result, Dashboard, About
│   │   ├── api/api.js          # Axios calls to the backend
│   │   ├── gradeMeta.js        # Shared DR grade colors/labels
│   │   ├── App.jsx             # Routes
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   └── package.json
│
├── backend/                   # FastAPI server
│   ├── main.py                 # API routes: /, /health, /predict, /history
│   ├── prediction.py           # Preprocessing + model inference pipeline
│   ├── model/
│   │   ├── model_loader.py     # EfficientNet-B4 architecture + dummy fallback
│   │   └── dr_efficientnet_b4.pth  <- put your trained weights here (optional)
│   ├── utils/
│   │   ├── preprocessing.py    # Resize, CLAHE, normalize
│   │   └── history_manager.py  # JSON-based history storage
│   ├── data/history.json       # Stored prediction history
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md
```

---

## Setup Instructions

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+
- (Optional) Docker & Docker Compose

### 1. Clone / open the project
```bash
cd VisionGuard-AI
```

### 2. Backend Setup
```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --port 8000
```
The backend will be running at: **http://localhost:8000**
Interactive API docs available at: **http://localhost:8000/docs**

> Note: No trained model weights are included, so the backend automatically
> runs in **dummy mode** — it returns realistic simulated predictions so you
> can build and demo the full app immediately. See the section below on
> connecting a real model.

### 3. Frontend Setup
Open a **new terminal window**:
```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
```
The frontend will be running at: **http://localhost:5173**

### 4. Use the App
1. Open http://localhost:5173 in your browser
2. Go to the **Upload** page
3. Upload a retinal fundus image (JPG/PNG)
4. Click **Analyze Scan** to view your result
5. Visit the **Dashboard** page to see prediction history and charts

---

## Running with Docker

If you'd rather not install Node/Python locally, run everything with Docker:

```bash
docker-compose up --build
```

- Backend → http://localhost:8000
- Frontend → http://localhost:5173

---

## API Reference

| Method | Endpoint    | Description |
|--------|-------------|--------------|
| GET    | `/`         | Welcome message / API info |
| GET    | `/health`   | Health check — confirms server & model status |
| POST   | `/predict`  | Upload a retinal image (`file` field) → returns prediction |
| GET    | `/history`  | Returns all past predictions |

**Example `/predict` response:**
```json
{
  "grade": 2,
  "disease_name": "Moderate DR",
  "confidence": 87.42,
  "recommendation": "Moderate DR detected. Please consult an ophthalmologist within the next few months.",
  "probabilities": {
    "No DR": 4.1,
    "Mild DR": 6.3,
    "Moderate DR": 87.42,
    "Severe DR": 1.6,
    "Proliferative DR": 0.58
  },
  "is_dummy_model": true
}
```

---

## Connecting a Real Trained Model

The full EfficientNet-B4 architecture is already wired into the backend
(`backend/model/model_loader.py`). To use a real trained model instead of the
dummy predictions:

1. Train an EfficientNet-B4 model on the **APTOS 2019** dataset (5-class
   output: Grade 0–4).
2. Save your trained weights as a PyTorch state dict:
   ```python
   torch.save(model.state_dict(), "dr_efficientnet_b4.pth")
   ```
3. Place the file at: `backend/model/dr_efficientnet_b4.pth`
4. Restart the backend server — it will automatically detect the weights
   and switch from dummy mode to real predictions. No other code changes
   needed!

---

## Disclaimer

VisionGuard AI is intended for educational and research purposes only. It
has not been evaluated or approved by any medical regulatory authority.
Always consult a qualified healthcare professional for diagnosis and
treatment decisions.
