import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import { predictImage } from "../api/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a retinal image first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await predictImage(file);
      // Pass the result + a local preview URL to the Result page via router state
      navigate("/result", {
        state: { result, previewUrl: URL.createObjectURL(file) },
      });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Could not reach the backend. Make sure the FastAPI server is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Upload a retinal fundus image</h1>
      <p className="text-slate mb-8">
        For best results, use a clear, well-lit fundus photograph taken with a
        standard retinal camera. JPG and PNG are supported.
      </p>

      <UploadBox onFileSelected={setFile} />

      {error && (
        <p className="text-sm text-danger mt-4 bg-danger/10 px-4 py-2 rounded-lg">{error}</p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 w-full py-3.5 rounded-full bg-ink text-white font-semibold hover:bg-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing image..." : "Analyze Scan"}
      </button>

      <p className="text-xs text-slate/70 font-mono mt-4 text-center">
        Research demo · Not a substitute for a licensed ophthalmologist
      </p>
    </div>
  );
}
