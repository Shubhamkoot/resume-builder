import React, { useState } from 'react';
import { resumeService } from '../services/resumeService';
import { atsService } from '../services/atsService';
import { ScoreGauge } from '../components/ScoreGauge';
import { useToast } from '../context/ToastContext';
import { 
  SearchCheck, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Loader2, 
  FileUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ATSAnalyzerPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { success, error } = useToast();

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await resumeService.uploadAndParseResume(file);
      setResumeText(res.extractedText || '');
      setUploadedFileName(file.name);
      success(`Extracted text from ${file.name} successfully!`);
    } catch (err) {
      error('Failed to parse resume file: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      error('Please upload a resume or paste your resume text first');
      return;
    }

    setAnalyzing(true);
    try {
      const res = await atsService.analyze({
        resumeText,
        jobDescription
      });
      setAnalysisResult(res);
      success('ATS Analysis complete!');
    } catch (err) {
      error('ATS Analysis failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
          <SearchCheck className="w-3.5 h-3.5" />
          ATS Scanner & Keyword Diagnostics
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Resume ATS Analyzer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload any PDF or Word resume to test ATS readability, discover keyword placement, and get actionable recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload and Input */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Dropzone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Upload Resume (PDF or DOCX)</h2>

            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/30">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="text-xs font-bold text-slate-700">Extracting text...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                    <FileUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {uploadedFileName ? uploadedFileName : 'Click to Browse or Drag & Drop'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Supports PDF, Word DOCX up to 10MB</span>
                </>
              )}
            </label>

            {/* Resume Text Box */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Or Paste Resume Text</label>
                <span className="text-[10px] text-slate-400 font-mono">{resumeText.length} chars</span>
              </div>
              <textarea
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste extracted resume text here..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Optional Target Job Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Optional Target Job Description
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste target JD to check keyword match percentage..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-md shadow-indigo-500/20 transition-all"
            >
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchCheck className="w-4 h-4" />}
              Analyze ATS Score
            </button>
          </div>
        </div>

        {/* Right Column: Score Breakdown & Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Score Gauge Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall ATS Readability</span>
                  <h3 className="text-2xl font-black text-slate-900">Applicant Tracking Score</h3>
                  <p className="text-xs text-slate-500">
                    Evaluates structure, keywords, action verbs, measurable impact, and contact formatting.
                  </p>
                </div>

                <ScoreGauge score={analysisResult.overallScore} size="lg" />
              </div>

              {/* Issues Identified */}
              {analysisResult.issues && analysisResult.issues.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
                  <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Identified Gaps & Vulnerabilities ({analysisResult.issues.length})
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.issues.map((issue, idx) => (
                      <div key={idx} className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                        <span className="font-bold">⚠</span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Suggestions */}
              {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
                  <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    Recommended Improvements
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.suggestions.map((sug, idx) => (
                      <div key={idx} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{sug}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Keyword Placement Recommendations */}
              {analysisResult.keywordPlacements && Object.keys(analysisResult.keywordPlacements).length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Recommended Keyword Placement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(analysisResult.keywordPlacements).map(([kw, place]) => (
                      <div key={kw} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <span className="font-bold text-slate-800">{kw}</span>
                        <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-100">
                          {place}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <SearchCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Resume Analyzed</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Upload a PDF or Word document on the left panel to scan for ATS compliance and get instant optimization recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
