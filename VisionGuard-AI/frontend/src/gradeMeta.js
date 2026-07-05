// Central place describing each Diabetic Retinopathy grade.
// Used by ResultCard, HistoryTable, and Dashboard so colors/labels stay consistent.

export const GRADE_META = {
  0: { label: "No DR", color: "#14B8A6", bg: "#E7F8F5", desc: "No signs of retinopathy" },
  1: { label: "Mild DR", color: "#0EA5A0", bg: "#E4F6F5", desc: "Early microaneurysms" },
  2: { label: "Moderate DR", color: "#F59E0B", bg: "#FEF3E2", desc: "More visible retinal damage" },
  3: { label: "Severe DR", color: "#EA580C", bg: "#FDEBE0", desc: "Extensive retinal damage" },
  4: { label: "Proliferative DR", color: "#DC2626", bg: "#FBE7E7", desc: "Advanced, sight-threatening stage" },
};

export const getGradeMeta = (grade) => GRADE_META[grade] ?? GRADE_META[0];
