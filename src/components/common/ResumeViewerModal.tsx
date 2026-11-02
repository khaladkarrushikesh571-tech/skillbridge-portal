import React from 'react';
import { StudentProfile } from '../../types';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Award, Briefcase, Code } from 'lucide-react';

interface ResumeViewerModalProps {
  student: StudentProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Verified Candidate Resume
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-600">PRN: {student.prnNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Viewport */}
        <div className="p-8 overflow-y-auto space-y-6 bg-white font-sans text-slate-800">
          
          {/* Header Section */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {student.name}
                </h2>
                <p className="text-sm font-medium text-indigo-700 mt-0.5">
                  {student.degree} · Final Year 2026
                </p>
              </div>
              <div className="text-xs text-slate-500 space-y-1 sm:text-right">
                <div className="flex items-center gap-1 sm:justify-end">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.location}</span>
                </div>
              </div>
            </div>

            {student.bio && (
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {student.bio}
              </p>
            )}
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education & Academic Record
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {student.resume.education.degree || student.degree}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {student.resume.education.college || student.college}
                  </p>
                </div>
                <div className="text-xs font-medium text-slate-700 sm:text-right">
                  <span className="font-bold text-indigo-700">CGPA: {student.cgpa} / 10.0</span>
                  <div className="text-slate-500">Graduation: {student.graduationYear}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600" />
              Technical Proficiencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map(skill => (
                <div 
                  key={skill.id}
                  className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-800 border border-slate-200 flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({skill.level})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Academic & Personal Projects
            </h3>
            <div className="space-y-3">
              {student.projects.map(proj => (
                <div key={proj.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                    {proj.githubUrl && (
                      <span className="text-[11px] text-indigo-600 font-mono">GitHub Repo</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">Stack:</span>{' '}
                    {proj.techStack.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Skill Assessment Scores */}
          {student.assessmentScores.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                SkillBridge Verified Assessments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {student.assessmentScores.map(score => (
                  <div 
                    key={score.quizId}
                    className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{score.quizTitle}</div>
                      <div className="text-[11px] text-indigo-700 font-medium">{score.badge}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 font-mono">{score.percentage}%</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">Verified</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resume File Meta */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
            <span>Original Upload: {student.resume.fileName}</span>
            <span>Size: {student.resume.fileSize}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
