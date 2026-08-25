import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">AI ResumeForge</span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">Production-Ready Full Stack Portfolio Architecture</span>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            Built with Java 17, Spring Boot, React, MySQL, OpenPDF & POI.
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} AI ResumeForge. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
