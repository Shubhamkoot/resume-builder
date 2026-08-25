import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Download, 
  Bot, 
  Briefcase, 
  Star,
  Cpu,
  Target
} from 'lucide-react';
import { templatesList } from '../components/TemplateSelector';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Career Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Build a Resume That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              Matches the Job.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Create manually or let AI tailor your resume to any Job Description with deterministic ATS scoring — <strong className="text-white font-semibold">without ever hallucinating your experience</strong>.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Build With AI Matcher
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <FileText className="w-5 h-5 text-slate-400" />
              Create Manual Resume
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Factually Accurate</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Deterministic 100-pt ATS Scoring</span>
            <span className="flex items-center gap-1.5"><Download className="w-4 h-4 text-indigo-400" /> Native PDF & Word DOCX</span>
          </div>

          {/* Product Preview Mockup */}
          <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-slate-700/50 to-slate-800/50 border border-slate-700 shadow-2xl">
            <div className="rounded-xl bg-slate-950 overflow-hidden border border-slate-800 text-left p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">ai-resumeforge / live-jd-analysis-engine</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ATS Score: 94/100
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left column: Analyzed JD requirements */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Job Description</h4>
                    <p className="text-sm font-bold text-white">Senior Java / Cloud Backend Engineer</p>
                    <p className="text-xs text-slate-400 mt-1">Stripe • San Francisco, CA (Remote)</p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Matched Skills (5/5)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Java 21', 'Spring Boot', 'MySQL', 'Docker', 'AWS'].map(s => (
                          <span key={s} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-medium">✓ {s}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Suggested Keywords to Highlight</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Microservices', 'Distributed Systems', 'CI/CD'].map(s => (
                          <span key={s} className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-xs font-medium">◐ {s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: Tailored Output Preview */}
                <div className="lg:col-span-7 bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Tailored Resume Output</span>
                      <span className="text-[10px] text-slate-400 font-mono">Template: Modern Pro</span>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-2">
                      <p className="font-bold text-slate-200">John Doe — Senior Java Developer</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        "Accomplished Senior Java Developer with 5+ years of experience architecting resilient Spring Boot microservices and scaling cloud deployments on AWS. Engineered 8+ core services processing 2M+ daily transactions with 99.99% uptime."
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Export Ready Format</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-slate-800 text-slate-200 rounded font-mono text-[10px]">PDF</span>
                      <span className="px-2 py-1 bg-slate-800 text-slate-200 rounded font-mono text-[10px]">DOCX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">Enterprise Engineering</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Everything You Need to Land Technical Interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deterministic ATS Scoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Calculates transparent 100-point breakdowns across Skills, Keywords, Experience, Education, and Projects. Never relies on arbitrary LLM guesses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Zero-Hallucination AI</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our strict prompt engineering never invents fake jobs, degrees, or years of experience. It strictly rephrases and emphasizes your genuine accomplishments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-600/10 text-teal-400 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">6 ATS-Safe Templates</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Crafted for readability, clean typography, and zero parsing errors across Workday, Greenhouse, Lever, and Taleo ATS scanners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Professional Formats</h2>
            <p className="text-3xl font-extrabold text-white mt-2">6 Tested Resume Templates</p>
            <p className="text-slate-400 text-sm mt-2">Switch instantly without losing a single character of your data.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templatesList.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left flex flex-col justify-between">
                <div>
                  <span className="w-3 h-3 rounded-full block mb-3" style={{ backgroundColor: t.themeColor }}></span>
                  <p className="font-bold text-white text-xs">{t.name}</p>
                  <p className="text-[10.5px] text-slate-400 mt-1 leading-snug">{t.desc}</p>
                </div>
                <span className="mt-4 text-[9px] font-bold text-blue-400 uppercase tracking-wider">{t.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Ready to Optimize Your Resume?
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
            Join thousands of software engineers and technical professionals building tailored resumes that pass ATS screenings.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              Get Started Now — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
