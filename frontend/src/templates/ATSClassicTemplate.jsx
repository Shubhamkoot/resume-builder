import React from 'react';

export const ATSClassicTemplate = ({ resume }) => {
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
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-1.5 font-serif">
              Professional Summary
            </h2>
            <p className="text-[11px] text-slate-800 leading-relaxed font-serif text-justify">
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
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-1.5 font-serif">
              Technical Skills
            </h2>
            <div className="space-y-1 font-serif text-[11px]">
              {Object.entries(byCat).map(([cat, list]) => (
                <div key={cat} className="flex items-baseline">
                  <span className="font-bold text-slate-900 w-32 shrink-0">{cat}:</span>
                  <span className="text-slate-800">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-2 font-serif">
              Work Experience
            </h2>
            <div className="space-y-3 font-serif">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                    <span className="text-[10px] text-slate-600 font-semibold">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] italic text-slate-800">{exp.company}</span>
                    {exp.location && <span className="text-[10px] text-slate-500">{exp.location}</span>}
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-800 leading-relaxed">
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
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-2 font-serif">
              Projects
            </h2>
            <div className="space-y-2.5 font-serif">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && (
                      <span className="text-[10px] italic text-slate-600">| {p.technologies}</span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[11px] text-slate-800 leading-relaxed mt-0.5">{p.description}</p>
                  )}
                  {p.highlights && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-800 mt-1">
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
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-2 font-serif">
              Education
            </h2>
            <div className="space-y-2 font-serif">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold text-slate-900">
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </span>
                    <div className="text-[11px] italic text-slate-700">{edu.institution}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-600">{edu.startDate} – {edu.endDate}</span>
                    {edu.grade && <div className="text-[10px] text-slate-500 font-semibold">{edu.grade}</div>}
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
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-1.5 font-serif">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 font-serif text-[11px] text-slate-800">
              {certifications.map((c, idx) => (
                <li key={idx}>
                  <span className="font-bold">{c.name}</span>
                  {c.issuer && <span> — {c.issuer}</span>}
                  {c.issueDate && <span className="text-slate-500 text-[10px]"> ({c.issueDate})</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <section key="achievements" className="mb-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-1.5 font-serif">
              Achievements
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 font-serif text-[11px] text-slate-800">
              {achievements.map((a, idx) => (
                <li key={idx}>
                  <span className="font-bold">{a.title}</span>
                  {a.description && <span>: {a.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (languages.length === 0) return null;
        return (
          <section key="languages" className="mb-3 font-serif">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-900 pb-0.5 mb-1.5">
              Languages
            </h2>
            <p className="text-[11px] text-slate-800">
              {languages.map(l => `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  •  ')}
            </p>
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
    pi.linkedin && `LinkedIn: ${pi.linkedin}`,
    pi.github && `GitHub: ${pi.github}`,
    pi.portfolio && `Portfolio: ${pi.portfolio}`
  ].filter(Boolean);

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto text-slate-900 shadow-md font-serif text-xs leading-normal">
      {/* Header */}
      <header className="text-center border-b border-slate-900 pb-3 mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-950 font-serif">
          {pi.fullName || 'Your Full Name'}
        </h1>
        {(pi.professionalTitle || resume.targetRole) && (
          <p className="text-sm font-semibold text-slate-800 mt-0.5 font-serif">
            {pi.professionalTitle || resume.targetRole}
          </p>
        )}
        {contacts.length > 0 && (
          <p className="text-[10.5px] text-slate-600 mt-1 font-serif">
            {contacts.join(' | ')}
          </p>
        )}
      </header>

      {/* Sections */}
      {order.map(key => renderSection(key))}
    </div>
  );
};
