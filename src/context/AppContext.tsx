import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  CompanyProfile, 
  Internship, 
  Application, 
  AssessmentQuiz, 
  UserRole, 
  CurrentUser,
  AssessmentResult,
  StudentResume,
  CsvExportOptions,
  ExportDatasetType
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_COMPANIES, 
  INITIAL_INTERNSHIPS, 
  INITIAL_APPLICATIONS, 
  ASSESSMENT_QUIZZES,
  EXPORT_SQL_SCHEMA
} from '../data/initialData';
import { Language } from '../utils/translations';

interface AppContextType {
  currentUser: CurrentUser | null;
  currentRole: UserRole;
  language: Language;
  setLanguage: (lang: Language) => void;
  students: StudentProfile[];
  companies: CompanyProfile[];
  internships: Internship[];
  applications: Application[];
  quizzes: AssessmentQuiz[];
  activeStudent: StudentProfile | null;
  activeCompany: CompanyProfile | null;
  
  // Auth & Roles
  login: (email: string, role: UserRole) => boolean;
  quickLogin: (role: UserRole, profileId?: string) => void;
  logout: () => void;
  registerStudent: (student: Omit<StudentProfile, 'id' | 'userId' | 'assessmentScores'>) => void;
  registerCompany: (company: Omit<CompanyProfile, 'id' | 'userId' | 'verified' | 'activeOpeningsCount'>) => void;

