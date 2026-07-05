import { NavLink } from "react-router-dom";

// Top navigation bar shown on every page
export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-teal" : "text-slate hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo mark: a small "scanning eye" glyph */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="relative w-8 h-8 flex items-center justify-center rounded-full bg-ink">
            <span className="w-3 h-3 rounded-full bg-teal" />
            <span className="absolute inset-0 rounded-full border border-teal/50 animate-pulseRing" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            VisionGuard <span className="text-teal">AI</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/upload" className={linkClass}>Upload</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>

        <NavLink
          to="/upload"
          className="px-4 py-2 rounded-full bg-ink text-white text-sm font-medium hover:bg-teal transition-colors"
        >
          Analyze Scan
        </NavLink>
      </div>
    </header>
  );
}
