export type UserRole = 'student' | 'company' | 'admin' | 'guest';

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Core CS' | 'Soft Skills';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface StudentResume {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  summary: string;
  education: {
    degree: string;
    college: string;
    university: string;
    cgpa: string;
    passingYear: string;
  };
  experience: {
    role: string;
    organization: string;
    duration: string;
    points: string[];
  }[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    tech: string;
  }[];
}

export interface AssessmentResult {
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  takenAt: string;
  badge: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  prnNumber: string; // College PRN / Roll Number
  college: string;
  degree: string; // e.g., 'TYBBA(CA) - Computer Applications'
  semester: string; // Semester VI
  graduationYear: string;
  cgpa: string;
  location: string;
  bio: string;
  avatarUrl?: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  resume: StudentResume;
  assessmentScores: AssessmentResult[];
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  website: string;
  description: string;
  logoUrl?: string;
  verified: boolean;
  activeOpeningsCount: number;
}

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLocation: string;
  title: string;
  roleCategory: 'Web Development' | 'PHP & Backend' | 'Full Stack' | 'Data Analytics' | 'Software Testing' | 'Mobile App';
  workType: 'Remote' | 'Hybrid' | 'On-site';
  location: string;
  duration: string; // e.g. "3 Months", "6 Months"
  stipendMonthly: number; // e.g. 15000 (₹/month)
  openings: number;
  requiredSkills: string[];
  description: string;
  responsibilities: string[];
  eligibility: string; // e.g., "TYBBA(CA) / BCA / BCS / BE Final Year"
  deadline: string;
  status: 'active' | 'closed';
  postedAt: string;
  featured?: boolean;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentPrn: string;
  studentCgpa: string;
  studentDegree: string;
  studentSkills: string[];
  status: 'pending' | 'shortlisted' | 'selected' | 'rejected';
  appliedAt: string;
  coverNote: string;
  feedbackNotes?: string;
  interviewDate?: string;
  interviewMode?: 'Online (Google Meet)' | 'In-person Office';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AssessmentQuiz {
  id: string;
  title: string;
  category: string;
  description: string;
  durationMinutes: number;
  passingPercentage: number;
  badgeName: string;
  questions: QuizQuestion[];
}

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileId: string;
}

export type ExportDatasetType = 'students' | 'applications' | 'master_relational' | 'companies' | 'all_tables';

export interface CsvExportOptions {
  delimiter?: ',' | ';' | '\t';
  includeHeaders?: boolean;
  statusFilter?: string;
  collegeFilter?: string;
}
