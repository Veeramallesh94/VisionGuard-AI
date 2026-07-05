import { getGradeMeta } from "../gradeMeta";

/**
 * HistoryTable
 * Shows a table of all past predictions (patient history).
 *
 * Props:
 *  - records: array of history objects from GET /history
 */
export default function HistoryTable({ records }) {
  if (!records || records.length === 0) {
    return (
      <div className="panel p-10 text-center">
        <p className="text-slate">No scans analyzed yet.</p>
        <p className="text-sm text-slate/70 mt-1">Upload a retinal image to see it appear here.</p>
      </div>
    );
  }

  return (
    <div className="panel overflow-x-auto thin-scroll">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate font-mono">
            <th className="px-5 py-3">#</th>
            <th className="px-5 py-3">Filename</th>
            <th className="px-5 py-3">Grade</th>
            <th className="px-5 py-3">Result</th>
            <th className="px-5 py-3">Confidence</th>
            <th className="px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const meta = getGradeMeta(record.grade);
            return (
              <tr key={record.id} className="border-b border-line last:border-0 hover:bg-cloud/50">
                <td className="px-5 py-3 font-mono text-slate">{record.id}</td>
                <td className="px-5 py-3 max-w-[160px] truncate">{record.filename}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold"
                    style={{ color: meta.color, backgroundColor: meta.bg }}
                  >
                    G{record.grade}
                  </span>
                </td>
                <td className="px-5 py-3">{record.disease_name}</td>
                <td className="px-5 py-3 font-mono">{record.confidence}%</td>
                <td className="px-5 py-3 text-slate">{record.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
