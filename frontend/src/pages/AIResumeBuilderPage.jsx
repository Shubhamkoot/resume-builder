import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { aiService } from '../services/aiService';
import { ScoreGauge } from '../components/ScoreGauge';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { useToast } from '../context/ToastContext';
import { 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Check, 
  Loader2, 
  Download, 
  Edit3, 
  Target, 
  Cpu, 
  Layers,
  Wand2,
  Building,
  Briefcase
} from 'lucide-react';

export const AIResumeBuilderPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobTitle, setJobTitle] = useState('Senior Java Backend Engineer');
  const [companyName, setCompanyName] = useState('Apex Cloud Technologies');
  const [jobDescription, setJobDescription] = useState(
`We are looking for a Senior Java Developer with 4+ years of experience to join our core backend engineering team.

Key Responsibilities:
- Design, build, and deploy high-throughput microservices using Java 17+, Spring Boot, and RESTful APIs.
- Work with relational databases (MySQL/PostgreSQL) and optimize database queries and caching layers with Redis.
- Collaborate with cloud teams to deploy containerized services via Docker, Kubernetes, and AWS (EC2, S3, RDS).
- Write automated unit and integration tests using JUnit and Mockito.

Requirements:
- Bachelor's or Master's degree in Computer Science or related engineering discipline.
- 4+ years of hands-on experience in Java, Spring Boot, and Microservices architecture.
- Proficient in SQL, relational databases (MySQL/PostgreSQL), and Git workflows.
- Experience with Docker, CI/CD pipelines, and AWS cloud deployments is strongly preferred.`
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const { success, error } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserResumes();
  }, []);

  const loadUserResumes = async () => {
    try {
      const data = await resumeService.getAllResumes();
      setResumes(data || []);
      if (data && data.length > 0) {
        setSelectedResumeId(data[0].id.toString());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      error('Please paste a Job Description first');
      return;
    }
    if (!selectedResumeId) {
      error('Please select a base resume to match against');
      return;
    }

    setAnalyzing(true);
    setGeneratedResume(null);
    try {
      const res = await aiService.analyzeJob({
        jobTitle,
        companyName,
        jobDescription,
        resumeId: parseInt(selectedResumeId, 10)
      });
      setAnalysisResult(res);
      success('Job Description analyzed and matched with your profile!');
    } catch (err) {
      error('Failed to analyze JD: ' + (err.response?.data?.message || err.message));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerateTailored = async () => {
    if (!selectedResumeId || !analysisResult) {
      error('Please analyze the JD first');
      return;
    }

    setGenerating(true);
    try {
      const res = await aiService.generateResume({
        baseResumeId: parseInt(selectedResumeId, 10),
        jobTitle,
        companyName,
        jobDescription,
        targetTemplate: 'MODERN_PRO'
      });
      setGeneratedResume(res);
      success('Tailored ATS-optimized resume generated successfully!');
    } catch (err) {
      error('Failed to generate tailored resume: ' + (err.response?.data?.message || err.message));
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!generatedResume) return;
    try {
      await resumeService.downloadPdf(generatedResume.id, generatedResume.title);
      success('PDF downloaded!');
    } catch (err) {
      error('Failed to download PDF');
    }
  };

  const ats = analysisResult?.atsScoreResponse;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Mode 2 — AI Job Matcher & Resume Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Build Resume From Job Description
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Deterministic ATS scoring, keyword mapping, and factual AI tailoring without hallucinated experience.
          </p>
        </div>

        {/* Base Resume Selector */}
        <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Base Profile:</label>
          <select
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {resumes.map(r => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.targetRole || 'General'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Two-Column Workflow Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Description Input & Actions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Target Position Details
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Target Role</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Java Developer"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Stripe"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Paste Job Description</label>
                <span className="text-[11px] text-slate-400 font-mono">{jobDescription.length} chars</span>
              </div>
              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={handleAnalyzeJob}
              disabled={analyzing}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-500/20 transition-all"
            >
              {analyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Job Description</span>
                </>
              )}
            </button>
          </div>

          {/* Fact-Safety Rule Reminder Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safety & Accuracy Guarantee</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              ResumeForge strictly preserves your factual history. Missing skills will be highlighted as gaps rather than invented on your resume.
            </p>
          </div>
        </div>

        {/* Right Column: Analysis Results & Matching Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* ATS Score Overview Card */}
              {ats && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Match Score Analysis</span>
                      <h3 className="text-xl font-extrabold text-slate-900">Overall ATS Compatibility</h3>
                      <p className="text-xs text-slate-500">
                        Evaluated across 7 transparent deterministic scoring pillars.
                      </p>
                    </div>

                    <ScoreGauge score={ats.overallScore} size="lg" />
                  </div>

                  {/* 6 Category Breakdown Gauges/Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Skills Match (30 pts)</span>
                      <span className="text-base font-black text-slate-900">{ats.skillsMatchPercentage}%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${ats.skillsMatchPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Keywords (20 pts)</span>
                      <span className="text-base font-black text-slate-900">{ats.keywordsMatchPercentage}%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${ats.keywordsMatchPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Experience (20 pts)</span>
                      <span className="text-base font-black text-slate-900">{ats.experienceMatchPercentage}%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${ats.experienceMatchPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Education (10 pts)</span>
                      <span className="text-base font-black text-slate-900">{ats.educationMatchPercentage}%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${ats.educationMatchPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Projects (10 pts)</span>
                      <span className="text-base font-black text-slate-900">{ats.projectRelevancePercentage}%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: `${ats.projectRelevancePercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-500 uppercase block">Structure (10 pts)</span>
                      <span className="text-base font-black text-slate-900">100%</span>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-sky-600 h-full rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Matched vs Missing Skills Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Skill Gap & Match Matrix</h3>

                <div className="space-y-3">
                  {/* Matched */}
                  {ats?.matchedSkills && ats.matchedSkills.length > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Matched Profile Skills ({ats.matchedSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ats.matchedSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-white text-emerald-800 text-xs font-semibold border border-emerald-300 shadow-2xs">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing */}
                  {ats?.missingSkills && ats.missingSkills.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                      <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Missing Target Skills ({ats.missingSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ats.missingSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-white text-rose-800 text-xs font-semibold border border-rose-300 shadow-2xs">
                            ⚠ {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-rose-700 italic">
                        *Not added to generated resume to protect factual authenticity.
                      </p>
                    </div>
                  )}

                  {/* Partial */}
                  {ats?.partiallyMatchedSkills && ats.partiallyMatchedSkills.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                      <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        Partially Matched in Descriptions ({ats.partiallyMatchedSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ats.partiallyMatchedSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-white text-amber-800 text-xs font-semibold border border-amber-300 shadow-2xs">
                            ◐ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 1-Click Tailor Resume Button */}
                <div className="pt-2">
                  <button
                    onClick={handleGenerateTailored}
                    disabled={generating}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {generating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        <span>Generate Factually Tailored Resume</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tailored Resume Result Sheet */}
              {generatedResume && (
                <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Ready to Export</span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{generatedResume.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadPdf}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </button>
                      <button
                        onClick={() => navigate(`/builder?id=${generatedResume.id}`)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit in Builder
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-100 rounded-xl max-h-[500px] overflow-y-auto">
                    <div className="resume-sheet bg-white rounded shadow-md scale-95 origin-top">
                      <ResumeRenderer resume={generatedResume} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No JD Analysis Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Paste any job posting on the left panel and click <strong>Analyze Job Description</strong> to generate requirements, ATS score breakdown, and tailored resume.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
