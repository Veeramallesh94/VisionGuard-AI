import { useLocation, Link, Navigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const location = useLocation();
  const { result, previewUrl } = location.state || {};

  // If someone lands on /result directly without a prediction, send them to Upload
  if (!result) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Analysis Result</h1>
      <p className="text-slate mb-8">Here's what VisionGuard AI found in the uploaded image.</p>

      <ResultCard result={result} previewUrl={previewUrl} />

      <div className="flex gap-4 mt-8">
        <Link to="/upload" className="px-5 py-2.5 rounded-full border border-line hover:border-teal transition-colors text-sm font-medium">
          Analyze another image
        </Link>
        <Link to="/dashboard" className="px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium hover:bg-teal transition-colors">
          View patient history
        </Link>
      </div>
    </div>
  );
}
