import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssessmentQuiz, Internship } from '../../types';
import { QuizModal } from './QuizModal';
import { ResumeViewerModal } from '../common/ResumeViewerModal';
import { 
  User, 
  Briefcase, 
  FileText, 
  Award, 
  Settings, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Upload, 
  Plus, 
  Trash2, 
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Filter,
  GraduationCap
} from 'lucide-react';

interface StudentDashboardProps {
  onViewInternshipDetails: (internship: Internship) => void;
  onApplyInternship: (internship: Internship) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onViewInternshipDetails,
  onApplyInternship
}) => {
  const { 
    activeStudent, 
    applications, 
    internships, 
    quizzes, 
    updateStudentProfile,
    updateResume 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'internships' | 'applications' | 'skills' | 'resume' | 'profile'>('overview');
  
  // Modals
  const [selectedQuiz, setSelectedQuiz] = useState<AssessmentQuiz | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  // Filters for Find Internships
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [minStipend, setMinStipend] = useState(0);

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newSkillCategory, setNewSkillCategory] = useState<'Frontend' | 'Backend' | 'Database' | 'Tools'>('Backend');

  // Resume Upload Simulation
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  if (!activeStudent) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-sm text-slate-500">Please sign in with a student account to access this portal.</p>
      </div>
    );
  }

  // Filter student's applications
  const myApplications = applications.filter(a => a.studentId === activeStudent.id);
  const pendingCount = myApplications.filter(a => a.status === 'pending').length;
  const shortlistedCount = myApplications.filter(a => a.status === 'shortlisted').length;
  const selectedCount = myApplications.filter(a => a.status === 'selected').length;

  // Filter available internships
  const availableInternships = internships.filter(item => {
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMode = selectedWorkMode === 'All' || item.workType === selectedWorkMode;
    const matchesDomain = selectedDomain === 'All' || item.roleCategory === selectedDomain;
    const matchesStipend = item.stipendMonthly >= minStipend;

    return matchesQuery && matchesMode && matchesDomain && matchesStipend;
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: newSkillCategory
    };

    updateStudentProfile({
      skills: [...activeStudent.skills, newSkill]
    });
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillId: string) => {
    updateStudentProfile({
      skills: activeStudent.skills.filter(s => s.id !== skillId)
    });
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate PDF/DOC
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.pdf')) {
        alert('Please upload a valid PDF or Word document (.pdf, .docx)');
        return;
      }

      const sizeKb = Math.round(file.size / 1024);
      updateResume({
        ...activeStudent.resume,
        fileName: file.name,
        fileSize: `${sizeKb} KB`,
        uploadedAt: new Date().toISOString().split('T')[0]
      });

      setUploadSuccessMsg(`Successfully uploaded & parsed ${file.name} (${sizeKb} KB)`);
      setTimeout(() => setUploadSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Student Welcome & Identity Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            {activeStudent.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {activeStudent.name}
              </h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                Verified Student
              </span>
            </div>
            
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{activeStudent.degree}</span>
              <span>·</span>
              <span className="font-mono">PRN: {activeStudent.prnNumber}</span>
              <span>·</span>
              <span className="font-semibold text-slate-700">CGPA: {activeStudent.cgpa} / 10.0</span>
              <span>·</span>
              <span>{activeStudent.college}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsResumePreviewOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Find Internships</span>
          </button>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-px">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'internships', label: 'Find Internships', icon: Briefcase },
            { id: 'applications', label: `My Applications (${myApplications.length})`, icon: Clock },
            { id: 'skills', label: 'Skills & Assessments', icon: Award },
            { id: 'resume', label: 'My Resume', icon: FileText },
            { id: 'profile', label: 'Profile Settings', icon: Settings },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Total Applied</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {myApplications.length}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-amber-600 font-medium">Under Review</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {pendingCount}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-indigo-600 font-medium">Shortlisted</div>
              <div className="text-2xl font-bold text-indigo-600 mt-1 font-mono tabular-nums">
                {shortlistedCount}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-emerald-600 font-medium">Offers / Selected</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">
                {selectedCount}
              </div>
            </div>
          </div>

          {/* Recent Applications Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Applications</h3>
                <p className="text-xs text-slate-500">Real-time status updates from corporate recruiters</p>
              </div>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            </div>

            {myApplications.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500">You haven't applied to any internships yet.</p>
                <button
                  onClick={() => setActiveTab('internships')}
                  className="mt-2 text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Browse available openings
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {myApplications.map(app => (
                  <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{app.internshipTitle}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{app.companyName}</span>
                        <span>·</span>
                        <span>Applied on {app.appliedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md capitalize ${
                        app.status === 'selected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        app.status === 'shortlisted' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {app.status === 'pending' ? 'Pending Review' : app.status}
                      </span>

                      {app.interviewDate && (
                        <div className="text-[11px] text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                          Interview: {app.interviewDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skill Bridge Assessment Recommendations */}
          <div className="bg-indigo-50/60 rounded-xl border border-indigo-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                Verified Skill Assessments
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Boost Your Placement Shortlist Probability by 2.4x
              </h4>
              <p className="text-xs text-slate-600 max-w-xl">
                Take our timed 10-minute MCQ assessments in PHP/MySQL, Web Development, or DBMS to earn verified skill badges visible to recruiters.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('skills')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              Take Skill Test
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: FIND INTERNSHIPS */}
      {activeTab === 'internships' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by role, company, or tech stack..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedDomain}
                  onChange={e => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  <option value="All">All Tech Stacks</option>
                  <option value="PHP & Backend">PHP & Backend</option>
                  <option value="Web Development">Web & React</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Software Testing">Software Testing</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={selectedWorkMode}
                  onChange={e => setSelectedWorkMode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  <option value="All">All Modes</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={minStipend}
                  onChange={e => setMinStipend(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  <option value={0}>Any Stipend</option>
                  <option value={10000}>₹10,000+/mo</option>
                  <option value={15000}>₹15,000+/mo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Internships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableInternships.map(internship => {
              const alreadyApplied = applications.some(
                a => a.internshipId === internship.id && a.studentId === activeStudent.id
              );

              return (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {internship.title}
                        </h3>
                        <div className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{internship.companyName}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md shrink-0">
                        {internship.workType}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {internship.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {internship.duration}
                      </span>
                      <span>·</span>
                      <span className="font-semibold text-slate-900 font-mono">
                        ₹{internship.stipendMonthly.toLocaleString()}/mo
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {internship.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {internship.requiredSkills.map(s => (
                        <span 
                          key={s}
                          className="px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewInternshipDetails(internship)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2"
                    >
                      View Details
                    </button>

                    {alreadyApplied ? (
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-medium rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => onApplyInternship(internship)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 3: MY APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Application Tracking Pipeline</h3>
              <p className="text-xs text-slate-500">Monitor status changes, recruiter feedback, and interview schedules</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Total: {myApplications.length}
            </span>
          </div>

          {myApplications.length === 0 ? (
            <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">No applications submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myApplications.map(app => (
                <div key={app.id} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.internshipTitle}</h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{app.companyName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px] ${
                        app.status === 'selected' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        app.status === 'shortlisted' ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {app.status === 'pending' ? 'Under Review' : app.status}
                      </span>
                    </div>
                  </div>

                  {/* Recruiter Notes or Feedback */}
                  {app.feedbackNotes && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                      <div className="font-semibold text-slate-700 mb-0.5">Recruiter Feedback / Notes:</div>
                      <p className="text-slate-600">{app.feedbackNotes}</p>
                    </div>
                  )}

                  {/* Interview Alert */}
                  {app.interviewDate && (
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-indigo-900">Scheduled Interview:</span>{' '}
                        <span className="font-mono text-indigo-700">{app.interviewDate}</span>
                        {app.interviewMode && (
                          <div className="text-[11px] text-indigo-600 mt-0.5">Mode: {app.interviewMode}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Applied Date: {app.appliedAt}</span>
                    <span>Application ID: {app.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SKILLS & ASSESSMENTS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          
          {/* Skill Assessments Quizzes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">SkillBridge Verified Assessments</h3>
              <p className="text-xs text-slate-500">
                Complete objective MCQs designed around the TYBBA(CA) syllabus to validate your programming proficiencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quizzes.map(quiz => {
                const pastResult = activeStudent.assessmentScores.find(s => s.quizId === quiz.id);

                return (
                  <div 
                    key={quiz.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                        {quiz.category}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60">
                      {pastResult ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Passed ({pastResult.percentage}%)
                            </span>
                            <div className="text-[10px] text-slate-500">{pastResult.badge}</div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setIsQuizOpen(true);
                            }}
                            className="text-xs font-semibold text-indigo-600 hover:underline"
                          >
                            Retake
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedQuiz(quiz);
                            setIsQuizOpen(true);
                          }}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Start Assessment</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manage Student Skills */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Technical Skills Portfolio</h3>
                <p className="text-xs text-slate-500">Add languages, databases, or frameworks you have mastered</p>
              </div>
            </div>

            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2">
              {activeStudent.skills.map(skill => (
                <div 
                  key={skill.id}
                  className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-indigo-600 font-semibold">· {skill.level}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill Form */}
            <form onSubmit={handleAddSkill} className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                placeholder="e.g. Laravel, Spring Boot, MySQL..."
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 min-w-[180px]"
              />

              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={newSkillCategory}
                onChange={e => setNewSkillCategory(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
              </select>

              <button
                type="submit"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </form>

          </div>

        </div>
      )}

      {/* TAB 5: MY RESUME */}
      {activeTab === 'resume' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Resume & CV Management</h3>
              <p className="text-xs text-slate-500">
                Upload your updated resume or preview the parsed document sent to companies
              </p>
            </div>

            <button
              onClick={() => setIsResumePreviewOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview & Print Resume</span>
            </button>
          </div>

          {/* Current Uploaded Resume Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                PDF
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{activeStudent.resume.fileName}</div>
                <div className="text-[11px] text-slate-500">
                  Size: {activeStudent.resume.fileSize} · Uploaded: {activeStudent.resume.uploadedAt}
                </div>
              </div>
            </div>

            {/* Upload / Replace Input */}
            <div>
              <label className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-300 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Replace Resume PDF</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {uploadSuccessMsg && (
            <div className="p-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          {/* Structured Resume Content Preview Box */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Parsed Resume Summary
            </h4>
            
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-3">
              <div>
                <span className="font-semibold text-slate-700">Career Objective / Summary:</span>
                <p className="text-slate-600 mt-0.5">{activeStudent.resume.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-700">Academic Program:</span>
                  <p className="text-slate-600 mt-0.5">{activeStudent.resume.education.degree}</p>
                  <p className="text-slate-500 text-[11px]">{activeStudent.resume.education.college}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">CGPA:</span>
                  <p className="text-slate-600 mt-0.5 font-mono">{activeStudent.resume.education.cgpa}</p>
                  <p className="text-slate-500 text-[11px]">Year: {activeStudent.resume.education.passingYear}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Profile & Academic Record</h3>
            <p className="text-xs text-slate-500">
              Information shared with verified recruiters during internship application review
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={activeStudent.name}
                onChange={e => updateStudentProfile({ name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={activeStudent.email}
                disabled
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">University PRN Number</label>
              <input
                type="text"
                value={activeStudent.prnNumber}
                onChange={e => updateStudentProfile({ prnNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current CGPA</label>
              <input
                type="text"
                value={activeStudent.cgpa}
                onChange={e => updateStudentProfile({ cgpa: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">College Name</label>
              <input
                type="text"
                value={activeStudent.college}
                onChange={e => updateStudentProfile({ college: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={activeStudent.phone}
                onChange={e => updateStudentProfile({ phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Professional Bio / About</label>
              <textarea
                rows={3}
                value={activeStudent.bio}
                onChange={e => updateStudentProfile({ bio: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal
        quiz={selectedQuiz}
        isOpen={isQuizOpen}
        onClose={() => {
          setIsQuizOpen(false);
          setSelectedQuiz(null);
        }}
      />

      {/* Resume Viewer Modal */}
      <ResumeViewerModal
        student={activeStudent}
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
      />

    </div>
  );
};
