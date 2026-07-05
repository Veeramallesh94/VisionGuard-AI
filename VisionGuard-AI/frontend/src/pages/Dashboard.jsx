import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { getHistory } from "../api/api";
import HistoryTable from "../components/HistoryTable";
import { GRADE_META } from "../gradeMeta";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHistory()
      .then(setRecords)
      .catch(() =>
        setError("Could not load history. Make sure the backend server is running.")
      )
      .finally(() => setLoading(false));
  }, []);

  // Build grade-distribution data for the bar chart
  const chartData = Object.entries(GRADE_META).map(([grade, meta]) => ({
    grade: `G${grade}`,
    label: meta.label,
    count: records.filter((r) => r.grade === Number(grade)).length,
    color: meta.color,
  }));

  const totalScans = records.length;
  const avgConfidence = totalScans
    ? (records.reduce((sum, r) => sum + r.confidence, 0) / totalScans).toFixed(1)
    : 0;
  const flaggedCases = records.filter((r) => r.grade >= 2).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
      <p className="text-slate mb-8">Overview of all retinal scans analyzed so far.</p>

      {error && <p className="text-sm text-danger bg-danger/10 px-4 py-2 rounded-lg mb-6">{error}</p>}

      {/* Summary stat cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total scans analyzed" value={totalScans} />
        <StatCard label="Average confidence" value={`${avgConfidence}%`} />
        <StatCard label="Cases needing follow-up (Grade 2+)" value={flaggedCases} accent />
      </div>

      {/* Grade distribution chart */}
      <div className="panel p-6 mb-10">
        <p className="text-xs uppercase tracking-wide font-mono text-slate mb-4">Grade Distribution</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF3F6" vertical={false} />
            <XAxis dataKey="grade" tick={{ fontSize: 12, fill: "#3A4A5C" }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#3A4A5C" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value, _name, props) => [`${value} scans`, props.payload.label]}
              contentStyle={{ borderRadius: 12, border: "1px solid #DCE6EA", fontSize: 13 }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient history table */}
      <p className="text-xs uppercase tracking-wide font-mono text-slate mb-3">Patient History</p>
      {loading ? <p className="text-slate text-sm">Loading history...</p> : <HistoryTable records={records} />}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="panel p-6">
      <p className="text-sm text-slate mb-2">{label}</p>
      <p className={`text-3xl font-semibold font-mono ${accent ? "text-amber" : "text-ink"}`}>{value}</p>
    </div>
  );
}
