import React, { useState } from 'react';
import { Internship } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Send, CheckCircle2, FileText, User, AlertCircle, Building2 } from 'lucide-react';

interface ApplyInternshipModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ApplyInternshipModal: React.FC<ApplyInternshipModalProps> = ({
  internship,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { activeStudent, currentRole, quickLogin, applyForInternship, students } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !internship) return null;

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentRole !== 'student' || !activeStudent) {
      setErrorMsg('Please select or log in with a student profile to apply.');
      return;
    }

    const res = applyForInternship(internship.id, coverNote);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg('');
        onSuccess();
        onClose();
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Submit Application
            </h3>
            <p className="text-xs text-slate-500">
              {internship.title} · {internship.companyName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If not logged in as student */}
        {currentRole !== 'student' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>You are currently not signed in as a student</span>
            </div>
            <p className="text-amber-800">
              Switch to Rahul Sharma (TYBBA(CA)) with one click to test candidate application submission:
            </p>
            <button
              type="button"
              onClick={() => quickLogin('student', students[0]?.id)}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors"
            >
              Switch to Rahul Sharma (Student)
            </button>
          </div>
        )}

        {/* Candidate Profile Summary Box */}
        {activeStudent && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Applying as: {activeStudent.name}</span>
              <span className="font-mono text-indigo-700 font-semibold">CGPA: {activeStudent.cgpa}</span>
            </div>
            <div className="text-slate-500 text-[11px] space-y-0.5">
              <div>PRN: {activeStudent.prnNumber} · {activeStudent.degree}</div>
              <div>College: {activeStudent.college}</div>
              <div className="flex items-center gap-1 text-slate-700 pt-1">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Attached Resume: <strong>{activeStudent.resume.fileName}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Cover Note / Why are you a good fit for this role?
            </label>
            <textarea
              rows={4}
              value={coverNote}
              onChange={e => setCoverNote(e.target.value)}
              placeholder="Highlight relevant course projects, programming languages (PHP, SQL, React), and availability..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!activeStudent}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Submit Application</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
