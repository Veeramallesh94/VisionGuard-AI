import axios from "axios";

// Base URL of the FastAPI backend.
// If you deploy the backend elsewhere, just change this one line.
const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Uploads a retinal image file to the backend and returns the AI prediction.
 * @param {File} imageFile - the image selected/dropped by the user
 */
export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Fetches all past predictions (patient history) from the backend.
 */
export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data.history;
};

/**
 * Checks backend + model health status.
 */
export const getHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
