import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship, Application, StudentProfile } from '../../types';
import { ResumeViewerModal } from '../common/ResumeViewerModal';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Eye, 
  Search, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const { 
    activeCompany, 
    internships, 
    applications, 
    students,
    postInternship, 
    updateInternship, 
    deleteInternship,
    updateApplicationStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'applicants' | 'post-new' | 'profile'>('listings');
  
  // Selected student for resume view
  const [selectedStudentForResume, setSelectedStudentForResume] = useState<StudentProfile | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Application Review state
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [internshipFilter, setInternshipFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalFeedback, setModalFeedback] = useState('');
  const [modalInterviewDate, setModalInterviewDate] = useState('');
  const [modalInterviewMode, setModalInterviewMode] = useState<Application['interviewMode']>('Online (Google Meet)');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<Application['status']>('shortlisted');

  // Form state for Post New Internship
  const [newTitle, setNewTitle] = useState('');
  const [newRoleCategory, setNewRoleCategory] = useState<Internship['roleCategory']>('PHP & Backend');
  const [newWorkType, setNewWorkType] = useState<Internship['workType']>('Hybrid');
  const [newLocation, setNewLocation] = useState('Hinjawadi, Pune');
  const [newDuration, setNewDuration] = useState('6 Months');
  const [newStipend, setNewStipend] = useState(15000);
  const [newOpenings, setNewOpenings] = useState(2);
  const [newSkillsStr, setNewSkillsStr] = useState('PHP, MySQL, JavaScript, HTML5');
  const [newDescription, setNewDescription] = useState('');
  const [newEligibility, setNewEligibility] = useState('TYBBA(CA) / BCA final year students');
  const [newDeadline, setNewDeadline] = useState('2026-06-30');
  const [postSuccessMsg, setPostSuccessMsg] = useState('');

  if (!activeCompany) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-sm text-slate-500">Please sign in with a company account to access this portal.</p>
      </div>
    );
  }

  // Filter company's listings and received applications
  const myInternships = internships.filter(i => i.companyId === activeCompany.id);
  const myApplications = applications.filter(a => a.companyId === activeCompany.id);

  const pendingApps = myApplications.filter(a => a.status === 'pending');
  const shortlistedApps = myApplications.filter(a => a.status === 'shortlisted');
  const selectedApps = myApplications.filter(a => a.status === 'selected');

  const filteredApplications = myApplications.filter(app => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesInternship = internshipFilter === 'All' || app.internshipId === internshipFilter;
    return matchesStatus && matchesInternship;
  });

  const handleCreateInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const skillsArray = newSkillsStr.split(',').map(s => s.trim()).filter(Boolean);

    postInternship({
      title: newTitle.trim(),
      roleCategory: newRoleCategory,
      workType: newWorkType,
      location: newLocation,
      companyLocation: activeCompany.location,
      duration: newDuration,
      stipendMonthly: Number(newStipend),
      openings: Number(newOpenings),
      requiredSkills: skillsArray,
      description: newDescription || `Exciting internship opportunity for TYBBA(CA) students at ${activeCompany.name}.`,
      responsibilities: [
        'Collaborate with senior software engineers on product sprints',
        'Write modular, well-tested code following best engineering practices',
        'Participate in daily standup and code review sessions'
      ],
      eligibility: newEligibility,
      deadline: newDeadline,
      status: 'active'
    });

    setPostSuccessMsg('Internship listing posted successfully and is now live for student applications!');
    setTimeout(() => {
      setPostSuccessMsg('');
      setActiveTab('listings');
    }, 1500);

    // Reset fields
    setNewTitle('');
    setNewDescription('');
  };

  const handleOpenStatusModal = (app: Application, status: Application['status']) => {
    setSelectedApp(app);
    setTargetStatus(status);
    setModalFeedback(app.feedbackNotes || '');
    setModalInterviewDate(app.interviewDate || '2026-04-10 11:00 AM');
    setModalInterviewMode(app.interviewMode || 'Online (Google Meet)');
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedApp) return;

    updateApplicationStatus(
      selectedApp.id,
      targetStatus,
      modalFeedback,
      targetStatus === 'shortlisted' ? modalInterviewDate : undefined,
      targetStatus === 'shortlisted' ? modalInterviewMode : undefined
    );

    setIsStatusModalOpen(false);
    setSelectedApp(null);
  };

  const handleViewResume = (studentId: string) => {
    const foundStudent = students.find(s => s.id === studentId);
    if (foundStudent) {
      setSelectedStudentForResume(foundStudent);
      setIsResumeOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Company Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            {activeCompany.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {activeCompany.name}
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                Verified Hiring Partner
              </span>
            </div>
            
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{activeCompany.industry}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {activeCompany.location}
              </span>
              <span>·</span>
              <span>{activeCompany.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('post-new')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Internship</span>
          </button>
        </div>
      </div>

      {/* Segmented Nav */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-px">
          {[
            { id: 'listings', label: `Our Listings (${myInternships.length})`, icon: Briefcase },
            { id: 'applicants', label: `Candidate Applications (${myApplications.length})`, icon: Users },
            { id: 'post-new', label: 'Post Internship', icon: Plus },
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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Active Openings</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {myInternships.filter(i => i.status === 'active').length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-amber-600 font-medium">Total Applicants</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {myApplications.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-indigo-600 font-medium">Shortlisted for Rounds</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1 font-mono tabular-nums">
            {shortlistedApps.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-emerald-600 font-medium">Offers Issued</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">
            {selectedApps.length}
          </div>
        </div>
      </div>

      {/* TAB 1: LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Your Posted Internship Roles</h3>
            <button
              onClick={() => setActiveTab('post-new')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Post Another Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myInternships.map(internship => (
              <div 
                key={internship.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{internship.title}</h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {internship.roleCategory} · {internship.workType} · {internship.location}
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    internship.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {internship.status === 'active' ? 'Active' : 'Closed'}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-4">
                  <span>Openings: <strong className="font-mono">{internship.openings}</strong></span>
                  <span>Stipend: <strong className="font-mono">₹{internship.stipendMonthly.toLocaleString()}</strong>/mo</span>
                  <span>Deadline: <span className="font-mono">{internship.deadline}</span></span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {internship.requiredSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    Applicants: {applications.filter(a => a.internshipId === internship.id).length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateInternship(internship.id, {
                          status: internship.status === 'active' ? 'closed' : 'active'
                        });
                      }}
                      className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded border border-slate-200"
                    >
                      {internship.status === 'active' ? 'Close Posting' : 'Reactivate'}
                    </button>
                    <button
                      onClick={() => {
                        setInternshipFilter(internship.id);
                        setActiveTab('applicants');
                      }}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium rounded"
                    >
                      View Candidates
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICANTS REVIEW */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Candidate Screening & Applications</h3>
              <p className="text-xs text-slate-500">
                Review applicant qualifications, PRN, CGPA, verified resumes, and update recruitment status
              </p>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={internshipFilter}
                onChange={e => setInternshipFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Roles</option>
                {myInternships.map(i => (
                  <option key={i.id} value={i.id}>{i.title}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">No candidate applications matching this filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredApplications.map(app => (
                <div key={app.id} className="py-4 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{app.studentName}</h4>
                        <span className="text-[11px] font-mono text-slate-500">PRN: {app.studentPrn}</span>
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          CGPA: {app.studentCgpa}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mt-1">
                        Applied for: <strong>{app.internshipTitle}</strong> · Date: {app.appliedAt}
                      </div>

                      {app.coverNote && (
                        <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                          <strong className="text-slate-700">Cover Note:</strong> {app.coverNote}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleViewResume(app.studentId)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        <span>View Resume</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenStatusModal(app, 'shortlisted')}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            app.status === 'shortlisted'
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                          }`}
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() => handleOpenStatusModal(app, 'selected')}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            app.status === 'selected'
                              ? 'bg-emerald-600 text-white font-semibold'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          Select / Offer
                        </button>

                        <button
                          onClick={() => handleOpenStatusModal(app, 'rejected')}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            app.status === 'rejected'
                              ? 'bg-red-600 text-white font-semibold'
                              : 'bg-red-50 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feedback / Interview Row */}
                  {(app.feedbackNotes || app.interviewDate) && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="text-slate-600">
                        <strong className="text-slate-800">Recruiter Notes:</strong> {app.feedbackNotes || 'No notes added'}
                      </div>
                      {app.interviewDate && (
                        <div className="text-indigo-700 font-medium">
                          Interview: {app.interviewDate} ({app.interviewMode})
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: POST NEW INTERNSHIP */}
      {activeTab === 'post-new' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Post a New Technical Internship</h3>
            <p className="text-xs text-slate-500">
              Create an opportunity for TYBBA(CA) and Computer Applications students in Pune / Maharashtra
            </p>
          </div>

          {postSuccessMsg && (
            <div className="p-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{postSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateInternship} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Internship Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. PHP & Laravel Backend Intern"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Category</label>
                <select
                  value={newRoleCategory}
                  onChange={e => setNewRoleCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="PHP & Backend">PHP & Backend</option>
                  <option value="Web Development">Web Development / React</option>
                  <option value="Full Stack">Full Stack Development</option>
                  <option value="Data Analytics">Data Analytics & SQL</option>
                  <option value="Software Testing">Software Testing (QA)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Type</label>
                <select
                  value={newWorkType}
                  onChange={e => setNewWorkType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site (Office)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Stipend (₹)</label>
                <input
                  type="number"
                  value={newStipend}
                  onChange={e => setNewStipend(Number(e.target.value))}
                  placeholder="15000"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Openings Count</label>
                <input
                  type="number"
                  value={newOpenings}
                  onChange={e => setNewOpenings(Number(e.target.value))}
                  placeholder="2"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={e => setNewDuration(e.target.value)}
                  placeholder="6 Months"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={newSkillsStr}
                onChange={e => setNewSkillsStr(e.target.value)}
                placeholder="PHP, MySQL, JavaScript, HTML5/CSS3"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Description & Responsibilities</label>
              <textarea
                rows={4}
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Describe project responsibilities, team environment, and learning outcomes..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={newEligibility}
                  onChange={e => setNewEligibility(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={e => setNewDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Publish Internship Listing</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recruiter Action Modal for Changing Candidate Status */}
      {isStatusModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Update Status for {selectedApp.studentName}
              </h3>
              <p className="text-xs text-slate-500">
                Target Status: <strong className="uppercase text-indigo-700">{targetStatus}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recruiter Feedback / Evaluation Remarks
                </label>
                <textarea
                  rows={3}
                  value={modalFeedback}
                  onChange={e => setModalFeedback(e.target.value)}
                  placeholder="e.g. Scored 90% in assessment; strong PHP and MySQL fundamentals..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {targetStatus === 'shortlisted' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Technical Interview Date & Time
                    </label>
                    <input
                      type="text"
                      value={modalInterviewDate}
                      onChange={e => setModalInterviewDate(e.target.value)}
                      placeholder="e.g. 2026-04-10 11:30 AM"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Interview Mode
                    </label>
                    <select
                      value={modalInterviewMode}
                      onChange={e => setModalInterviewMode(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Online (Google Meet)">Online (Google Meet)</option>
                      <option value="In-person Office">In-person Office</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Confirm Status Update
              </button>
            </div>
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
