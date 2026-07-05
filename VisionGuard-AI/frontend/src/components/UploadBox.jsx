import { useRef, useState } from "react";

/**
 * UploadBox
 * A drag-and-drop + click-to-browse box for selecting a retinal image.
 *
 * Props:
 *  - onFileSelected(file): called when the user picks a valid image
 */
export default function UploadBox({ onFileSelected }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG or PNG retinal fundus image.");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    onFileSelected(file);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center px-6 py-14
        ${isDragging ? "border-teal bg-teal/5" : "border-line bg-white hover:border-teal/60"}`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Selected retinal fundus preview"
            className="w-40 h-40 object-cover rounded-full ring-4 ring-teal/20 mb-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-cloud flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="1.8">
              <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        <p className="font-medium text-ink">
          {preview ? "Image selected — drop a new one to replace it" : "Drag & drop a retinal fundus image"}
        </p>
        <p className="text-sm text-slate mt-1">or click to browse · JPG / PNG</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {error && <p className="text-sm text-danger mt-3">{error}</p>}
    </div>
  );
}
