import { getGradeMeta } from "../gradeMeta";

/**
 * ResultCard
 * Displays the AI prediction result: grade, disease name, confidence score,
 * and a simple recommendation.
 *
 * Props:
 *  - result: the object returned by POST /predict
 *  - previewUrl: local image preview URL to show alongside the result
 */
export default function ResultCard({ result, previewUrl }) {
  const meta = getGradeMeta(result.grade);

  return (
    <div className="panel p-8 grid md:grid-cols-[220px_1fr] gap-8">
      {/* Image + grade ring */}
      <div className="flex flex-col items-center">
        <div
          className="w-40 h-40 rounded-full overflow-hidden ring-4"
          style={{ ringColor: meta.color }}
        >
          <img src={previewUrl} alt="Analyzed retinal fundus" className="w-full h-full object-cover" />
        </div>
        <span
          className="mt-4 px-3 py-1 rounded-full text-xs font-mono font-semibold"
          style={{ color: meta.color, backgroundColor: meta.bg }}
        >
          GRADE {result.grade}
        </span>
      </div>

      {/* Result details */}
      <div>
        {result.is_dummy_model && (
          <p className="text-xs font-mono text-amber bg-amber/10 inline-block px-2 py-1 rounded mb-3">
            Demo mode: showing a simulated prediction (no trained model connected yet)
          </p>
        )}

        <h2 className="text-2xl font-semibold mb-1">{result.disease_name}</h2>
        <p className="text-slate text-sm mb-6">{meta.desc}</p>

        {/* Confidence bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-slate">Confidence score</span>
            <span className="font-mono font-semibold text-ink">{result.confidence}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-cloud overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${result.confidence}%`, backgroundColor: meta.color }}
            />
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-xl bg-cloud p-4">
          <p className="text-xs uppercase tracking-wide font-mono text-slate mb-1">Recommendation</p>
          <p className="text-ink text-sm leading-relaxed">{result.recommendation}</p>
        </div>

        {/* Full probability breakdown */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide font-mono text-slate mb-2">Probability by grade</p>
          <div className="space-y-1.5">
            {Object.entries(result.probabilities).map(([label, prob]) => (
              <div key={label} className="flex items-center gap-3 text-xs">
                <span className="w-32 text-slate truncate">{label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-cloud overflow-hidden">
                  <div className="h-full bg-ink/70 rounded-full" style={{ width: `${prob}%` }} />
                </div>
                <span className="w-10 text-right font-mono text-ink">{prob}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
