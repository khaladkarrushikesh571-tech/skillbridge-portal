import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, CompanyProfile, Internship, Application } from '../../types';
import { ResumeViewerModal } from '../common/ResumeViewerModal';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Briefcase, 
  FileSpreadsheet, 
  Database, 
  Download, 
  Printer, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Eye, 
  GraduationCap,
  ExternalLink,
  Trash2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    students, 
    companies, 
    internships, 
    applications, 
    exportDatabaseSQL, 
    exportApplicationsCSV,
    updateInternship,
    deleteInternship
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'companies' | 'internships' | 'applications' | 'reports'>('overview');
  
  // Student Resume Modal
  const [selectedStudentForResume, setSelectedStudentForResume] = useState<StudentProfile | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Search Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [internshipSearch, setInternshipSearch] = useState('');

  // Compute analytics
  const totalStudents = students.length;
  const totalCompanies = companies.length;
  const totalInternships = internships.length;
  const totalApps = applications.length;
  const selectedAppsCount = applications.filter(a => a.status === 'selected').length;
  const selectionRate = totalApps > 0 ? Math.round((selectedAppsCount / totalApps) * 100) : 0;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.prnNumber.includes(studentSearch) ||
    s.college.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.industry.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.location.toLowerCase().includes(companySearch.toLowerCase())
  );

  const filteredInternships = internships.filter(i =>
    i.title.toLowerCase().includes(internshipSearch.toLowerCase()) ||
    i.companyName.toLowerCase().includes(internshipSearch.toLowerCase())
  );

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Admin Top Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                University Placement Administration Console
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-purple-900/60 text-purple-200 border border-purple-700 rounded-md">
                TYBBA(CA) Coordinator
              </span>
            </div>
            
            <p className="text-xs text-slate-400 mt-1">
              Logged in as: <strong className="text-white">{currentUser?.name || 'Academic Administrator'}</strong> · SPPU Computer Applications Evaluation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={exportApplicationsCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportDatabaseSQL}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Download SQL (.sql)</span>
          </button>
        </div>
      </div>

      {/* Segmented Nav */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-px">
          {[
            { id: 'overview', label: 'Placement Analytics', icon: ShieldCheck },
            { id: 'students', label: `Manage Students (${students.length})`, icon: Users },
            { id: 'companies', label: `Registered Companies (${companies.length})`, icon: Building2 },
            { id: 'internships', label: `All Internships (${internships.length})`, icon: Briefcase },
            { id: 'applications', label: `Application Master Log (${applications.length})`, icon: FileSpreadsheet },
            { id: 'reports', label: 'Academic Reports & Export', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Enrolled Students</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {totalStudents}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Partner Companies</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {totalCompanies}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Live Openings</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {totalInternships}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Total Applications</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {totalApps}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-emerald-600 font-medium">Selection Rate</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">
                {selectionRate}%
              </div>
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recent Application Records */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Latest Applications Across Colleges</h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  View All Log
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {applications.slice(0, 5).map(app => (
                  <div key={app.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">{app.internshipTitle} · {app.companyName}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      app.status === 'selected' ? 'bg-emerald-50 text-emerald-700' :
                      app.status === 'shortlisted' ? 'bg-indigo-50 text-indigo-700' :
                      app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* University Department Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Academic Project Verification Audit</h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Database Normalization Level:</span>
                  <span className="font-bold text-slate-900 font-mono">BCNF / 3NF Compliant</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">XAMPP Server Host:</span>
                  <span className="font-bold text-slate-900 font-mono">localhost/skillbridge</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Security Protocols:</span>
                  <span className="font-bold text-emerald-700">Prepared Statements, RBAC</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Candidate Resume Format:</span>
                  <span className="font-bold text-slate-900 font-mono">PDF / Structured JSON</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: MANAGE STUDENTS */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Registered Students Directory</h3>
              <p className="text-xs text-slate-500">View academic PRN, CGPA, verified resumes, and assessment results</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                placeholder="Search by name, PRN, or college..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">PRN Number</th>
                  <th className="py-2.5 px-3">Degree & College</th>
                  <th className="py-2.5 px-3 text-right">CGPA</th>
                  <th className="py-2.5 px-3 text-center">Applications</th>
                  <th className="py-2.5 px-3 text-center">Skill Tests</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => {
                  const studentAppCount = applications.filter(a => a.studentId === student.id).length;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-500">{student.email}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">{student.prnNumber}</td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800">{student.degree}</div>
                        <div className="text-[11px] text-slate-500">{student.college}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-indigo-700 font-mono">
                        {student.cgpa}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">{studentAppCount}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px] font-semibold">
                          {student.assessmentScores.length} Passed
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedStudentForResume(student);
                            setIsResumeOpen(true);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium text-[11px] inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Resume</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE COMPANIES */}
      {activeTab === 'companies' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Partner Software Companies</h3>
              <p className="text-xs text-slate-500">Corporate recruiters registered to hire TYBBA(CA) graduates</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={companySearch}
                onChange={e => setCompanySearch(e.target.value)}
                placeholder="Search companies or locations..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredCompanies.map(company => (
              <div key={company.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{company.name}</h4>
                    <p className="text-xs text-slate-500">{company.industry}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>Location: <strong>{company.location}</strong></div>
                  <div>Email: <strong>{company.email}</strong></div>
                  <div>Phone: <strong>{company.phone}</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    Openings: {internships.filter(i => i.companyId === company.id).length}
                  </span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ALL INTERNSHIPS */}
      {activeTab === 'internships' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">All Internship Listings</h3>
              <p className="text-xs text-slate-500">Quality check and governance of company listings</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={internshipSearch}
                onChange={e => setInternshipSearch(e.target.value)}
                placeholder="Search listings..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredInternships.map(internship => (
              <div key={internship.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{internship.title}</div>
                  <div className="text-slate-500 mt-0.5">
                    {internship.companyName} · {internship.location} · {internship.duration} · ₹{internship.stipendMonthly.toLocaleString()}/mo
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateInternship(internship.id, {
                        featured: !internship.featured
                      });
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
                      internship.featured 
                        ? 'bg-amber-50 text-amber-800 border-amber-200' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {internship.featured ? 'Featured ★' : 'Feature Role'}
                  </button>

                  <button
                    onClick={() => deleteInternship(internship.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: APPLICATION MASTER LOG */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Master Audit Trail</h3>
              <p className="text-xs text-slate-500">Every student submission with recruiter feedback and interview status</p>
            </div>
            <button
              onClick={exportApplicationsCSV}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">Student Name (PRN)</th>
                  <th className="py-2.5 px-3">Internship Role</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Applied Date</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3">Recruiter Remarks / Interview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{app.studentPrn} · CGPA {app.studentCgpa}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">{app.internshipTitle}</td>
                    <td className="py-3 px-3 text-slate-600">{app.companyName}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono">{app.appliedAt}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        app.status === 'selected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        app.status === 'shortlisted' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {app.feedbackNotes || 'No notes added'}
                      {app.interviewDate && (
                        <div className="text-indigo-700 font-medium text-[11px] mt-0.5">
                          📅 {app.interviewDate}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: REPORTS & EXPORTS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Academic Project Deliverables & Reports</h3>
            <p className="text-xs text-slate-500">
              Generate documentation artifacts for college submission, practical exam viva voce, and SPPU committee review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">MySQL Database Export (.sql)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contains complete SQL DDL commands: tables creation with foreign keys, constraints, triggers, and sample data. Compatible with XAMPP phpMyAdmin.
              </p>
              <button
                onClick={exportDatabaseSQL}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download skillbridge_db.sql</span>
              </button>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Placement Summary CSV Report</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exports all candidate records, PRN numbers, CGPA, target companies, roles, and status outcomes for placement committee audits.
              </p>
              <button
                onClick={exportApplicationsCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download applications_report.csv</span>
              </button>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Report Generated at: {new Date().toLocaleDateString()}
            </span>
            <button
              onClick={handlePrintSummary}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Placement Report Summary</span>
            </button>
          </div>

        </div>
      )}

      {/* Resume Viewer Modal */}
      <ResumeViewerModal
        student={selectedStudentForResume}
        isOpen={isResumeOpen}
        onClose={() => {
          setIsResumeOpen(false);
          setSelectedStudentForResume(null);
        }}
      />

    </div>
  );
};
