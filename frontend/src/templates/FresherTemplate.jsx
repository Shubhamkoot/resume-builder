import React from 'react';

export const FresherTemplate = ({ resume }) => {
  const pi = resume.personalInformation || {};
  const skills = resume.skills || [];
  const education = resume.education || [];
  const projects = resume.projects || [];
  const achievements = resume.achievements || [];
  const certifications = resume.certifications || [];
  const experience = resume.experience || [];

  const order = (resume.sectionOrder || "education,skills,projects,achievements,certifications,experience,summary")
    .split(",")
    .map(s => s.trim().toLowerCase());

  const renderSection = (key) => {
    switch (key) {
      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-4">
            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b-2 border-indigo-500 mb-2">
              Academic Background
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className="p-2.5 bg-indigo-50/40 rounded-lg border border-indigo-100">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-indigo-950">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-[10px] text-indigo-700 font-semibold">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mt-0.5">
                    <span className="text-[11px] font-semibold text-slate-700">{edu.institution}</span>
                    {edu.grade && <span className="text-[11px] text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.2 rounded">CGPA: {edu.grade}</span>}
                  </div>
                  {edu.description && <p className="text-[10.5px] text-slate-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
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
            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b-2 border-indigo-500 mb-2">
              Core Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {Object.entries(byCat).map(([cat, list]) => (
                <div key={cat}>
                  <span className="font-bold text-slate-900 block">{cat}:</span>
                  <span className="text-slate-700">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-4">
            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b-2 border-indigo-500 mb-2">
              Academic & Independent Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{p.title}</span>
                    {p.technologies && <span className="text-[10px] text-indigo-600 font-medium">[{p.technologies}]</span>}
                  </div>
                  {p.description && <p className="text-[11px] text-slate-600 mt-0.5">{p.description}</p>}
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

      case 'achievements':
        if (achievements.length === 0) return null;
        return (
          <section key="achievements" className="mb-3">
            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b-2 border-indigo-500 mb-1.5">
              Hackathons, Contests & Achievements
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700">
              {achievements.map((a, idx) => (
                <li key={idx}><span className="font-bold">{a.title}</span>: {a.description}</li>
              ))}
            </ul>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-3">
            <h2 className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b-2 border-indigo-500 mb-1.5">
              Certifications & Online Courses
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700">
              {certifications.map((c, idx) => (
                <li key={idx}><span className="font-bold">{c.name}</span> — {c.issuer}</li>
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
      <header className="text-center pb-3 border-b-2 border-indigo-600 mb-4">
        <h1 className="text-2xl font-bold text-indigo-950 tracking-tight">{pi.fullName || 'Graduate Name'}</h1>
        <p className="text-sm font-semibold text-indigo-700">{pi.professionalTitle || resume.targetRole || 'Computer Science Graduate'}</p>
        <p className="text-[10.5px] text-slate-500 mt-1">
          {[pi.email, pi.phone, pi.location, pi.github, pi.linkedin].filter(Boolean).join(' | ')}
        </p>
      </header>

      {order.map(key => renderSection(key))}
    </div>
  );
};
