import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Database, Download, FileText, RefreshCw, GraduationCap } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { language, exportDatabaseSQL, resetToDemoData } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Project Overview */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                SB
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                SkillBridge
              </span>
              <span className="text-xs text-slate-400">· TYBBA(CA) Final Year</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Student Skill & Internship Management System designed for Bachelor of Business Administration (Computer Applications) degree evaluation. Integrates student skills profile, company job postings, resume repository, and verified hiring pipelines.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Department of Computer Applications
              </span>
              <span>·</span>
              <span>Pune / Maharashtra</span>
            </div>
          </div>

          {/* Column 2: System Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Application Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('student')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Student Profile & Resume Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('company')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Company Job Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Administrative Analytics Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academic')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  ER Diagram & MySQL Schema
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic & Viva Tools */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Academic Submission Tools
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={exportDatabaseSQL}
                className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-indigo-300 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  Download MySQL (.sql)
                </span>
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onSelectTab('academic')}
                className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Viva Voce Q&A Cheat Sheet
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">15 Questions</span>
              </button>

              <button
                onClick={resetToDemoData}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                title="Reset local storage back to clean initial demo state"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Demo Database
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            SkillBridge &copy; 2026. Built for TYBBA(CA) Final Year Project & College Examination.
          </p>
          <div className="flex items-center gap-4">
            <span>Tech Stack: React · PHP/MySQL · Tailwind CSS</span>
            <span>·</span>
            <span className="text-slate-400">XAMPP Localhost Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
