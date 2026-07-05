export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate">
          © {new Date().getFullYear()} VisionGuard AI — Early Detection of Diabetic Retinopathy
        </p>
        <p className="text-xs text-slate/70 font-mono">
          Research demo only · Not a substitute for professional medical diagnosis
        </p>
      </div>
    </footer>
  );
}
