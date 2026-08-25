import React from 'react';
import { Check, Layout } from 'lucide-react';

export const templatesList = [
  {
    id: 'ATS_CLASSIC',
    name: 'ATS Classic',
    desc: 'Maximum ATS parser readability, standard clean single-column hierarchy.',
    badge: '100% ATS Safe',
    themeColor: '#1e293b'
  },
  {
    id: 'MODERN_PRO',
    name: 'Modern Professional',
    desc: 'Polished navy accents, refined section headers for experienced engineers.',
    badge: 'Popular',
    themeColor: '#1e40af'
  },
  {
    id: 'SOFTWARE_ENGINEER',
    name: 'Software Engineer',
    desc: 'Emphasizes technical stack tags, GitHub repositories, and system architecture.',
    badge: 'Tech Favorite',
    themeColor: '#0f766e'
  },
  {
    id: 'CLOUD_DEVOPS',
    name: 'Cloud & DevOps',
    desc: 'Optimized for AWS, Docker, Kubernetes, CI/CD and infrastructure certifications.',
    badge: 'Cloud Focus',
    themeColor: '#0369a1'
  },
  {
    id: 'MINIMAL',
    name: 'Minimal',
    desc: 'Understated elegance with fine typographic rhythm and spacious layout.',
    badge: 'Clean',
    themeColor: '#475569'
  },
  {
    id: 'FRESHER',
    name: 'Fresher / Entry-Level',
    desc: 'Prioritizes degrees, academic coursework, technical projects, and hackathons.',
    badge: 'Graduate',
    themeColor: '#4338ca'
  }
];

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {templatesList.map((tpl) => {
        const isSelected = selectedTemplate === tpl.id;
        return (
          <div
            key={tpl.id}
            onClick={() => onSelectTemplate(tpl.id)}
            className={`cursor-pointer rounded-xl p-3.5 border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              isSelected
                ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-xs font-bold text-slate-900 truncate">{tpl.name}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{tpl.desc}</p>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: tpl.themeColor }}
              />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{tpl.badge}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
