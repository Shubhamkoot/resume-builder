import React from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

const sectionLabels = {
  summary: 'Professional Summary',
  skills: 'Technical Skills',
  experience: 'Work Experience',
  projects: 'Key Projects',
  education: 'Education',
  certifications: 'Certifications',
  achievements: 'Achievements & Awards',
  languages: 'Languages'
};

export const SectionReorder = ({ sectionOrder = "", onOrderChange }) => {
  const sections = (sectionOrder || "summary,skills,experience,projects,education,certifications,achievements,languages")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const moveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    onOrderChange(newSections.join(","));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Resume Section Hierarchy</label>
        <span className="text-[11px] text-slate-400">Controls layout order</span>
      </div>

      <div className="space-y-1.5">
        {sections.map((sec, idx) => (
          <div
            key={sec}
            className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <GripVertical className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-800">
                {idx + 1}. {sectionLabels[sec] || sec}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveSection(idx, -1)}
                disabled={idx === 0}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(idx, 1)}
                disabled={idx === sections.length - 1}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
