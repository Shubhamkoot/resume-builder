import React from 'react';

export const CloudDevOpsTemplate = ({ resume }) => {
  const pi = resume.personalInformation || {};
  const skills = resume.skills || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const education = resume.education || [];
  const certifications = resume.certifications || [];

  const order = (resume.sectionOrder || "skills,certifications,experience,projects,education,summary")
    .split(",")
    .map(s => s.trim().toLowerCase());

  const renderSection = (key) => {
    switch (key) {
      case 'summary':
        if (!resume.summary) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-1.5">
              Infrastructure & Architecture Overview
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed px-1">
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
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-2">
              Cloud, DevOps & Tooling Expertise
            </h2>
            <div className="grid grid-cols-2 gap-2 text-[11px] px-1">
              {Object.entries(byCat).map(([cat, list]) => (
                <div key={cat} className="border border-slate-200 rounded p-2 bg-slate-50/50">
                  <div className="font-bold text-sky-950 text-[10.5px] uppercase">{cat}</div>
                  <div className="text-slate-600 text-[10.5px] mt-0.5">{list.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-4">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-1.5">
              Cloud & Security Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2 px-1 text-[11px]">
              {certifications.map((c, idx) => (
                <div key={idx} className="p-2 border border-sky-200 rounded bg-sky-50/30 flex items-center justify-between">
                  <span className="font-bold text-sky-950">{c.name}</span>
                  {c.issuer && <span className="text-[10px] text-sky-700 font-semibold">{c.issuer}</span>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-2">
              Production Experience & Deployments
            </h2>
            <div className="space-y-3 px-1">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.title} - <span className="text-sky-800">{exp.company}</span></span>
                    <span className="text-[10px] text-slate-500 font-semibold">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
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
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-2">
              Infrastructure & System Implementations
            </h2>
            <div className="space-y-2 px-1">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && <span className="text-[10px] text-sky-700 font-semibold">{p.technologies}</span>}
                  </div>
                  {p.description && <p className="text-[11px] text-slate-600 mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-3">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-1 rounded border-l-4 border-sky-600 mb-1.5">
              Education
            </h2>
            <div className="space-y-1 px-1">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy} — {edu.institution}</span>
                  <span className="text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto text-slate-800 shadow-md font-sans text-xs">
      <header className="border-b border-slate-300 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{pi.fullName || 'Cloud Engineer'}</h1>
          <p className="text-sm font-bold text-sky-700">{pi.professionalTitle || resume.targetRole}</p>
        </div>
        <div className="text-right text-[10.5px] text-slate-600">
          <div>{pi.email} | {pi.phone}</div>
          <div>{pi.location} {pi.linkedin && `| ${pi.linkedin}`}</div>
        </div>
      </header>

      {order.map(key => renderSection(key))}
    </div>
  );
};
