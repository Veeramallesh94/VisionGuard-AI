"""
main.py
--------
This is the entry point of the VisionGuard AI backend server.

It uses FastAPI to expose 4 endpoints:
  GET  /          -> welcome message / API info
  GET  /health    -> health check (used to confirm server + model status)
  POST /predict   -> upload a retinal image, get a DR prediction back
  GET  /history   -> list of past predictions (patient history)

Run this file using:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from prediction import run_prediction
from utils.history_manager import add_record, get_all_records
from model.model_loader import dr_model

# Create the FastAPI app
app = FastAPI(
    title="VisionGuard AI API",
    description="Backend API for Diabetic Retinopathy detection from retinal fundus images.",
    version="1.0.0",
)

# Allow the React frontend (running on a different port) to call this API.
# In production, replace "*" with your actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Only these file types are accepted for retinal images
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg"}


@app.get("/")
def root():
    """Simple welcome route so people know the API is alive."""
    return {
        "message": "Welcome to VisionGuard AI API",
        "description": "Upload a retinal fundus image to /predict to detect Diabetic Retinopathy severity.",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    """
    Health check endpoint.
    Useful for monitoring tools, docker-compose healthchecks, and
    for the frontend to check if the backend + model are ready.
    """
    return {
        "status": "ok",
        "model_loaded": True,
        "using_dummy_model": dr_model.dummy_mode,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Main prediction endpoint.

    Accepts an uploaded retinal fundus image, runs it through the
    preprocessing + AI model pipeline, saves the result to history,
    and returns the prediction to the frontend.
    """
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a JPG or PNG retinal image.",
        )

    try:
        image_bytes = await file.read()
        result = run_prediction(image_bytes)

        # Save this prediction into patient history
        add_record(
            filename=file.filename,
            grade=result["grade"],
            disease_name=result["disease_name"],
            confidence=result["confidence"],
            recommendation=result["recommendation"],
        )

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/history")
def history():
    """Return all past predictions, most recent first (patient history)."""
    return {"history": get_all_records()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
