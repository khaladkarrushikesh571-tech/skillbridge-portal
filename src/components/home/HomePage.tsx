import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Internship } from '../../types';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Database,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onApplyInternship: (internship: Internship) => void;
  onViewInternshipDetails: (internship: Internship) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onSelectTab, 
  onApplyInternship,
  onViewInternshipDetails
}) => {
  const { internships, students, companies, language, quickLogin } = useApp();
  const t = translations[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');

  // Filter internships
  const filteredInternships = internships.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'All' || item.roleCategory === selectedRoleFilter;
    const matchesType = selectedWorkType === 'All' || item.workType === selectedWorkType;

    return matchesSearch && matchesRole && matchesType;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Academic University Header Kicker (No Pill, Clean Typography) */}
              <div className="text-xs font-semibold tracking-wide text-indigo-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                {t.heroHeading}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.heroSubheading}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectTab('internships')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{t.exploreInternshipsBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectTab('academic')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap border border-slate-300/80"
                >
                  <Database className="w-4 h-4 text-slate-600" />
                  <span>{t.viewProjectDocsBtn}</span>
                </button>
              </div>

              {/* Key Highlights / Academic Trust */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Role-Based Access Control
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3NF Normalized MySQL Schema
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Live Resume Parsing & Preview
                </span>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">
                <img 
                  src="/src/assets/images/skillbridge_hero_students_1791824059428.jpg" 
                  alt="TYBBA(CA) Students Collaborating on Tech Projects" 
                  className="w-full h-[360px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Bottom Card Over Scrim */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent text-white">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">SPPU College Tech Corridor</div>
                      <div className="text-slate-300 text-[11px]">Connecting TYBBA(CA) Talent with Pune IT Hubs</div>
                    </div>
                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur rounded text-[11px] font-mono">
                      2025-26 Batch
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Full-Width Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                {internships.length}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {t.metricInternships}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                {companies.length}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {t.metricCompanies}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                {students.length}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {t.metricStudents}
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight font-mono tabular-nums">
                ₹15,000
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {t.metricStipend} / mo
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Internships & Instant Search Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              Active Industry Openings
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Featured Internships for Final Year Students
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Verified openings with competitive stipends across Pune, Mumbai, and Remote options.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('internships')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All {internships.length} Openings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by role (e.g. PHP, React, Data Analyst, QA)..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Role Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedRoleFilter}
                onChange={e => setSelectedRoleFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="All">All Tech Stacks</option>
                <option value="PHP & Backend">PHP & Backend</option>
                <option value="Web Development">Web & React</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Software Testing">Software Testing (QA)</option>
              </select>
            </div>

            {/* Work Mode Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedWorkType}
                onChange={e => setSelectedWorkType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="All">All Locations & Modes</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site (Office)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.slice(0, 6).map(internship => (
            <div 
              key={internship.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Company & Mode */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {internship.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">{internship.companyName}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md shrink-0">
                    {internship.workType}
                  </span>
                </div>

                {/* Metadata Row: Location, Duration, Stipend */}
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

                {/* Brief Description */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {internship.description}
                </p>

                {/* Required Skills (Rendered as clean tags) */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {internship.requiredSkills.slice(0, 4).map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                  {internship.requiredSkills.length > 4 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                      +{internship.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewInternshipDetails(internship)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2"
                >
                  View Details
                </button>
                <button
                  onClick={() => onApplyInternship(internship)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 4. Three Core Portal Modules (As requested in prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            System Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Role-Based Portal Workflows
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Carefully architected modules for TYBBA(CA) final year evaluation, covering every stakeholder in the college placement life cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Student Portal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                1. Student Portal
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Centralized student workspace for academic profiles, technical projects, verified assessments, and direct application status pipelines.
              </p>
              
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Profile, PRN, CGPA & academic credentials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Interactive resume builder & PDF preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Live application tracking (Shortlisted/Selected)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Timed MCQ skill tests (PHP, SQL, Web Dev)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                quickLogin('student', students[0]?.id);
                onSelectTab('student');
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Company Portal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                2. Company Portal
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Recruitment workspace allowing partner software firms to post positions, review candidate resumes, and manage interview schedules.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Post & edit technical internship listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Screen applicant profiles & download resumes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Update status (Pending → Shortlisted → Offer)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Schedule technical interviews with remarks</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                quickLogin('company', companies[0]?.id);
                onSelectTab('company');
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Company Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Admin Portal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                3. Admin Portal
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Administrative monitoring console for college placement coordinators and faculty to monitor placement drives and export reports.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Overall placement metrics & selection rate</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verify and approve registered IT companies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Audit student applications across all batches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Export placement reports (CSV / Print Summary)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                quickLogin('admin');
                onSelectTab('admin');
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Company Workspaces Banner & College Placement Collaboration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl overflow-hidden shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-300">
                Industry & Academia Bridge
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed for Pune & Maharashtra Tech Placement Drives
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                SkillBridge matches students from TYBBA(CA), BCA, and B.Sc(CS) backgrounds with enterprise software companies in Hinjawadi, Magarpatta, BKC Mumbai, and beyond.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectTab('academic')}
                  className="px-4 py-2.5 bg-white text-slate-900 font-semibold text-xs rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Explore Database Schema & ERD</span>
                </button>
                <button
                  onClick={() => {
                    quickLogin('student', 'stud-1');
                    onSelectTab('student');
                  }}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Take Skill Assessment Test</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-full min-h-[260px] relative">
              <img 
                src="/src/assets/images/company_office_workspace_1791824073073.jpg" 
                alt="Pune Software Engineering Office" 
                className="w-full h-full object-cover min-h-[280px]"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
