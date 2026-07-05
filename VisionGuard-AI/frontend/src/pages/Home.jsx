import { Link } from "react-router-dom";

const STEPS = [
  { n: "Upload", desc: "Upload a retinal fundus photo taken with any standard fundus camera." },
  { n: "Analyze", desc: "EfficientNet-B4 scans the image for microaneurysms, hemorrhages, and exudates." },
  { n: "Result", desc: "Get a DR grade (0-4), confidence score, and a simple next-step recommendation." },
];

const FEATURES = [
  { title: "5-Stage Grading", desc: "Classifies severity from No DR to Proliferative DR, matching clinical standards." },
  { title: "CLAHE Enhancement", desc: "Contrast-enhances retinal images so subtle lesions are easier for the model to detect." },
  { title: "Instant Results", desc: "Get a prediction in seconds instead of waiting weeks for a specialist appointment." },
  { title: "Built for Rural Access", desc: "Designed for clinics without an on-site ophthalmologist, as a triage/screening aid." },
];

export default function Home() {
  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-scan-lines opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-mono mb-5">
              AI-Assisted Retinal Screening
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
              See Diabetic Retinopathy <span className="text-teal">before it costs sight.</span>
            </h1>
            <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
              VisionGuard AI analyzes retinal fundus photographs and flags signs of
              Diabetic Retinopathy in seconds — built to bring specialist-level
              screening to clinics that don't have one on staff.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/upload" className="px-6 py-3 rounded-full bg-teal text-ink font-semibold hover:bg-white transition-colors">
                Analyze a Scan
              </Link>
              <Link to="/about" className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-teal transition-colors">
                How it works
              </Link>
            </div>
          </div>

          {/* Signature visual: animated scanning retina glyph */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72">
              {[0, 1, 2].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-teal/25"
                  style={{ margin: ring * 22 }}
                />
              ))}
              <div className="absolute inset-[64px] rounded-full bg-gradient-to-br from-teal/20 to-transparent border border-teal/40 flex items-center justify-center overflow-hidden">
                <div className="w-3 h-3 rounded-full bg-teal shadow-[0_0_20px_4px_rgba(20,184,166,0.5)]" />
                <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-teal/40 to-transparent animate-sweep" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROBLEM ---------------- */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-4">The problem with late detection</h2>
            <p className="text-slate leading-relaxed">
              Diabetic Retinopathy develops silently — patients often notice no symptoms
              until permanent vision loss has already begun. In rural and underserved
              areas, the shortage of eye specialists means many cases are caught too late
              to fully treat. Early screening changes that outcome.
            </p>
          </div>
          <div className="panel p-6">
            <p className="text-xs uppercase tracking-wide font-mono text-slate mb-4">DR Severity Scale</p>
            <div className="space-y-3">
              {["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-ink text-white text-xs font-mono flex items-center justify-center">{i}</span>
                  <span className="text-sm text-ink">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="bg-cloud/60 border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold mb-10 text-center">How VisionGuard AI works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="panel p-6">
                <span className="font-mono text-teal text-sm">Step {i + 1}</span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{step.n}</h3>
                <p className="text-sm text-slate leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-10 text-center">What you get</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="panel p-6 flex gap-4">
              <div className="w-2 rounded-full bg-teal shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="panel bg-ink border-none p-12 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">Ready to screen a retinal image?</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Upload a fundus photo and get a DR grade with confidence score in seconds.
          </p>
          <Link to="/upload" className="inline-block px-6 py-3 rounded-full bg-teal text-ink font-semibold hover:bg-white transition-colors">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
