import React, { useState } from 'react';
import { Sparkles, Check, X, ArrowRight, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { aiService } from '../services/aiService';
import { useToast } from '../context/ToastContext';

export const AIAssistantModal = ({ 
  isOpen, 
  onClose, 
  title = "AI Content Enhancer", 
  initialText = "", 
  type = "SUMMARY", 
  onApply,
  targetJobTitle = ""
}) => {
  const [originalText, setOriginalText] = useState(initialText);
  const [improvedText, setImprovedText] = useState("");
  const [changesMade, setChangesMade] = useState([]);
  const [rationale, setRationale] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(type);
  const { success, error } = useToast();

  React.useEffect(() => {
    if (isOpen) {
      setOriginalText(initialText);
      setSelectedType(type);
      setImprovedText("");
      setChangesMade([]);
      setRationale("");
      handleGenerate(initialText, type);
    }
  }, [isOpen, initialText, type]);

  const handleGenerate = async (textToUse = originalText, typeToUse = selectedType) => {
    if (!textToUse || !textToUse.trim()) {
      error("Please enter some text to improve");
      return;
    }

    setLoading(true);
    try {
      const res = await aiService.improveContent({
        type: typeToUse,
        text: textToUse,
        targetJobTitle: targetJobTitle || "Software Engineer"
      });

      setImprovedText(res.improvedText || "");
      setChangesMade(res.changesMade || []);
      setRationale(res.rationale || "");
      success("AI suggestion generated!");
    } catch (err) {
      error("Failed to generate AI suggestion: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (improvedText) {
      onApply(improvedText);
      onClose();
      success("Applied AI improvement to resume!");
    }
  };

  if (!isOpen) return null;

  const toolOptions = [
    { id: 'SUMMARY', label: 'Professional Summary' },
    { id: 'EXPERIENCE', label: 'Quantified Experience' },
    { id: 'PROJECT', label: 'Technical Project' },
    { id: 'ATS_FRIENDLY', label: 'ATS Friendly' },
    { id: 'CONCISE', label: 'Make Concise' },
    { id: 'ACHIEVEMENTS', label: 'Impact Bullets' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{title}</h3>
              <p className="text-xs text-slate-500">Side-by-side comparison & factual enhancement</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Improvement Type Tabs */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
          {toolOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedType(opt.id);
                handleGenerate(originalText, opt.id);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedType === opt.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Modal Body - Side by Side comparison */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {/* Left Column: Original */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Original Content</label>
              <span className="text-[11px] text-slate-400 font-medium">Editable base</span>
            </div>
            <textarea
              rows={8}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste or write content to improve..."
              className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none flex-1 font-mono text-slate-800"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Regenerate AI Suggestion
            </button>
          </div>

          {/* Right Column: AI Suggestion */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-blue-700 uppercase tracking-wider">AI Suggested Version</label>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md">Optimized</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Fact-Preserving</span>
            </div>

            <div className="relative flex-1">
              {loading ? (
                <div className="w-full h-full min-h-[220px] bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center animate-bounce shadow-md">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-950">AI is polishing your phrasing...</p>
                    <p className="text-xs text-blue-600/80 mt-0.5">Strengthening verbs, formatting impact, maintaining facts</p>
                  </div>
                </div>
              ) : improvedText ? (
                <textarea
                  rows={8}
                  value={improvedText}
                  onChange={(e) => setImprovedText(e.target.value)}
                  className="w-full p-3.5 text-sm bg-blue-50/40 border border-blue-300/80 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none h-full font-mono text-slate-900 font-medium"
                />
              ) : (
                <div className="w-full h-full min-h-[220px] bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center p-6 text-slate-400 text-xs text-center">
                  Click 'Regenerate' or select an improvement mode to view AI suggestions.
                </div>
              )}
            </div>

            {/* Changes list & Rationale */}
            {changesMade.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 mt-1">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Applied Improvements:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {changesMade.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                {rationale && (
                  <p className="text-[11px] text-blue-700 bg-blue-50 p-2 rounded-lg mt-2 border border-blue-100 font-medium">
                    💡 <span className="font-semibold">Recruiter Rationale:</span> {rationale}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel / Reject
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleApply}
              disabled={!improvedText || loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
            >
              <Check className="w-4 h-4" />
              Accept & Apply AI Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
