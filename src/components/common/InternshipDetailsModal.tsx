import React, { useState } from 'react';
import { Internship } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  FileText, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface InternshipDetailsModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (internship: Internship) => void;
}

export const InternshipDetailsModal: React.FC<InternshipDetailsModalProps> = ({
  internship,
  isOpen,
  onClose,
  onApply
}) => {
  const { activeStudent, applications } = useApp();
  
  if (!isOpen || !internship) return null;

  const alreadyApplied = activeStudent 
    ? applications.some(a => a.internshipId === internship.id && a.studentId === activeStudent.id)
    : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              {internship.roleCategory}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">Openings: {internship.openings}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          
          {/* Title and Company Header */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {internship.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{internship.companyName}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {internship.location}
              </span>
            </div>
          </div>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Stipend</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                ₹{internship.stipendMonthly.toLocaleString()}/mo
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Duration</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {internship.duration}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Work Mode</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {internship.workType}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Apply By</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {internship.deadline}
              </div>
            </div>
          </div>

          {/* About The Role */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Role Overview
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {internship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {internship.responsibilities.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                Key Responsibilities
              </h3>
              <ul className="space-y-1.5 text-slate-600">
                {internship.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Required Technical Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {internship.requiredSkills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Academic Eligibility
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700">
              {internship.eligibility}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          {alreadyApplied ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You Have Already Applied for This Internship</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onApply(internship);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Apply for this Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
