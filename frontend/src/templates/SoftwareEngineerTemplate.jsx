import React from 'react';
import { Terminal, Code, Cpu, Award } from 'lucide-react';

export const SoftwareEngineerTemplate = ({ resume }) => {
  const pi = resume.personalInformation || {};
  const skills = resume.skills || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const education = resume.education || [];
  const certifications = resume.certifications || [];
  const achievements = resume.achievements || [];

  const order = (resume.sectionOrder || "skills,experience,projects,education,certifications,achievements,summary,languages")
    .split(",")
    .map(s => s.trim().toLowerCase());

  const renderSection = (key) => {
    switch (key) {
      case 'summary':
        if (!resume.summary) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-1.5 font-mono">
              // Professional Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
              {resume.summary}
            </p>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        const byCat = {};
        skills.forEach(s => {
          const c = s.category || 'Technical';
          if (!byCat[c]) byCat[c] = [];
          byCat[c].push(s.name);
        });

        return (
          <section key="skills" className="mb-4">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-2 font-mono">
              // Technical Stack & Tools
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {Object.entries(byCat).map(([cat, list]) => (
                <div key={cat} className="flex items-start gap-2">
                  <span className="font-mono text-teal-900 font-bold w-36 shrink-0 text-[10.5px]">[{cat}]</span>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((item, i) => (
                      <span key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-2 font-mono">
              // Work Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.title} <span className="text-teal-700">@ {exp.company}</span></span>
                    <span className="text-[10px] font-mono text-slate-500">{exp.startDate} ~ {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700 leading-relaxed mt-1">
                      {exp.responsibilities.split('\n').map((r, i) => {
                        const clean = r.replace(/^[•\-*\s]+/, '').trim();
                        return clean ? <li key={i}>{clean}</li> : null;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-4">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-2 font-mono">
              // Engineering Projects & Open Source
            </h2>
            <div className="space-y-2.5">
              {projects.map((p, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && (
                      <span className="text-[10px] font-mono text-teal-700 font-semibold">{p.technologies}</span>
                    )}
                  </div>
                  {p.description && <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{p.description}</p>}
                  {p.highlights && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700 mt-1">
                      {p.highlights.split('\n').map((h, i) => {
                        const clean = h.replace(/^[•\-*\s]+/, '').trim();
                        return clean ? <li key={i}>{clean}</li> : null;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-4">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-2 font-mono">
              // Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                    <span className="text-slate-600"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-3">
            <h2 className="text-xs font-bold text-teal-800 uppercase tracking-wider border-b border-teal-600 pb-0.5 mb-1.5 font-mono">
              // Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700">
              {certifications.map((c, idx) => (
                <li key={idx}><span className="font-bold">{c.name}</span> ({c.issuer})</li>
              ))}
            </ul>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto text-slate-800 shadow-md font-sans text-xs">
      <header className="border-b-2 border-teal-600 pb-3 mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">{pi.fullName || 'Developer Name'}</h1>
          <p className="text-sm font-mono text-teal-700 font-bold mt-0.5">{pi.professionalTitle || resume.targetRole}</p>
        </div>
        <div className="text-right text-[10.5px] font-mono text-slate-600 space-y-0.5">
          <div>{pi.email} | {pi.phone}</div>
          <div>{pi.location} {pi.github && `| github.com/${pi.github.replace(/.*github\.com\//, '')}`}</div>
        </div>
      </header>

      {order.map(key => renderSection(key))}
    </div>
  );
};
