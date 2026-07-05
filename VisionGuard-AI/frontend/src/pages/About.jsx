const TECH_STACK = [
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "Axios", "Recharts"] },
  { group: "Backend", items: ["FastAPI", "Python", "Uvicorn", "Pillow", "OpenCV", "NumPy"] },
  { group: "AI Model", items: ["EfficientNet-B4", "PyTorch", "APTOS 2019 Dataset"] },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">About VisionGuard AI</h1>
      <p className="text-slate leading-relaxed mb-10">
        VisionGuard AI is a full-stack application that screens retinal fundus
        photographs for signs of Diabetic Retinopathy (DR) — a leading cause of
        preventable blindness in people with diabetes. The goal is to make early
        screening more accessible, especially in areas with limited access to
        eye specialists.
      </p>

      <div className="panel p-6 mb-10">
        <h2 className="font-semibold mb-3">The Problem</h2>
        <p className="text-slate text-sm leading-relaxed">
          Diabetic Retinopathy often has no early symptoms. By the time a patient
          notices vision changes, damage may already be advanced. Regular retinal
          screening catches DR early, when treatment is most effective — but
          specialist shortages, especially in rural areas, delay diagnosis for
          millions of patients.
        </p>
      </div>

      <div className="panel p-6 mb-10">
        <h2 className="font-semibold mb-3">The Dataset</h2>
        <p className="text-slate text-sm leading-relaxed">
          The model architecture is designed to be trained on the{" "}
          <strong>APTOS 2019 Blindness Detection</strong> dataset, which contains
          thousands of labeled retinal images graded on a 5-point DR severity
          scale — from Grade 0 (No DR) to Grade 4 (Proliferative DR).
        </p>
      </div>

      <h2 className="font-semibold mb-4">Tech Stack</h2>
      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {TECH_STACK.map((group) => (
          <div key={group.group} className="panel p-5">
            <p className="text-xs uppercase tracking-wide font-mono text-teal mb-3">{group.group}</p>
            <ul className="space-y-1.5 text-sm text-ink">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="panel p-6 border-amber/30 bg-amber/5">
        <h2 className="font-semibold mb-2 text-amber">Disclaimer</h2>
        <p className="text-sm text-slate leading-relaxed">
          VisionGuard AI is an educational / research demo project. It is not a
          certified medical device and should never replace a diagnosis from a
          licensed ophthalmologist. Always consult a qualified healthcare
          professional for medical decisions.
        </p>
      </div>
    </div>
  );
}
