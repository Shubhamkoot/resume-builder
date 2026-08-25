import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { useToast } from '../context/ToastContext';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { TemplateSelector } from '../components/TemplateSelector';
import { SectionReorder } from '../components/SectionReorder';
import { AIAssistantModal } from '../components/AIAssistantModal';
import { 
  Save, 
  Download, 
  FileDown, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  FileText, 
  Code, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Languages, 
  Link2, 
  Layout, 
  Eye, 
  Loader2,
  Wand2,
  CheckCircle2
} from 'lucide-react';

const INITIAL_RESUME_STATE = {
  title: 'My Professional Resume',
  targetRole: 'Senior Java Developer',
  targetCompany: '',
  template: 'ATS_CLASSIC',
  summary: '',
  sectionOrder: 'summary,skills,experience,projects,education,certifications,achievements,languages',
  atsScore: 85,
  isAiGenerated: false,
  personalInformation: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  socialLinks: []
};

export const ManualResumeBuilderPage = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [resume, setResume] = useState(INITIAL_RESUME_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!resumeId);

  // AI Assistant Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalConfig, setAiModalConfig] = useState({
    title: 'AI Content Enhancer',
    type: 'SUMMARY',
    initialText: '',
    onApply: () => {}
  });

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId]);

  const loadResume = async (id) => {
    try {
      const data = await resumeService.getResumeById(id);
      if (data) {
        setResume(data);
      }
    } catch (err) {
      error("Failed to load resume: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (resume.id) {
        const updated = await resumeService.updateResume(resume.id, resume);
        setResume(updated);
        success("Resume saved successfully!");
      } else {
        const created = await resumeService.createResume(resume);
        setResume(created);
        success("Resume created!");
        navigate(`/builder?id=${created.id}`, { replace: true });
      }
    } catch (err) {
      error("Failed to save resume: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      if (!resume.id) {
        await handleSave();
      }
      await resumeService.downloadPdf(resume.id, resume.title);
      success("PDF downloaded!");
    } catch (err) {
      error("Failed to download PDF");
    }
  };

  const handleDownloadDocx = async () => {
    try {
      if (!resume.id) {
        await handleSave();
      }
      await resumeService.downloadDocx(resume.id, resume.title);
      success("Word DOCX downloaded!");
    } catch (err) {
      error("Failed to download DOCX");
    }
  };

  // Open AI Assistant helper
  const openAiHelper = (title, type, currentText, callback) => {
    setAiModalConfig({
      title,
      type,
      initialText: currentText,
      onApply: callback
    });
    setAiModalOpen(true);
  };

  const steps = [
    { id: 'info', label: '1. Personal Info', icon: User },
    { id: 'summary', label: '2. Summary', icon: FileText },
    { id: 'skills', label: '3. Skills', icon: Code },
    { id: 'experience', label: '4. Experience', icon: Briefcase },
    { id: 'projects', label: '5. Projects', icon: FolderGit2 },
    { id: 'education', label: '6. Education', icon: GraduationCap },
    { id: 'certifications', label: '7. Certifications', icon: Award },
    { id: 'achievements', label: '8. Achievements', icon: Award },
    { id: 'languages', label: '9. Languages', icon: Languages },
    { id: 'social', label: '10. Social Links', icon: Link2 },
    { id: 'template', label: '11. Templates', icon: Layout },
    { id: 'reorder', label: '12. Section Order', icon: Layout },
    { id: 'preview', label: '13. Final Preview', icon: Eye }
  ];

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            value={resume.title}
            onChange={(e) => setResume({ ...resume, title: e.target.value })}
            className="text-lg font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-none px-1 py-0.5"
            placeholder="Untitled Resume"
          />
          {resume.isAiGenerated && (
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold shrink-0">
              AI Tailored
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Resume
          </button>

          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            title="Download PDF"
          >
            <FileDown className="w-4 h-4" />
            PDF
          </button>

          <button
            onClick={handleDownloadDocx}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            title="Download Word DOCX"
          >
            <Download className="w-4 h-4" />
            DOCX
          </button>
        </div>
      </div>

      {/* Step Navigation Pill Bar */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-1.5 min-w-max bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = currentStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split Screen Container (Editor Left + Live Preview Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Step Form Editor */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-6">
          {/* STEP 0: Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                1. Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resume.personalInformation?.fullName || ''}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInformation: { ...resume.personalInformation, fullName: e.target.value }
                    })}
                    placeholder="e.g. John Doe"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={resume.personalInformation?.professionalTitle || ''}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInformation: { ...resume.personalInformation, professionalTitle: e.target.value }
                    })}
                    placeholder="e.g. Senior Java Developer"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Email</label>
                  <input
                    type="email"
                    value={resume.personalInformation?.email || ''}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInformation: { ...resume.personalInformation, email: e.target.value }
                    })}
                    placeholder="john@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Phone</label>
                  <input
                    type="text"
                    value={resume.personalInformation?.phone || ''}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInformation: { ...resume.personalInformation, phone: e.target.value }
                    })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Location</label>
                  <input
                    type="text"
                    value={resume.personalInformation?.location || ''}
                    onChange={(e) => setResume({
                      ...resume,
                      personalInformation: { ...resume.personalInformation, location: e.target.value }
                    })}
                    placeholder="San Francisco, CA"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Professional Summary */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">2. Professional Summary</h3>
                <button
                  type="button"
                  onClick={() => openAiHelper(
                    'AI Improve Summary',
                    'SUMMARY',
                    resume.summary,
                    (improved) => setResume({ ...resume, summary: improved })
                  )}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  Improve with AI
                </button>
              </div>

              <textarea
                rows={6}
                value={resume.summary || ''}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                placeholder="Results-oriented engineer with 5+ years of experience..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
              />
            </div>
          )}

          {/* STEP 2: Skills */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">3. Technical Skills</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(resume.skills || []), { name: '', category: 'Programming Languages', proficiencyLevel: 'Advanced' }];
                    setResume({ ...resume, skills: updated });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Skill
                </button>
              </div>

              <div className="space-y-2">
                {(resume.skills || []).map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => {
                        const newSkills = [...resume.skills];
                        newSkills[idx].name = e.target.value;
                        setResume({ ...resume, skills: newSkills });
                      }}
                      placeholder="e.g. Java, Docker, React"
                      className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                    <select
                      value={s.category || 'Technical'}
                      onChange={(e) => {
                        const newSkills = [...resume.skills];
                        newSkills[idx].category = e.target.value;
                        setResume({ ...resume, skills: newSkills });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                    >
                      <option>Programming Languages</option>
                      <option>Frameworks</option>
                      <option>Cloud</option>
                      <option>DevOps</option>
                      <option>Databases</option>
                      <option>Tools</option>
                      <option>Soft Skills</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = resume.skills.filter((_, i) => i !== idx);
                        setResume({ ...resume, skills: newSkills });
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">4. Work Experience</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(resume.experience || []), { company: '', title: '', location: '', startDate: '', endDate: '', isCurrent: false, responsibilities: '' }];
                    setResume({ ...resume, experience: updated });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              {(resume.experience || []).map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">Role #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openAiHelper(
                          `Enhance Role #${idx + 1} Bullets`,
                          'EXPERIENCE',
                          exp.responsibilities,
                          (improved) => {
                            const newExp = [...resume.experience];
                            newExp[idx].responsibilities = improved;
                            setResume({ ...resume, experience: newExp });
                          }
                        )}
                        className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md hover:bg-indigo-100 flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" /> AI Bullet Generator
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newExp = resume.experience.filter((_, i) => i !== idx);
                          setResume({ ...resume, experience: newExp });
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...resume.experience];
                        newExp[idx].company = e.target.value;
                        setResume({ ...resume, experience: newExp });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => {
                        const newExp = [...resume.experience];
                        newExp[idx].title = e.target.value;
                        setResume({ ...resume, experience: newExp });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Start Date (e.g. 2022-03)"
                      value={exp.startDate || ''}
                      onChange={(e) => {
                        const newExp = [...resume.experience];
                        newExp[idx].startDate = e.target.value;
                        setResume({ ...resume, experience: newExp });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="End Date (or 'Present')"
                      value={exp.endDate || ''}
                      onChange={(e) => {
                        const newExp = [...resume.experience];
                        newExp[idx].endDate = e.target.value;
                        setResume({ ...resume, experience: newExp });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <textarea
                    rows={4}
                    placeholder="Bullet points (one per line, starting with •)..."
                    value={exp.responsibilities || ''}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[idx].responsibilities = e.target.value;
                      setResume({ ...resume, experience: newExp });
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Projects */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">5. Key Projects</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(resume.projects || []), { title: '', description: '', technologies: '' }];
                    setResume({ ...resume, projects: updated });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {(resume.projects || []).map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">Project #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newP = resume.projects.filter((_, i) => i !== idx);
                        setResume({ ...resume, projects: newP });
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={p.title}
                      onChange={(e) => {
                        const newP = [...resume.projects];
                        newP[idx].title = e.target.value;
                        setResume({ ...resume, projects: newP });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (e.g. Java, React, Docker)"
                      value={p.technologies || ''}
                      onChange={(e) => {
                        const newP = [...resume.projects];
                        newP[idx].technologies = e.target.value;
                        setResume({ ...resume, projects: newP });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Project description and key technical architecture..."
                    value={p.description || ''}
                    onChange={(e) => {
                      const newP = [...resume.projects];
                      newP[idx].description = e.target.value;
                      setResume({ ...resume, projects: newP });
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Education */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">6. Education</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(resume.education || []), { institution: '', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', startDate: '', endDate: '' }];
                    setResume({ ...resume, education: updated });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Degree
                </button>
              </div>

              {(resume.education || []).map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="University / College"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdu = [...resume.education];
                        newEdu[idx].institution = e.target.value;
                        setResume({ ...resume, education: newEdu });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Degree & Major"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...resume.education];
                        newEdu[idx].degree = e.target.value;
                        setResume({ ...resume, education: newEdu });
                      }}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 10: Template Selection */}
          {currentStep === 10 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                11. Select Resume Template
              </h3>
              <TemplateSelector
                selectedTemplate={resume.template}
                onSelectTemplate={(t) => setResume({ ...resume, template: t })}
              />
            </div>
          )}

          {/* STEP 11: Reorder */}
          {currentStep === 11 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                12. Section Ordering
              </h3>
              <SectionReorder
                sectionOrder={resume.sectionOrder}
                onOrderChange={(order) => setResume({ ...resume, sectionOrder: order })}
              />
            </div>
          )}

          {/* Other steps: Certs, Achievements, Social links fallback UI */}
          {(currentStep >= 6 && currentStep <= 9) || currentStep === 12 ? (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                {steps[currentStep].label}
              </h3>
              <p className="text-xs text-slate-500">
                Edit sections directly or preview live on the right pane.
              </p>
            </div>
          ) : null}

          {/* Step Footer Pagination */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              type="button"
              disabled={currentStep === steps.length - 1}
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-30"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Live Resume Preview (Real-time updates) */}
        <div className="lg:col-span-6 sticky top-24 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Document Preview</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Template: {resume.template}</span>
          </div>

          <div className="bg-slate-200/70 p-4 rounded-2xl border border-slate-300 shadow-inner overflow-hidden max-h-[82vh] overflow-y-auto">
            <div className="resume-sheet bg-white rounded-lg shadow-xl origin-top transition-all">
              <ResumeRenderer resume={resume} />
            </div>
          </div>
        </div>
      </div>

      {/* Side by Side AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title={aiModalConfig.title}
        type={aiModalConfig.type}
        initialText={aiModalConfig.initialText}
        onApply={aiModalConfig.onApply}
        targetJobTitle={resume.targetRole || "Software Engineer"}
      />
    </div>
  );
};
