import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { UserRole } from '../../types';
import { X, User, Building2, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { language, login, registerStudent, registerCompany, quickLogin, students, companies } = useApp();
  const t = translations[language];

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('student');
  
  // Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register Form - Student
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentPrn, setStudentPrn] = useState('');
  const [studentCollege, setStudentCollege] = useState('Modern College of Arts, Science and Commerce, Pune');
  const [studentCgpa, setStudentCgpa] = useState('8.50');
  
  // Register Form - Company
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('Software Services & Cloud');
  const [companyLocation, setCompanyLocation] = useState('Hinjawadi, Pune');
  const [companyPhone, setCompanyPhone] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email) {
      setErrorMsg('Please enter an email address');
      return;
    }
    
    const success = login(email, role);
    if (success) {
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 400);
    } else {
      setErrorMsg('User not found. Try one of the preloaded demo accounts below or register.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'student') {
      if (!studentName || !email || !studentPrn) {
        setErrorMsg('Please fill in Name, Email and University PRN');
        return;
      }

      registerStudent({
        name: studentName,
        email,
        phone: studentPhone || '+91 98000 00000',
        prnNumber: studentPrn,
        college: studentCollege,
        degree: 'TYBBA(CA) - Computer Applications',
        semester: 'Semester VI',
        graduationYear: '2026',
        cgpa: studentCgpa,
        location: 'Pune, Maharashtra',
        bio: 'TYBBA(CA) student eager to explore IT internships.',
        skills: [
          { id: `sk-${Date.now()}-1`, name: 'PHP & MySQL', level: 'Intermediate', category: 'Backend' },
          { id: `sk-${Date.now()}-2`, name: 'Web Development', level: 'Intermediate', category: 'Frontend' }
        ],
        projects: [
          {
            id: `proj-${Date.now()}`,
            title: 'Final Year College Project',
            description: 'Academic web application development project for TYBBA(CA) curriculum.',
            techStack: ['PHP', 'MySQL', 'HTML/CSS']
          }
        ],
        resume: {
          fileName: `${studentName.replace(/\s+/g, '_')}_Resume.pdf`,
          fileSize: '312 KB',
          uploadedAt: new Date().toISOString().split('T')[0],
          summary: 'Motivated student seeking internship opportunities.',
          education: {
            degree: 'BBA (Computer Applications)',
            college: studentCollege,
            university: 'SPPU Pune',
            cgpa: `${studentCgpa} / 10.0`,
            passingYear: '2026'
          },
          experience: [],
          skills: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
          projects: []
        }
      });
    } else if (role === 'company') {
      if (!companyName || !email) {
        setErrorMsg('Please fill in Company Name and official Email');
        return;
      }

      registerCompany({
        name: companyName,
        email,
        phone: companyPhone || '+91 20 2700 0000',
        industry: companyIndustry,
        location: companyLocation,
        website: `https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        description: 'Verified IT engineering & solutions provider partnering with college placements.'
      });
    }

    setSuccessMsg('Account registered successfully!');
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {mode === 'login' ? 'Sign In to SkillBridge' : 'Create New Account'}
            </h3>
            <p className="text-xs text-slate-500">
              TYBBA(CA) Placement & Internship Management System
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Role Segmented Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Your Role / पोर्टल प्रकार
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  role === 'student' ? 'bg-white text-indigo-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  role === 'company' ? 'bg-white text-amber-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Company</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  role === 'admin' ? 'bg-white text-purple-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Login Preset Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700">Quick Test Credentials (1-Click)</span>
              <span className="text-[10px] text-slate-500 font-mono">XAMPP Ready</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  quickLogin('student', students[0]?.id);
                  onSuccess();
                  onClose();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium transition-colors"
              >
                Rahul (Student 8.8 CGPA)
              </button>
              <button
                type="button"
                onClick={() => {
                  quickLogin('company', companies[0]?.id);
                  onSuccess();
                  onClose();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium transition-colors"
              >
                TechNova Solutions (Company)
              </button>
              <button
                type="button"
                onClick={() => {
                  quickLogin('admin');
                  onSuccess();
                  onClose();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium transition-colors"
              >
                College Coordinator (Admin)
              </button>
            </div>
          </div>

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={
                    role === 'student' ? 'rahul.sharma@college.edu' :
                    role === 'company' ? 'hr@technovasolutions.in' : 'admin@skillbridge.edu'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="•••••••• (Any password for demo)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Sign In as {role.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {role === 'student' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="e.g. Rushikesh Khaladkar"
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">University PRN No.</label>
                      <input
                        type="text"
                        value={studentPrn}
                        onChange={e => setStudentPrn(e.target.value)}
                        placeholder="12023098765"
                        required
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA</label>
                      <input
                        type="text"
                        value={studentCgpa}
                        onChange={e => setStudentCgpa(e.target.value)}
                        placeholder="8.50"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">College Name</label>
                    <input
                      type="text"
                      value={studentCollege}
                      onChange={e => setStudentCollege(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </>
              )}

              {role === 'company' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Tech Systems"
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Domain</label>
                      <input
                        type="text"
                        value={companyIndustry}
                        onChange={e => setCompanyIndustry(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City Location</label>
                      <input
                        type="text"
                        value={companyLocation}
                        onChange={e => setCompanyLocation(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  Note: University Admin accounts are managed directly via secure database provisioning per academic project guidelines.
                </p>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={studentPhone}
                  onChange={e => setStudentPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Register as {role.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Toggle Login / Register */}
          <div className="pt-3 border-t border-slate-100 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-slate-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
