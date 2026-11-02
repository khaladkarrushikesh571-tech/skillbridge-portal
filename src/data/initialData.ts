import { StudentProfile, CompanyProfile, Internship, Application, AssessmentQuiz } from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'stud-1',
    userId: 'u-stud-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@college.edu',
    phone: '+91 98220 12345',
    prnNumber: '12023045612',
    college: 'Modern College of Arts, Science and Commerce, Pune',
    degree: 'TYBBA(CA) - Computer Applications',
    semester: 'Semester VI',
    graduationYear: '2026',
    cgpa: '8.85',
    location: 'Pune, Maharashtra',
    bio: 'TYBBA(CA) final year student passionate about PHP Full Stack and React development. Looking for a 6-month winter/summer internship to solve real-world problems.',
    skills: [
      { id: 'sk-1', name: 'PHP / MySQL', level: 'Advanced', category: 'Backend' },
      { id: 'sk-2', name: 'JavaScript / React', level: 'Intermediate', category: 'Frontend' },
      { id: 'sk-3', name: 'HTML5 / CSS3 / Tailwind', level: 'Advanced', category: 'Frontend' },
      { id: 'sk-4', name: 'Git & GitHub', level: 'Intermediate', category: 'Tools' },
      { id: 'sk-5', name: 'Database Normalization', level: 'Advanced', category: 'Database' }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'SkillBridge Internship Management Portal',
        description: 'Final year project built using PHP, MySQL and modern frontend to manage student applications and company internship postings.',
        techStack: ['PHP 8.2', 'MySQL', 'JavaScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/rahul-tybba/skillbridge'
      },
      {
        id: 'proj-2',
        title: 'College Library Book Circulation System',
        description: 'Semester V mini-project for automating book checkouts, fines, and student account records with MySQL transactions.',
        techStack: ['Core PHP', 'Bootstrap 5', 'MySQL']
      }
    ],
    resume: {
      fileName: 'Rahul_Sharma_TYBBACA_Resume.pdf',
      fileSize: '342 KB',
      uploadedAt: '2026-03-15',
      summary: 'Results-driven TYBBA(CA) final year student with strong fundamentals in relational database design, PHP web architecture, and modern JavaScript interfaces.',
      education: {
        degree: 'Bachelor of Business Administration (Computer Applications)',
        college: 'Modern College, Pune',
        university: 'Savitribai Phule Pune University (SPPU)',
        cgpa: '8.85 / 10.0',
        passingYear: '2026'
      },
      experience: [
        {
          role: 'Web Developer Intern (Summer)',
          organization: 'Apex Solutions Pune',
          duration: 'May 2025 - July 2025 (2 Months)',
          points: [
            'Built responsive client landing pages using HTML, CSS and PHP',
            'Optimized MySQL queries reducing load latency by 28%'
          ]
        }
      ],
      skills: ['PHP', 'MySQL', 'JavaScript', 'React', 'Tailwind CSS', 'DBMS', 'REST APIs', 'XAMPP Stack'],
      projects: [
        {
          title: 'SkillBridge Management System',
          description: 'Full-stack internship portal with role-based access control for students, companies and administrators.',
          tech: 'PHP, MySQL, React'
        },
        {
          title: 'Library Circulation Database',
          description: 'Relational database driven system handling 1,500+ book inventory records.',
          tech: 'PHP, MySQL'
        }
      ]
    },
    assessmentScores: [
      {
        quizId: 'quiz-php-mysql',
        quizTitle: 'PHP & MySQL Architecture',
        category: 'Backend',
        score: 9,
        totalQuestions: 10,
        percentage: 90,
        passed: true,
        takenAt: '2026-03-20',
        badge: 'PHP & MySQL Specialist'
      },
      {
        quizId: 'quiz-web-dev',
        quizTitle: 'Modern Web Development & React',
        category: 'Frontend',
        score: 8,
        totalQuestions: 10,
        percentage: 80,
        passed: true,
        takenAt: '2026-03-22',
        badge: 'Frontend Practitioner'
      }
    ]
  },
  {
    id: 'stud-2',
    userId: 'u-stud-2',
    name: 'Priya Patil',
    email: 'priya.patil@spcollege.edu',
    phone: '+91 97654 98765',
    prnNumber: '12023045688',
    college: 'Sir Parashurambhau College (SP College), Pune',
    degree: 'TYBBA(CA) - Computer Applications',
    semester: 'Semester VI',
    graduationYear: '2026',
    cgpa: '9.15',
    location: 'Pune, Maharashtra',
    bio: 'Academic topper in TYBBA(CA) specializing in Data Analytics, Python scripting, and SQL reporting. Keen interest in business intelligence dashboards.',
    skills: [
      { id: 'sk-6', name: 'Python for Data Analysis', level: 'Advanced', category: 'Backend' },
      { id: 'sk-7', name: 'SQL & Database Design', level: 'Advanced', category: 'Database' },
      { id: 'sk-8', name: 'PowerBI & Excel Analytics', level: 'Intermediate', category: 'Tools' },
      { id: 'sk-9', name: 'Core Java', level: 'Intermediate', category: 'Core CS' }
    ],
    projects: [
      {
        id: 'proj-3',
        title: 'Retail Sales Forecasting Dashboard',
        description: 'Analyzed 50,000 transaction records using Python and SQLite to identify seasonal purchase patterns.',
        techStack: ['Python', 'Pandas', 'SQL', 'Streamlit']
      }
    ],
    resume: {
      fileName: 'Priya_Patil_Resume.pdf',
      fileSize: '298 KB',
      uploadedAt: '2026-03-18',
      summary: 'Data-driven TYBBA(CA) candidate with 9.15 CGPA. Adept in SQL querying, Python analytics, and interactive data visualization.',
      education: {
        degree: 'BBA (Computer Applications)',
        college: 'SP College, Pune',
        university: 'Savitribai Phule Pune University',
        cgpa: '9.15 / 10.0',
        passingYear: '2026'
      },
      experience: [],
      skills: ['Python', 'SQL', 'MySQL', 'Pandas', 'PowerBI', 'Data Warehousing', 'Java'],
      projects: [
        {
          title: 'Retail Sales Dashboard',
          description: 'Interactive analytical report on regional consumer behavior.',
          tech: 'Python, SQL, Streamlit'
        }
      ]
    },
    assessmentScores: [
      {
        quizId: 'quiz-dbms',
        quizTitle: 'DBMS & Advanced SQL',
        category: 'Database',
        score: 10,
        totalQuestions: 10,
        percentage: 100,
        passed: true,
        takenAt: '2026-03-25',
        badge: 'SQL & DBMS Master'
      }
    ]
  }
];

