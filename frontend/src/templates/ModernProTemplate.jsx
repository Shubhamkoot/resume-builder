import React from 'react';

export const ModernProTemplate = ({ resume }) => {
  const pi = resume.personalInformation || {};
  const skills = resume.skills || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const education = resume.education || [];
  const certifications = resume.certifications || [];
  const achievements = resume.achievements || [];
  const languages = resume.languages || [];

  const order = (resume.sectionOrder || "summary,skills,experience,projects,education,certifications,achievements,languages")
    .split(",")
    .map(s => s.trim().toLowerCase());

  const renderSection = (key) => {
    switch (key) {
      case 'summary':
        if (!resume.summary) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Professional Summary
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
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {Object.entries(byCat).map(([cat, list]) => (
                <div key={cat} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="font-bold text-blue-950 mb-0.5">{cat}</div>
                  <div className="text-slate-600 leading-tight">{list.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-3 border-l-2 border-blue-100">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-semibold text-slate-700">{exp.company}</span>
                    {exp.location && <span className="text-[10px] text-slate-400">{exp.location}</span>}
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-slate-600 leading-relaxed">
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
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((p, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/80">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && (
                      <span className="text-[10px] text-blue-600 font-medium">{p.technologies}</span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{p.description}</p>
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
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold text-slate-900">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </span>
                    <div className="text-[11px] text-slate-600">{edu.institution}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-medium">{edu.startDate} – {edu.endDate}</span>
                    {edu.grade && <div className="text-[10px] text-blue-700 font-bold">{edu.grade}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-3">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Certifications & Credentials
            </h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-900 rounded text-[10.5px] border border-blue-100 font-medium">
                  {c.name} {c.issuer ? `(${c.issuer})` : ''}
                </span>
              ))}
            </div>
          </section>
        );

      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <section key="achievements" className="mb-3">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 border-b border-blue-200 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-600 rounded-xs"></span>
              Key Honors & Achievements
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700">
              {achievements.map((a, idx) => (
                <li key={idx}>
                  <span className="font-bold">{a.title}</span>
                  {a.description && <span>: {a.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      default:
        return null;
    }
  };

  const contacts = [
    pi.email,
    pi.phone,
    pi.location,
    pi.linkedin,
    pi.github
  ].filter(Boolean);

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto text-slate-800 shadow-md font-sans text-xs">
      {/* Modern Navy Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 -mx-8 -mt-8 p-6 text-white mb-6">
        <h1 className="text-2xl font-black tracking-tight">{pi.fullName || 'Your Name'}</h1>
        <p className="text-blue-200 font-semibold text-sm mt-0.5">{pi.professionalTitle || resume.targetRole}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-[10.5px] text-blue-100">
          {contacts.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>•</span>
              <span>{c}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Sections */}
      {order.map(key => renderSection(key))}
    </div>
  );
};
