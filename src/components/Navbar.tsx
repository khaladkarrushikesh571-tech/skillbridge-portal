import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { UserRole } from '../types';
import { 
  Briefcase, 
  User, 
  Building2, 
  ShieldCheck, 
  Globe, 
  ChevronDown, 
  LogOut, 
  CheckCircle2,
  FileCode2,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenAuth }) => {
  const { 
    currentUser, 
    currentRole, 
    language, 
    setLanguage, 
    logout, 
    quickLogin,
    students,
    companies
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              SB
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                {t.brandTitle}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 hidden sm:block whitespace-nowrap">
                TYBBA(CA) Project Portal
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                currentTab === 'home' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              {t.navHome}
            </button>
            
            <button
              onClick={() => onSelectTab('internships')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                currentTab === 'internships' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              {t.navInternships}
            </button>

            <button
              onClick={() => {
                if (currentRole === 'student') {
                  onSelectTab('student');
                } else {
                  quickLogin('student', students[0]?.id);
                  onSelectTab('student');
                }
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                currentTab === 'student' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              {t.navStudentPortal}
            </button>

            <button
              onClick={() => {
                if (currentRole === 'company') {
                  onSelectTab('company');
                } else {
                  quickLogin('company', companies[0]?.id);
                  onSelectTab('company');
                }
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                currentTab === 'company' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              {t.navCompanyPortal}
            </button>

            <button
              onClick={() => {
                if (currentRole === 'admin') {
                  onSelectTab('admin');
                } else {
                  quickLogin('admin');
                  onSelectTab('admin');
                }
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 ${
                currentTab === 'admin' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              {t.navAdminPortal}
            </button>

            <button
              onClick={() => onSelectTab('academic')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5 ${
                currentTab === 'academic' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : 'text-emerald-700'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>{t.navAcademicDocs}</span>
            </button>
          </nav>

          {/* Zone 3: Primary action & Role Selector */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
              title="Toggle English / मराठी"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>

            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {currentRole === 'student' && <User className="w-3.5 h-3.5 text-indigo-600" />}
                {currentRole === 'company' && <Building2 className="w-3.5 h-3.5 text-amber-600" />}
                {currentRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />}
                {currentRole === 'guest' && <Briefcase className="w-3.5 h-3.5 text-slate-500" />}
                
                <span className="font-semibold">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Demo Role'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role for Testing (1-Click)
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      quickLogin('student', 'stud-1');
                      onSelectTab('student');
                    }}
                    className="w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors"
                  >
                    <User className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        Rahul Sharma (Student)
                        {currentUser?.id === 'u-stud-1' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      </div>
                      <p className="text-slate-500 text-[11px]">TYBBA(CA) · Modern College Pune</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      quickLogin('student', 'stud-2');
                      onSelectTab('student');
                    }}
                    className="w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors"
                  >
                    <User className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        Priya Patil (Student)
                        {currentUser?.id === 'u-stud-2' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      </div>
                      <p className="text-slate-500 text-[11px]">TYBBA(CA) · SP College Pune</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      quickLogin('company', 'comp-1');
                      onSelectTab('company');
                    }}
                    className="w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        TechNova Solutions (Company)
                        {currentUser?.id === 'u-comp-1' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      </div>
                      <p className="text-slate-500 text-[11px]">IT Park Hinjawadi · Pune</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      quickLogin('admin');
                      onSelectTab('admin');
                    }}
                    className="w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 text-xs transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        University Admin / HOD
                        {currentUser?.role === 'admin' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      </div>
                      <p className="text-slate-500 text-[11px]">System oversight & statistics</p>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => onOpenAuth()}
                      className="w-full px-3 py-1.5 text-left text-xs text-indigo-600 font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Sign in with custom credentials
                    </button>
                    {currentUser && (
                      <button
                        onClick={logout}
                        className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t.logoutBtn}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            {currentUser ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'student') onSelectTab('student');
                  else if (currentUser.role === 'company') onSelectTab('company');
                  else if (currentUser.role === 'admin') onSelectTab('admin');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                {t.loginBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