  // Actions
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  updateResume: (resume: StudentResume) => void;
  applyForInternship: (internshipId: string, coverNote: string) => { success: boolean; message: string };
  postInternship: (internship: Omit<Internship, 'id' | 'companyId' | 'companyName' | 'postedAt'>) => void;
  updateInternship: (id: string, updates: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  updateApplicationStatus: (
    applicationId: string, 
    status: Application['status'], 
    feedbackNotes?: string, 
    interviewDate?: string,
    interviewMode?: Application['interviewMode']
  ) => void;
  recordAssessmentScore: (result: AssessmentResult) => void;
  
  // Academic Export Tools
  exportDatabaseSQL: () => void;
  exportApplicationsCSV: (options?: CsvExportOptions) => void;
  exportStudentsCSV: (options?: CsvExportOptions) => void;
  exportMasterRelationalCSV: (options?: CsvExportOptions) => void;
  exportCompaniesCSV: (options?: CsvExportOptions) => void;
  generateCsvContent: (type: ExportDatasetType, options?: CsvExportOptions) => {
    csv: string;
    filename: string;
    rowCount: number;
    byteSize: number;
    headers: string[];
    previewRows: string[][];
  };
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'skillbridge_app_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
    id: 'u-stud-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@college.edu',
    role: 'student',
    profileId: 'stud-1'
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [companies, setCompanies] = useState<CompanyProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_companies`);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [internships, setInternships] = useState<Internship[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_internships`);
    return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [quizzes] = useState<AssessmentQuiz[]>(ASSESSMENT_QUIZZES);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_companies`, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_internships`, JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);

  const currentRole: UserRole = currentUser ? currentUser.role : 'guest';

  const activeStudent: StudentProfile | null = 
    currentUser && currentUser.role === 'student'
      ? students.find(s => s.id === currentUser.profileId) || students[0]
      : null;

  const activeCompany: CompanyProfile | null = 
    currentUser && currentUser.role === 'company'
      ? companies.find(c => c.id === currentUser.profileId) || companies[0]
      : null;

  const quickLogin = (role: UserRole, profileId?: string) => {
    if (role === 'guest') {
      setCurrentUser(null);
      return;
    }
    if (role === 'admin') {
      setCurrentUser({
        id: 'u-admin-1',
        name: 'Prof. S. R. Joshi (HOD/Admin)',
        email: 'admin.hod@college.edu',
        role: 'admin',
        profileId: 'admin-1'
      });
      return;
    }
    if (role === 'student') {
      const target = profileId ? students.find(s => s.id === profileId) : students[0];
      if (target) {
        setCurrentUser({
          id: target.userId,
          name: target.name,
          email: target.email,
          role: 'student',
          profileId: target.id
        });
      }
      return;
    }
    if (role === 'company') {
      const target = profileId ? companies.find(c => c.id === profileId) : companies[0];
      if (target) {
        setCurrentUser({
          id: target.userId,
          name: target.name,
          email: target.email,
          role: 'company',
          profileId: target.id
        });
      }
      return;
    }
  };

  const login = (email: string, role: UserRole): boolean => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'u-admin-1',
        name: 'Project Coordinator (Admin)',
        email: email || 'admin@skillbridge.edu',
        role: 'admin',
        profileId: 'admin-1'
      });
      return true;
    }

    if (role === 'student') {
      const match = students.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setCurrentUser({
          id: match.userId,
          name: match.name,
          email: match.email,
          role: 'student',
          profileId: match.id
        });
        return true;
      }
      // If email doesn't match preloaded, log in as first student or create
      if (students.length > 0) {
        const student = students[0];
        setCurrentUser({
          id: student.userId,
          name: student.name,
          email: student.email,
          role: 'student',
          profileId: student.id
        });
        return true;
      }
    }

    if (role === 'company') {
      const match = companies.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setCurrentUser({
          id: match.userId,
          name: match.name,
          email: match.email,
          role: 'company',
          profileId: match.id
        });
        return true;
      }
      if (companies.length > 0) {
        const comp = companies[0];
        setCurrentUser({
          id: comp.userId,
          name: comp.name,
          email: comp.email,
          role: 'company',
          profileId: comp.id
        });
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerStudent = (studentData: Omit<StudentProfile, 'id' | 'userId' | 'assessmentScores'>) => {
    const newId = `stud-${Date.now()}`;
    const newUserId = `u-stud-${Date.now()}`;
    const newStudent: StudentProfile = {
      ...studentData,
      id: newId,
      userId: newUserId,
      assessmentScores: []
    };
    setStudents(prev => [newStudent, ...prev]);
    setCurrentUser({
      id: newUserId,
      name: newStudent.name,
      email: newStudent.email,
      role: 'student',
      profileId: newId
    });
  };

  const registerCompany = (compData: Omit<CompanyProfile, 'id' | 'userId' | 'verified' | 'activeOpeningsCount'>) => {
    const newId = `comp-${Date.now()}`;
    const newUserId = `u-comp-${Date.now()}`;
    const newComp: CompanyProfile = {
      ...compData,
      id: newId,
      userId: newUserId,
      verified: true,
      activeOpeningsCount: 0
    };
    setCompanies(prev => [newComp, ...prev]);
    setCurrentUser({
      id: newUserId,
      name: newComp.name,
      email: newComp.email,
      role: 'company',
      profileId: newId
    });
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    if (!currentUser || currentUser.role !== 'student') return;
    setStudents(prev =>
      prev.map(s => (s.id === currentUser.profileId ? { ...s, ...updates } : s))
    );
  };

  const updateResume = (resume: StudentResume) => {
    if (!currentUser || currentUser.role !== 'student') return;
    setStudents(prev =>
      prev.map(s => (s.id === currentUser.profileId ? { ...s, resume } : s))
    );
  };

  const applyForInternship = (internshipId: string, coverNote: string) => {
    if (!currentUser || currentUser.role !== 'student' || !activeStudent) {
      return { success: false, message: 'Please sign in with a student account to apply.' };
    }

    const internship = internships.find(i => i.id === internshipId);
    if (!internship) {
      return { success: false, message: 'Internship listing not found.' };
    }

    // Check existing
    const alreadyApplied = applications.some(
      a => a.internshipId === internshipId && a.studentId === activeStudent.id
    );
    if (alreadyApplied) {
      return { success: false, message: 'You have already submitted an application for this role.' };
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      internshipId,
      internshipTitle: internship.title,
      companyId: internship.companyId,
      companyName: internship.companyName,
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      studentEmail: activeStudent.email,
      studentPhone: activeStudent.phone,
      studentPrn: activeStudent.prnNumber,
      studentCgpa: activeStudent.cgpa,
      studentDegree: activeStudent.degree,
      studentSkills: activeStudent.skills.map(s => s.name),
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0],
      coverNote: coverNote || 'Applying through SkillBridge with verified student profile.'
    };

    setApplications(prev => [newApp, ...prev]);
    return { success: true, message: 'Application submitted successfully! Track status in your dashboard.' };
  };

  const postInternship = (itemData: Omit<Internship, 'id' | 'companyId' | 'companyName' | 'postedAt'>) => {
    if (!activeCompany) return;
    const newId = `intern-${Date.now()}`;
    const newListing: Internship = {
      ...itemData,
      id: newId,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
      postedAt: new Date().toISOString().split('T')[0]
    };
    setInternships(prev => [newListing, ...prev]);
    setCompanies(prev =>
      prev.map(c =>
        c.id === activeCompany.id
          ? { ...c, activeOpeningsCount: c.activeOpeningsCount + 1 }
          : c
      )
    );
  };

  const updateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(prev => prev.map(i => (i.id === id ? { ...i, ...updates } : i)));
  };

  const deleteInternship = (id: string) => {
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: Application['status'],
    feedbackNotes?: string,
    interviewDate?: string,
    interviewMode?: Application['interviewMode']
  ) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            status,
            feedbackNotes: feedbackNotes !== undefined ? feedbackNotes : app.feedbackNotes,
            interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate,
            interviewMode: interviewMode !== undefined ? interviewMode : app.interviewMode
          };
        }
        return app;
      })
    );
  };

  const recordAssessmentScore = (result: AssessmentResult) => {
    if (!currentUser || currentUser.role !== 'student') return;
    setStudents(prev =>
      prev.map(s => {
        if (s.id === currentUser.profileId) {
          const filtered = s.assessmentScores.filter(sc => sc.quizId !== result.quizId);
          return {
            ...s,
            assessmentScores: [result, ...filtered]
          };
        }
        return s;
      })
    );
  };

  const exportDatabaseSQL = () => {
    const blob = new Blob([EXPORT_SQL_SCHEMA], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'skillbridge_mysql_database.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFile = (content: string, filename: string, mimeType: string = 'text/csv;charset=utf-8;') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const escapeCsvValue = (val: any, delimiter: string = ','): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  };

  const generateCsvContent = (
    type: ExportDatasetType,
    options?: CsvExportOptions
  ): {
    csv: string;
    filename: string;
    rowCount: number;
    byteSize: number;
    headers: string[];
    previewRows: string[][];
  } => {
    const delimiter = options?.delimiter || ',';
    const includeHeaders = options?.includeHeaders !== false;
    const statusFilter = options?.statusFilter || 'all';
    const collegeFilter = options?.collegeFilter || 'all';

    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = '';

    if (type === 'students') {
      filename = `skillbridge_students_tbl_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'student_id',
        'prn_number',
        'full_name',
        'email',
        'phone',
        'college_name',
        'degree_program',
        'current_semester',
        'cgpa',
        'graduation_year',
        'location',
        'technical_skills',
        'projects_count',
        'assessments_passed',
        'resume_file',
        'created_at'
      ];

      const filteredStudents = students.filter(s => {
        if (collegeFilter !== 'all' && !s.college.toLowerCase().includes(collegeFilter.toLowerCase())) {
          return false;
        }
        return true;
      });

      rows = filteredStudents.map(s => {
        const skillsList = s.skills.map(sk => `${sk.name} (${sk.level})`).join('; ');
        const passedCount = s.assessmentScores.filter(a => a.passed).length;
        return [
          s.id,
          s.prnNumber,
          s.name,
          s.email,
          s.phone,
          s.college,
          s.degree,
          s.semester,
          s.cgpa,
          s.graduationYear,
          s.location,
          skillsList,
          String(s.projects.length),
          String(passedCount),
          s.resume?.fileName || 'None',
          s.resume?.uploadedAt || '2026-03-01'
        ];
      });
    } else if (type === 'applications') {
      filename = `skillbridge_applications_tbl_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'application_id',
        'internship_id',
        'internship_title',
        'company_id',
        'company_name',
        'student_id',
        'student_name',
        'student_prn',
        'student_college',
        'student_cgpa',
        'student_degree',
        'application_status',
        'applied_at',
        'recruiter_remarks',
        'interview_datetime',
        'interview_mode'
      ];

      const filteredApps = applications.filter(a => {
        if (statusFilter !== 'all' && a.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
        return true;
      });

      rows = filteredApps.map(a => {
        const student = students.find(s => s.id === a.studentId);
        return [
          a.id,
          a.internshipId,
          a.internshipTitle,
          a.companyId,
          a.companyName,
          a.studentId,
          a.studentName,
          a.studentPrn,
          student?.college || 'College of Arts, Science & Commerce, Pune',
          a.studentCgpa,
          a.studentDegree,
          a.status.toUpperCase(),
          a.appliedAt,
          a.feedbackNotes || 'Pending initial screening',
          a.interviewDate || 'N/A',
          a.interviewMode || 'N/A'
        ];
      });
    } else if (type === 'master_relational') {
      filename = `skillbridge_master_placement_dump_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'application_id',
        'student_prn',
        'student_name',
        'student_email',
        'college_name',
        'cgpa',
        'company_name',
        'internship_title',
        'role_category',
        'work_mode',
        'stipend_monthly_inr',
        'skills_verified',
        'status',
        'applied_date',
        'interview_date',
        'recruiter_notes'
      ];

      rows = applications.map(a => {
        const student = students.find(s => s.id === a.studentId);
        const internship = internships.find(i => i.id === a.internshipId);
        const passedBadges = student?.assessmentScores.map(sc => sc.badge).join('; ') || 'None';

        return [
          a.id,
          a.studentPrn,
          a.studentName,
          a.studentEmail,
          student?.college || 'SPPU Pune',
          a.studentCgpa,
          a.companyName,
          a.internshipTitle,
          internship?.roleCategory || 'Computer Applications',
          internship?.workType || 'Hybrid',
          String(internship?.stipendMonthly || 15000),
          passedBadges,
          a.status.toUpperCase(),
          a.appliedAt,
          a.interviewDate || 'Not Scheduled',
          a.feedbackNotes || 'No notes'
        ];
      });
    } else if (type === 'companies') {
      filename = `skillbridge_companies_tbl_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'company_id',
        'company_name',
        'industry_sector',
        'location_city',
        'official_email',
        'contact_phone',
        'official_website',
        'is_verified',
        'total_internships_posted'
      ];

      rows = companies.map(c => {
        const count = internships.filter(i => i.companyId === c.id).length;
        return [
          c.id,
          c.name,
          c.industry,
          c.location,
          c.email,
          c.phone,
          c.website,
          c.verified ? '1' : '0',
          String(count)
        ];
      });
    } else {
      // Default to applications
      filename = `skillbridge_data_export_${new Date().toISOString().split('T')[0]}.csv`;
      headers = ['record_id', 'description'];
      rows = [['1', 'General dataset']];
    }

    const formattedRows = rows.map(r => r.map(cell => escapeCsvValue(cell, delimiter)).join(delimiter));
    const headerRow = includeHeaders ? headers.map(h => escapeCsvValue(h, delimiter)).join(delimiter) : '';

    const lines = includeHeaders ? [headerRow, ...formattedRows] : formattedRows;
    // Add UTF-8 Byte Order Mark (\uFEFF) so Excel, LibreOffice, and Windows Notepad open non-ASCII characters cleanly
    const csv = '\uFEFF' + lines.join('\r\n');

    return {
      csv,
      filename,
      rowCount: rows.length,
      byteSize: new Blob([csv]).size,
      headers,
      previewRows: rows
    };
  };

  const exportStudentsCSV = (options?: CsvExportOptions) => {
    const { csv, filename } = generateCsvContent('students', options);
    downloadFile(csv, filename);
  };

  const exportApplicationsCSV = (options?: CsvExportOptions) => {
    const { csv, filename } = generateCsvContent('applications', options);
    downloadFile(csv, filename);
  };

  const exportMasterRelationalCSV = (options?: CsvExportOptions) => {
    const { csv, filename } = generateCsvContent('master_relational', options);
    downloadFile(csv, filename);
  };

  const exportCompaniesCSV = (options?: CsvExportOptions) => {
    const { csv, filename } = generateCsvContent('companies', options);
    downloadFile(csv, filename);
  };

  const resetToDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setCompanies(INITIAL_COMPANIES);
    setInternships(INITIAL_INTERNSHIPS);
    setApplications(INITIAL_APPLICATIONS);
    localStorage.removeItem(`${STORAGE_KEY}_students`);
    localStorage.removeItem(`${STORAGE_KEY}_companies`);
    localStorage.removeItem(`${STORAGE_KEY}_internships`);
    localStorage.removeItem(`${STORAGE_KEY}_applications`);
    quickLogin('student', 'stud-1');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        language,
        setLanguage,
        students,
        companies,
        internships,
        applications,
        quizzes,
        activeStudent,
        activeCompany,
        login,
        quickLogin,
        logout,
        registerStudent,
        registerCompany,
        updateStudentProfile,
        updateResume,
        applyForInternship,
        postInternship,
        updateInternship,
        deleteInternship,
        updateApplicationStatus,
        recordAssessmentScore,
        exportDatabaseSQL,
        exportApplicationsCSV,
        exportStudentsCSV,
        exportMasterRelationalCSV,
        exportCompaniesCSV,
        generateCsvContent,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