export const INITIAL_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp-1',
    userId: 'u-comp-1',
    name: 'TechNova Solutions',
    email: 'hr@technovasolutions.in',
    phone: '+91 20 6789 1200',
    industry: 'Enterprise Software & Cloud Systems',
    location: 'Hinjawadi Phase 1, Pune',
    website: 'https://technovasolutions.in',
    description: 'Leading Pune-based product engineering firm delivering enterprise web applications, ERP integrations, and cloud-native solutions across Maharashtra and global clients.',
    verified: true,
    activeOpeningsCount: 2
  },
  {
    id: 'comp-2',
    userId: 'u-comp-2',
    name: 'Infospectrum Labs',
    email: 'careers@infospectrumlabs.com',
    phone: '+91 22 4512 8900',
    industry: 'Financial Technology & Web Services',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    website: 'https://infospectrumlabs.com',
    description: 'Fintech and compliance software lab specializing in high-throughput transactional APIs, dashboard portals, and secure database services.',
    verified: true,
    activeOpeningsCount: 2
  },
  {
    id: 'comp-3',
    userId: 'u-comp-3',
    name: 'CloudForge Infotech',
    email: 'talent@cloudforge.tech',
    phone: '+91 80 2345 6789',
    industry: 'Cloud Infrastructure & SaaS',
    location: 'Viman Nagar, Pune (Hybrid)',
    website: 'https://cloudforge.tech',
    description: 'SaaS development studio building automated monitoring and workflow automation tools for medium scale enterprises.',
    verified: true,
    activeOpeningsCount: 1
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    companyId: 'comp-1',
    companyName: 'TechNova Solutions',
    companyLocation: 'Hinjawadi, Pune',
    title: 'PHP & MySQL Full-Stack Intern',
    roleCategory: 'PHP & Backend',
    workType: 'Hybrid',
    location: 'Hinjawadi Phase 1, Pune',
    duration: '6 Months',
    stipendMonthly: 15000,
    openings: 3,
    requiredSkills: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
    description: 'TechNova is looking for enthusiastic final year TYBBA(CA) / BCA students to join our core product engineering team. You will assist in writing clean PHP modules, designing normalized database schemas in MySQL, and crafting responsive frontend dashboards.',
    responsibilities: [
      'Develop modular PHP backend endpoints and secure form processing routines',
      'Design and optimize relational MySQL database tables, views, and indexes',
      'Integrate frontend JavaScript components with asynchronous API endpoints',
      'Write clean, documented code and participate in sprint code reviews'
    ],
    eligibility: 'TYBBA(CA), BCA, BCS or BE final year with minimum 60% aggregate or 6.5 CGPA',
    deadline: '2026-05-30',
    status: 'active',
    postedAt: '2026-03-10',
    featured: true
  },
  {
    id: 'intern-2',
    companyId: 'comp-1',
    companyName: 'TechNova Solutions',
    companyLocation: 'Hinjawadi, Pune',
    title: 'Frontend Developer Intern (React & Tailwind)',
    roleCategory: 'Web Development',
    workType: 'Remote',
    location: 'Remote (Maharashtra / Pune Base)',
    duration: '3 Months',
    stipendMonthly: 14000,
    openings: 2,
    requiredSkills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git'],
    description: 'Join our UI team to build modular, accessible design system components and high-performance customer portals using React and modern CSS.',
    responsibilities: [
      'Convert Figma prototypes into pixel-perfect responsive React components',
      'Implement state management and clean component architecture',
      'Ensure cross-browser compatibility and mobile responsiveness',
      'Collaborate with backend engineers to integrate RESTful endpoints'
    ],
    eligibility: 'TYBBA(CA) / BCA / B.Sc Computer Science students with knowledge of JavaScript',
    deadline: '2026-05-15',
    status: 'active',
    postedAt: '2026-03-14',
    featured: true
  },
  {
    id: 'intern-3',
    companyId: 'comp-2',
    companyName: 'Infospectrum Labs',
    companyLocation: 'BKC, Mumbai',
    title: 'Junior Data Analyst & SQL Trainee',
    roleCategory: 'Data Analytics',
    workType: 'On-site',
    location: 'BKC, Mumbai',
    duration: '6 Months',
    stipendMonthly: 18000,
    openings: 2,
    requiredSkills: ['SQL', 'MySQL', 'Excel / PowerBI', 'Python Basics', 'Statistics'],
    description: 'Work alongside financial analysts to query transactional databases, generate monthly audit metrics, and build automated visualization dashboards.',
    responsibilities: [
      'Write complex SQL queries involving multi-table JOINs, subqueries, and aggregates',
      'Validate raw dataset hygiene and format data for executive presentations',
      'Build automated reporting sheets and dashboard widgets in PowerBI',
      'Document data dictionary and entity relationship models'
    ],
    eligibility: 'TYBBA(CA) / BCA / Statistics graduates with strong SQL skills',
    deadline: '2026-06-10',
    status: 'active',
    postedAt: '2026-03-18',
    featured: false
  },
  {
    id: 'intern-4',
    companyId: 'comp-2',
    companyName: 'Infospectrum Labs',
    companyLocation: 'BKC, Mumbai',
    title: 'Software Quality Assurance (QA) Intern',
    roleCategory: 'Software Testing',
    workType: 'Hybrid',
    location: 'Mumbai & Remote',
    duration: '4 Months',
    stipendMonthly: 12000,
    openings: 4,
    requiredSkills: ['Manual Testing', 'SQL Querying', 'Test Case Design', 'Bug Life Cycle'],
    description: 'Perform functional and regression testing on enterprise banking modules, design test suites, and report defects using structured bug tracking tools.',
    responsibilities: [
      'Execute manual functional, boundary, and negative test test-cases',
      'Perform database validation tests using direct SQL queries',
      'Log detailed defect reports with reproduction steps and expected outcomes',
      'Collaborate with development teams in sprint verification cycles'
    ],
    eligibility: 'Final year TYBBA(CA) or BCA students with coursework in Software Engineering',
    deadline: '2026-05-25',
    status: 'active',
    postedAt: '2026-03-20',
    featured: false
  },
  {
    id: 'intern-5',
    companyId: 'comp-3',
    companyName: 'CloudForge Infotech',
    companyLocation: 'Viman Nagar, Pune',
    title: 'Java Backend Intern (Core Java / Spring)',
    roleCategory: 'PHP & Backend',
    workType: 'Hybrid',
    location: 'Viman Nagar, Pune',
    duration: '6 Months',
    stipendMonthly: 16000,
    openings: 2,
    requiredSkills: ['Core Java', 'OOPs Concepts', 'JDBC / MySQL', 'Spring Boot Basics'],
    description: 'Gain hands-on industry experience building scalable enterprise Java microservices, implementing design patterns, and handling high-concurrency database transactions.',
    responsibilities: [
      'Implement object-oriented backend services in Java',
      'Connect relational databases via JDBC and ORM frameworks',
      'Write unit tests for business logic methods',
      'Work with version control and code deployment pipelines'
    ],
    eligibility: 'TYBBA(CA) / BCA students with strong OOPs and Core Java syllabus foundation',
    deadline: '2026-06-05',
    status: 'active',
    postedAt: '2026-03-22',
    featured: true
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    internshipId: 'intern-1',
    internshipTitle: 'PHP & MySQL Full-Stack Intern',
    companyId: 'comp-1',
    companyName: 'TechNova Solutions',
    studentId: 'stud-1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@college.edu',
    studentPhone: '+91 98220 12345',
    studentPrn: '12023045612',
    studentCgpa: '8.85',
    studentDegree: 'TYBBA(CA) - Computer Applications',
    studentSkills: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Git'],
    status: 'shortlisted',
    appliedAt: '2026-03-16',
    coverNote: 'I am a final year TYBBA(CA) student with hands-on PHP/MySQL project experience in creating relational databases, session security, and dynamic student portals.',
    feedbackNotes: 'Candidate has a strong final year project in PHP/MySQL and scored 90% in the PHP Assessment. Scheduled for technical interview.',
    interviewDate: '2026-04-05 11:30 AM',
    interviewMode: 'Online (Google Meet)'
  },
  {
    id: 'app-2',
    internshipId: 'intern-2',
    internshipTitle: 'Frontend Developer Intern (React & Tailwind)',
    companyId: 'comp-1',
    companyName: 'TechNova Solutions',
    studentId: 'stud-1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@college.edu',
    studentPhone: '+91 98220 12345',
    studentPrn: '12023045612',
    studentCgpa: '8.85',
    studentDegree: 'TYBBA(CA) - Computer Applications',
    studentSkills: ['React', 'JavaScript', 'Tailwind CSS'],
    status: 'pending',
    appliedAt: '2026-03-18',
    coverNote: 'Excited about building clean component libraries and working with modern frontend tooling in React.',
    feedbackNotes: 'Application received and under initial review by hiring manager.'
  },
  {
    id: 'app-3',
    internshipId: 'intern-3',
    internshipTitle: 'Junior Data Analyst & SQL Trainee',
    companyId: 'comp-2',
    companyName: 'Infospectrum Labs',
    studentId: 'stud-2',
    studentName: 'Priya Patil',
    studentEmail: 'priya.patil@spcollege.edu',
    studentPhone: '+91 97654 98765',
    studentPrn: '12023045688',
    studentCgpa: '9.15',
    studentDegree: 'TYBBA(CA) - Computer Applications',
    studentSkills: ['SQL', 'MySQL', 'Python', 'PowerBI'],
    status: 'selected',
    appliedAt: '2026-03-20',
    coverNote: 'Secured 9.15 CGPA in TYBBA(CA) with coursework in Database Systems and Business Mathematics. Excellent with SQL queries and Python analysis.',
    feedbackNotes: 'Excellent performance in SQL assessment (100%) and clear communication during technical round. Internship offer letter issued.',
    interviewDate: '2026-03-28 02:00 PM',
    interviewMode: 'In-person Office'
  }
];

