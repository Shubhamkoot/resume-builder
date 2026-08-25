import React from 'react';

export const MinimalTemplate = ({ resume }) => {
  const pi = resume.personalInformation || {};
  const skills = resume.skills || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const education = resume.education || [];
  const certifications = resume.certifications || [];

  const order = (resume.sectionOrder || "summary,skills,experience,projects,education,certifications")
    .split(",")
    .map(s => s.trim().toLowerCase());

  const renderSection = (key) => {
    switch (key) {
      case 'summary':
        if (!resume.summary) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              {resume.summary}
            </p>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-4">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Skills
            </h2>
            <p className="text-[11px] text-slate-800 leading-relaxed">
              {skills.map(s => s.name).join('  •  ')}
            </p>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.title} — {exp.company}</span>
                    <span className="text-[10px] text-slate-400">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
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
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && <span className="text-[10px] text-slate-500">{p.technologies}</span>}
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
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Education
            </h2>
            <div className="space-y-1">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy} — {edu.institution}</span>
                  <span className="text-slate-400">{edu.startDate} – {edu.endDate}</span>
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
    <div className="bg-white p-10 max-w-[800px] mx-auto text-slate-800 shadow-md font-sans text-xs">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-light tracking-wide text-slate-900 uppercase">{pi.fullName || 'Candidate Name'}</h1>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">{pi.professionalTitle || resume.targetRole}</p>
        <p className="text-[10px] text-slate-400 mt-1">
          {[pi.email, pi.phone, pi.location, pi.linkedin, pi.github].filter(Boolean).join('  /  ')}
        </p>
      </header>

      {order.map(key => renderSection(key))}
    </div>
  );
};
