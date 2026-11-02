import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship } from '../../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Briefcase,
  Filter,
  Check
} from 'lucide-react';

interface InternshipDirectoryProps {
  onViewDetails: (internship: Internship) => void;
  onApply: (internship: Internship) => void;
}

export const InternshipDirectory: React.FC<InternshipDirectoryProps> = ({
  onViewDetails,
  onApply
}) => {
  const { internships, applications, activeStudent } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [minStipend, setMinStipend] = useState(0);

  const filtered = internships.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'All' || item.roleCategory === selectedRole;
    const matchesWork = selectedWorkType === 'All' || item.workType === selectedWorkType;
    const matchesStipend = item.stipendMonthly >= minStipend;

    return matchesSearch && matchesRole && matchesWork && matchesStipend;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Directory Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          Explore Industry Openings
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Verified Internships for TYBBA(CA) & Computer Applications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse verified technical internship roles across Pune, Mumbai, Bengaluru, and remote opportunities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title, skill (PHP, MySQL, React), or city..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="PHP & Backend">PHP & Backend</option>
              <option value="Web Development">Web Development</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Software Testing">Software Testing (QA)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedWorkType}
              onChange={e => setSelectedWorkType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            >
              <option value="All">All Work Modes</option>
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
              <option value={18000}>₹18,000+/mo</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filtered.length} of {internships.length} internship positions</span>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRole('All');
              setSelectedWorkType('All');
              setMinStipend(0);
            }}
            className="text-indigo-600 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Internships Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500">No internship postings match your search filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRole('All');
              setSelectedWorkType('All');
              setMinStipend(0);
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(internship => {
            const alreadyApplied = activeStudent 
              ? applications.some(a => a.internshipId === internship.id && a.studentId === activeStudent.id)
              : false;

            return (
              <div 
                key={internship.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {internship.title}
                      </h3>
                      <div className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1.5">
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
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {internship.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
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
                    {internship.requiredSkills.map(skill => (
                      <span 
                        key={skill}
                        className="px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewDetails(internship)}
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
                      onClick={() => onApply(internship)}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