export const ASSESSMENT_QUIZZES: AssessmentQuiz[] = [
  {
    id: 'quiz-php-mysql',
    title: 'PHP & MySQL Architecture',
    category: 'Backend & Database',
    description: 'Evaluate essential backend concepts: prepared statements, sessions, SQL joins, normalization, and HTTP methods.',
    durationMinutes: 10,
    passingPercentage: 70,
    badgeName: 'PHP & MySQL Specialist',
    questions: [
      {
        id: 'q-1',
        question: 'Which PHP function or extension is recommended to prevent SQL Injection attacks when querying MySQL?',
        options: ['mysql_query()', 'PDO with prepared statements ($stmt->execute())', 'md5() encryption', 'eval() function'],
        correctIndex: 1,
        explanation: 'PDO (PHP Data Objects) or MySQLi with prepared statements parameterizes data, separating SQL syntax from user inputs.'
      },
      {
        id: 'q-2',
        question: 'Where are PHP session variables stored by default when session_start() is invoked?',
        options: ['Directly in browser LocalStorage', 'On the server filesystem, referenced by a PHPSESSID cookie', 'In the Windows registry', 'In the Apache httpd.conf file'],
        correctIndex: 1,
        explanation: 'Session data lives securely on the server; the client browser only carries the session token identifier cookie.'
      },
      {
        id: 'q-3',
        question: 'In relational database design, which Normal Form guarantees that all non-key attributes are fully functionally dependent on the entire primary key (no partial dependency)?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
        correctIndex: 1,
        explanation: '2NF requires 1NF compliance and mandates that every non-prime attribute is fully dependent on the primary key.'
      },
      {
        id: 'q-4',
        question: 'What is the correct PHP syntax to hash user passwords securely before storing in MySQL?',
        options: ['md5($password)', 'sha1($password)', 'password_hash($password, PASSWORD_BCRYPT)', 'base64_encode($password)'],
        correctIndex: 2,
        explanation: 'password_hash() with PASSWORD_BCRYPT or PASSWORD_DEFAULT provides automatic salt generation and slow adaptive hashing.'
      },
      {
        id: 'q-5',
        question: 'Which SQL JOIN returns all rows from the left table, and matched rows from the right table, filling NULLs if no match exists?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'],
        correctIndex: 1,
        explanation: 'LEFT JOIN keeps every record from the source table regardless of whether the right table contains a matching foreign key.'
      }
    ]
  },
  {
    id: 'quiz-web-dev',
    title: 'Modern Web Development & React',
    category: 'Frontend Engineering',
    description: 'Covers modern JavaScript (ES6+), React hooks, Virtual DOM, and responsive Tailwind styling principles.',
    durationMinutes: 10,
    passingPercentage: 70,
    badgeName: 'Frontend Practitioner',
    questions: [
      {
        id: 'qw-1',
        question: 'Which React hook is used to synchronize a component with an external system or trigger side effects upon state changes?',
        options: ['useState', 'useRef', 'useEffect', 'useMemo'],
        correctIndex: 2,
        explanation: 'useEffect executes side effects such as data fetching, subscriptions, or DOM listeners after rendering.'
      },
      {
        id: 'qw-2',
        question: 'What does the Virtual DOM in React provide for web applications?',
        options: ['Direct physical access to the graphics card', 'An in-memory representation of UI elements to compute minimal DOM updates via diffing', 'A replacement for CSS stylesheets', 'A server-side MySQL connection'],
        correctIndex: 1,
        explanation: 'The Virtual DOM allows React to compute changes in memory and update only modified real DOM nodes.'
      },
      {
        id: 'qw-3',
        question: 'Which HTTP status code signifies that a client request was successfully processed and returned data?',
        options: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Internal Server Error'],
        correctIndex: 0,
        explanation: 'HTTP 200 signifies standard success for GET, POST, or PUT requests.'
      },
      {
        id: 'qw-4',
        question: 'What is the purpose of the key prop when rendering lists in React?',
        options: ['Encrypts the item data', 'Helps React identify which items have changed, been added, or removed during re-renders', 'Applies CSS flexbox spacing', 'Connects the component to MySQL'],
        correctIndex: 1,
        explanation: 'Keys give elements a stable identity across renders, ensuring efficient list reconciliation.'
      },
      {
        id: 'qw-5',
        question: 'Which modern CSS layout system is specifically designed for two-dimensional grid structures (rows AND columns)?',
        options: ['Float & Clearfix', 'CSS Grid', 'Inline-block', 'Position Absolute'],
        correctIndex: 1,
        explanation: 'CSS Grid provides full 2D control across columns and rows simultaneously.'
      }
    ]
  },
  {
    id: 'quiz-dbms',
    title: 'DBMS, SQL & Data Integrity',
    category: 'Database Systems',
    description: 'Test core database fundamentals: ACID properties, indexing, foreign keys, and transaction management.',
    durationMinutes: 10,
    passingPercentage: 70,
    badgeName: 'SQL & DBMS Master',
    questions: [
      {
        id: 'qd-1',
        question: 'In relational database transactions, what does the "A" in ACID properties stand for?',
        options: ['Availability', 'Atomicity', 'Authentication', 'Asynchrony'],
        correctIndex: 1,
        explanation: 'Atomicity ensures that all statements in a transaction either complete successfully together or are rolled back completely.'
      },
      {
        id: 'qd-2',
        question: 'What is the primary purpose of creating a B-Tree index on a frequently searched column in MySQL?',
        options: ['Compresses table size on disk', 'Drastically accelerates SELECT query lookups from O(N) full table scan to O(log N)', 'Encrypts the column data', 'Prevents foreign key deletions'],
        correctIndex: 1,
        explanation: 'Indexes provide fast logarithmic pointer access, minimizing expensive full disk scans.'
      },
      {
        id: 'qd-3',
        question: 'Which constraint enforces referential integrity between child and parent tables in MySQL?',
        options: ['UNIQUE', 'FOREIGN KEY', 'CHECK', 'NOT NULL'],
        correctIndex: 1,
        explanation: 'FOREIGN KEY guarantees that a column value corresponds to a valid existing primary key in the referenced parent table.'
      },
      {
        id: 'qd-4',
        question: 'Which SQL clause is used to filter aggregated group results produced by a GROUP BY statement?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
        correctIndex: 1,
        explanation: 'HAVING filters results after aggregation, whereas WHERE filters individual rows before grouping.'
      },
      {
        id: 'qd-5',
        question: 'What is a database transaction command used to cancel all modifications made in the current uncommitted transaction?',
        options: ['COMMIT', 'ROLLBACK', 'SAVEPOINT', 'TRUNCATE'],
        correctIndex: 1,
        explanation: 'ROLLBACK undoes changes made within the active transaction block, restoring the database to its previous consistent state.'
      }
    ]
  }
];

export const EXPORT_SQL_SCHEMA = `-- =====================================================================
-- SkillBridge - Student Skill & Internship Management System
-- Academic Project for TYBBA(CA) Final Year - SPPU / University Syllabus
-- Compatible with: MySQL 8.0+ / MariaDB / XAMPP v8.2+
-- File: database/skillbridge_schema.sql
-- =====================================================================

CREATE DATABASE IF NOT EXISTS \`skillbridge_db\` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE \`skillbridge_db\`;

-- ---------------------------------------------------------------------
-- 1. Table: users (Master Authentication Table)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`users\` (
  \`user_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`email\` VARCHAR(120) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('student', 'company', 'admin') NOT NULL,
  \`status\` ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_user_email\` (\`email\`),
  INDEX \`idx_user_role\` (\`role\`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 2. Table: students (Student Profile & Academic Details)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`students\` (
  \`student_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL UNIQUE,
  \`prn_number\` VARCHAR(30) NOT NULL UNIQUE COMMENT 'College University PRN',
  \`full_name\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(20) NOT NULL,
  \`college_name\` VARCHAR(150) NOT NULL,
  \`degree_program\` VARCHAR(80) DEFAULT 'TYBBA(CA)',
  \`current_semester\` VARCHAR(20) DEFAULT 'Semester VI',
  \`cgpa\` DECIMAL(3, 2) NOT NULL DEFAULT 7.50,
  \`graduation_year\` YEAR NOT NULL DEFAULT 2026,
  \`location\` VARCHAR(100) NOT NULL DEFAULT 'Pune, Maharashtra',
  \`bio\` TEXT,
  \`resume_file_path\` VARCHAR(255) DEFAULT NULL,
  \`profile_completion_percent\` INT DEFAULT 85,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 3. Table: companies (Registered Partner IT Firms)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`companies\` (
  \`company_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL UNIQUE,
  \`company_name\` VARCHAR(120) NOT NULL,
  \`industry_sector\` VARCHAR(100) NOT NULL,
  \`contact_phone\` VARCHAR(20) NOT NULL,
  \`location_city\` VARCHAR(100) NOT NULL,
  \`official_website\` VARCHAR(200),
  \`about_company\` TEXT,
  \`is_verified\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4. Table: internships (Job & Internship Listings)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`internships\` (
  \`internship_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`company_id\` INT NOT NULL,
  \`title\` VARCHAR(150) NOT NULL,
  \`role_category\` VARCHAR(80) NOT NULL,
  \`work_mode\` ENUM('Remote', 'Hybrid', 'On-site') DEFAULT 'Hybrid',
  \`location\` VARCHAR(100) NOT NULL,
  \`duration_months\` VARCHAR(30) DEFAULT '6 Months',
  \`stipend_monthly\` DECIMAL(10, 2) NOT NULL DEFAULT 12000.00,
  \`openings_count\` INT NOT NULL DEFAULT 2,
  \`required_skills\` TEXT NOT NULL COMMENT 'Comma-separated skills',
  \`job_description\` TEXT NOT NULL,
  \`eligibility_criteria\` VARCHAR(255) DEFAULT 'TYBBA(CA) / BCA Final Year',
  \`application_deadline\` DATE NOT NULL,
  \`listing_status\` ENUM('active', 'closed', 'draft') DEFAULT 'active',
  \`is_featured\` TINYINT(1) DEFAULT 0,
  \`posted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`company_id\`) ON DELETE CASCADE,
  INDEX \`idx_internship_status\` (\`listing_status\`),
  INDEX \`idx_internship_deadline\` (\`application_deadline\`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 5. Table: applications (Internship Applications & Workflow)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`applications\` (
  \`application_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`internship_id\` INT NOT NULL,
  \`student_id\` INT NOT NULL,
  \`cover_note\` TEXT,
  \`status\` ENUM('pending', 'shortlisted', 'selected', 'rejected') DEFAULT 'pending',
  \`recruiter_remarks\` TEXT,
  \`interview_datetime\` DATETIME DEFAULT NULL,
  \`interview_mode\` VARCHAR(50) DEFAULT 'Online (Google Meet)',
  \`applied_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY \`uq_student_internship\` (\`internship_id\`, \`student_id\`),
  FOREIGN KEY (\`internship_id\`) REFERENCES \`internships\`(\`internship_id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`student_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 6. Table: skill_assessments & test_results
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`assessment_tests\` (
  \`test_id\` VARCHAR(50) PRIMARY KEY,
  \`test_title\` VARCHAR(100) NOT NULL,
  \`subject_category\` VARCHAR(80) NOT NULL,
  \`total_questions\` INT NOT NULL DEFAULT 10,
  \`passing_score\` INT NOT NULL DEFAULT 7
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS \`student_test_results\` (
  \`result_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`student_id\` INT NOT NULL,
  \`test_id\` VARCHAR(50) NOT NULL,
  \`score_obtained\` INT NOT NULL,
  \`total_marks\` INT NOT NULL DEFAULT 10,
  \`percentage\` DECIMAL(5,2) NOT NULL,
  \`is_passed\` TINYINT(1) NOT NULL,
  \`badge_awarded\` VARCHAR(80),
  \`attempted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`student_id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`test_id\`) REFERENCES \`assessment_tests\`(\`test_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Sample Seed Data for Instant College Viva Demo
-- ---------------------------------------------------------------------
INSERT INTO \`users\` (\`user_id\`, \`email\`, \`password_hash\`, \`role\`) VALUES
(1, 'admin@skillbridge.edu', '$2y$10$w05qF7tG4H7...demo_admin', 'admin'),
(2, 'rahul.sharma@college.edu', '$2y$10$w05qF7tG4H7...demo_student', 'student'),
(3, 'hr@technovasolutions.in', '$2y$10$w05qF7tG4H7...demo_company', 'company');

INSERT INTO \`students\` (\`student_id\`, \`user_id\`, \`prn_number\`, \`full_name\`, \`phone\`, \`college_name\`, \`cgpa\`) VALUES
(1, 2, '12023045612', 'Rahul Sharma', '+91 98220 12345', 'Modern College, Pune', 8.85);

INSERT INTO \`companies\` (\`company_id\`, \`user_id\`, \`company_name\`, \`industry_sector\`, \`contact_phone\`, \`location_city\`) VALUES
(1, 3, 'TechNova Solutions', 'Enterprise Software', '+91 20 6789 1200', 'Hinjawadi, Pune');

INSERT INTO \`internships\` (\`internship_id\`, \`company_id\`, \`title\`, \`role_category\`, \`work_mode\`, \`location\`, \`stipend_monthly\`, \`required_skills\`, \`job_description\`, \`application_deadline\`) VALUES
(1, 1, 'PHP & MySQL Full-Stack Intern', 'PHP & Backend', 'Hybrid', 'Hinjawadi, Pune', 15000.00, 'PHP, MySQL, JavaScript, HTML5', 'Final year TYBBA(CA) internship in Pune IT corridor', '2026-05-30');
`;
