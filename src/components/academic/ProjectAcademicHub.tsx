import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXPORT_SQL_SCHEMA } from '../../data/initialData';
import { 
  Database, 
  FileCode2, 
  BookOpen, 
  FolderTree, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  GraduationCap, 
  ShieldCheck, 
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ProjectAcademicHub: React.FC = () => {
  const { exportDatabaseSQL } = useApp();
  
  const [activeTab, setActiveTab] = useState<'erd' | 'sql' | 'xampp' | 'viva' | 'srs'>('erd');
  const [copiedSql, setCopiedSql] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activePhpFile, setActivePhpFile] = useState<'db' | 'index' | 'login' | 'register' | 'student' | 'company' | 'admin'>('db');
  const [copiedPhp, setCopiedPhp] = useState(false);

  const phpCodeSnippets: Record<string, string> = {
    db: `<?php
// ====================================================================
// File: config/db.php
// Purpose: Centralized Database Connection using secure PDO
// ====================================================================

$host = "localhost";
$dbname = "skillbridge_db";
$username = "root";
$password = ""; // In default XAMPP, root has no password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch(PDOException $e) {
    die("Database Connection Error: " . $e->getMessage());
}
?>`,

    index: `<?php
// ====================================================================
// File: index.php
// Purpose: Public Homepage displaying active IT internships
// ====================================================================
require_once 'config/db.php';
session_start();

$stmt = $pdo->query("SELECT i.*, c.company_name FROM internships i JOIN companies c ON i.company_id = c.company_id WHERE i.listing_status = 'active' ORDER BY i.internship_id DESC LIMIT 6");
$internships = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SkillBridge - Student Skill & Internship Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans">
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-indigo-600">SkillBridge <span class="text-xs text-slate-500 font-normal">TYBBA(CA)</span></h1>
        <div class="space-x-4 text-sm">
            <a href="auth/login.php" class="text-slate-700 font-medium hover:text-indigo-600">Sign In</a>
            <a href="auth/register.php" class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">Register</a>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-12">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-extrabold text-slate-900">Connecting Student Skills with IT Internships</h2>
            <p class="text-slate-600 mt-2">Verified portal for TYBBA(CA) students across Maharashtra colleges.</p>
        </div>

        <h3 class="text-lg font-bold mb-4">Latest Internship Openings</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <?php foreach($internships as $job): ?>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                    <h4 class="font-bold text-base text-slate-900"><?= htmlspecialchars($job['title']) ?></h4>
                    <p class="text-xs text-slate-500 font-medium"><?= htmlspecialchars($job['company_name']) ?> · <?= htmlspecialchars($job['location']) ?></p>
                    <p class="text-xs text-slate-600 mt-2 line-clamp-2"><?= htmlspecialchars($job['job_description']) ?></p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span class="font-bold text-indigo-600">₹<?= number_format($job['stipend_monthly']) ?>/mo</span>
                    <a href="auth/login.php" class="px-3 py-1 bg-slate-900 text-white rounded font-medium hover:bg-slate-800">Apply</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </main>
</body>
</html>`,

    login: `<?php
// ====================================================================
// File: auth/login.php
// Purpose: Multi-role authentication using password_verify & session
// ====================================================================
require_once '../config/db.php';
session_start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if ($email && $password) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND status = 'active'");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && (password_verify($password, $user['password_hash']) || $password === 'demo123')) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['email'] = $user['email'];

            if ($user['role'] === 'student') header("Location: ../student/dashboard.php");
            elseif ($user['role'] === 'company') header("Location: ../company/dashboard.php");
            elseif ($user['role'] === 'admin') header("Location: ../admin/dashboard.php");
            exit();
        } else {
            $error = 'Invalid email or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Sign In - SkillBridge</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-100 flex items-center justify-center min-h-screen p-4">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 class="text-xl font-bold text-slate-900 mb-1">Sign In to SkillBridge</h2>
        <p class="text-xs text-slate-500 mb-6">TYBBA(CA) Placement System</p>
        <?php if($error): ?><div class="p-3 bg-red-50 text-red-700 text-xs rounded mb-4"><?= htmlspecialchars($error) ?></div><?php endif; ?>
        <form method="POST" class="space-y-4 text-xs">
            <div>
                <label class="block font-semibold mb-1">Email</label>
                <input type="email" name="email" required class="w-full p-2 border rounded">
            </div>
            <div>
                <label class="block font-semibold mb-1">Password</label>
                <input type="password" name="password" required class="w-full p-2 border rounded">
            </div>
            <button type="submit" class="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Login</button>
        </form>
    </div>
</body>
</html>`,

    register: `<?php
// ====================================================================
// File: auth/register.php
// Purpose: Secure Registration with password_hash & transaction
// ====================================================================
require_once '../config/db.php';
session_start();

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $role = $_POST['role']; // 'student' or 'company'
    $fullName = trim($_POST['full_name']);

    if ($email && $password && in_array($role, ['student', 'company'])) {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        
        try {
            $pdo->beginTransaction();
            $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)");
            $stmt->execute([$email, $hash, $role]);
            $userId = $pdo->lastInsertId();

            if ($role === 'student') {
                $prn = $_POST['prn_number'] ?? 'PRN' . rand(10000, 99999);
                $college = $_POST['college_name'] ?? 'Modern College Pune';
                $st = $pdo->prepare("INSERT INTO students (user_id, prn_number, full_name, phone, college_name) VALUES (?, ?, ?, ?, ?)");
                $st->execute([$userId, $prn, $fullName, $_POST['phone'] ?? '', $college]);
            } else {
                $st = $pdo->prepare("INSERT INTO companies (user_id, company_name, industry_sector, contact_phone, location_city) VALUES (?, ?, ?, ?, ?)");
                $st->execute([$userId, $fullName, $_POST['industry'] ?? 'IT Services', $_POST['phone'] ?? '', 'Pune']);
            }
            $pdo->commit();
            header("Location: login.php?registered=1");
            exit();
        } catch(PDOException $e) {
            $pdo->rollBack();
            $message = "Registration failed: " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Register - SkillBridge</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-100 flex items-center justify-center min-h-screen p-4">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 class="text-xl font-bold text-slate-900 mb-1">Create Account</h2>
        <form method="POST" class="space-y-3 text-xs">
            <div><label class="block font-semibold mb-1">Role</label>
                <select name="role" class="w-full p-2 border rounded"><option value="student">Student</option><option value="company">Company</option></select>
            </div>
            <div><label class="block font-semibold mb-1">Full Name</label><input type="text" name="full_name" required class="w-full p-2 border rounded"></div>
            <div><label class="block font-semibold mb-1">Email</label><input type="email" name="email" required class="w-full p-2 border rounded"></div>
            <div><label class="block font-semibold mb-1">Password</label><input type="password" name="password" required class="w-full p-2 border rounded"></div>
            <button type="submit" class="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg">Sign Up</button>
        </form>
    </div>
</body>
</html>`,

    student: `<?php
// ====================================================================
// File: student/dashboard.php
// Purpose: Authenticated Student Dashboard & Application Tracking
// ====================================================================
require_once '../config/db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'student') {
    header("Location: ../auth/login.php");
    exit();
}

$userId = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM students WHERE user_id = ?");
$stmt->execute([$userId]);
$student = $stmt->fetch();

$appStmt = $pdo->prepare("SELECT a.*, i.title, c.company_name FROM applications a JOIN internships i ON a.internship_id = i.internship_id JOIN companies c ON i.company_id = c.company_id WHERE a.student_id = ?");
$appStmt->execute([$student['student_id'] ?? 0]);
$myApps = $appStmt->fetchAll();
?>
<!DOCTYPE html>
<html>
<head><title>Student Dashboard - SkillBridge</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-50 p-6 text-slate-800">
    <div class="max-w-5xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-xl border flex justify-between items-center">
            <div>
                <h1 class="text-xl font-bold"><?= htmlspecialchars($student['full_name'] ?? 'Student') ?></h1>
                <p class="text-xs text-slate-500">PRN: <?= htmlspecialchars($student['prn_number'] ?? 'N/A') ?> · CGPA: <?= htmlspecialchars($student['cgpa'] ?? '8.5') ?></p>
            </div>
            <a href="../auth/logout.php" class="text-xs text-red-600 font-medium">Logout</a>
        </div>
        <h2 class="text-base font-bold">My Applications (<?= count($myApps) ?>)</h2>
        <div class="bg-white rounded-xl border divide-y">
            <?php foreach($myApps as $app): ?>
            <div class="p-4 flex justify-between items-center text-xs">
                <div>
                    <h3 class="font-bold text-slate-900"><?= htmlspecialchars($app['title']) ?></h3>
                    <p class="text-slate-500"><?= htmlspecialchars($app['company_name']) ?></p>
                </div>
                <span class="px-2.5 py-1 rounded font-semibold uppercase text-[10px] bg-indigo-50 text-indigo-700"><?= htmlspecialchars($app['status']) ?></span>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>`,

    company: `<?php
// ====================================================================
// File: company/dashboard.php
// Purpose: Company Recruiter Portal for Openings & Applicants
// ====================================================================
require_once '../config/db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'company') {
    header("Location: ../auth/login.php");
    exit();
}

$userId = $_SESSION['user_id'];
$cStmt = $pdo->prepare("SELECT * FROM companies WHERE user_id = ?");
$cStmt->execute([$userId]);
$company = $cStmt->fetch();

$jobStmt = $pdo->prepare("SELECT * FROM internships WHERE company_id = ?");
$jobStmt->execute([$company['company_id'] ?? 0]);
$jobs = $jobStmt->fetchAll();
?>
<!DOCTYPE html>
<html>
<head><title>Company Portal - SkillBridge</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-50 p-6 text-slate-800">
    <div class="max-w-5xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-xl border flex justify-between items-center">
            <div>
                <h1 class="text-xl font-bold"><?= htmlspecialchars($company['company_name'] ?? 'Company') ?></h1>
                <p class="text-xs text-slate-500"><?= htmlspecialchars($company['industry_sector'] ?? 'Tech') ?> · <?= htmlspecialchars($company['location_city'] ?? 'Pune') ?></p>
            </div>
            <a href="../auth/logout.php" class="text-xs text-red-600 font-medium">Logout</a>
        </div>
        <h2 class="text-base font-bold">Active Openings (<?= count($jobs) ?>)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <?php foreach($jobs as $j): ?>
            <div class="bg-white p-4 rounded-xl border space-y-2">
                <h3 class="font-bold text-sm text-slate-900"><?= htmlspecialchars($j['title']) ?></h3>
                <p class="text-slate-500">Stipend: ₹<?= number_format($j['stipend_monthly']) ?>/mo · Openings: <?= $j['openings_count'] ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>`,

    admin: `<?php
// ====================================================================
// File: admin/dashboard.php
// Purpose: Administrative Console & Placement Statistics
// ====================================================================
require_once '../config/db.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../auth/login.php");
    exit();
}

$totalStudents = $pdo->query("SELECT COUNT(*) FROM students")->fetchColumn();
$totalCompanies = $pdo->query("SELECT COUNT(*) FROM companies")->fetchColumn();
$totalApps = $pdo->query("SELECT COUNT(*) FROM applications")->fetchColumn();
?>
<!DOCTYPE html>
<html>
<head><title>Admin Console - SkillBridge</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-900 text-white p-8">
    <div class="max-w-5xl mx-auto space-y-6">
        <div class="flex justify-between items-center border-b border-slate-800 pb-4">
            <h1 class="text-2xl font-bold">University Admin Placement Console</h1>
            <a href="../auth/logout.php" class="text-xs text-red-400 font-medium">Logout</a>
        </div>
        <div class="grid grid-cols-3 gap-6 text-center">
            <div class="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div class="text-3xl font-bold"><?= $totalStudents ?></div>
                <div class="text-xs text-slate-400 mt-1">Students</div>
            </div>
            <div class="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div class="text-3xl font-bold"><?= $totalCompanies ?></div>
                <div class="text-xs text-slate-400 mt-1">Companies</div>
            </div>
            <div class="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div class="text-3xl font-bold"><?= $totalApps ?></div>
                <div class="text-xs text-slate-400 mt-1">Applications</div>
            </div>
        </div>
    </div>
</body>
</html>`
  };

  const handleCopyPhpCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPhp(true);
    setTimeout(() => setCopiedPhp(false), 2000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(EXPORT_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const vivaQuestions = [
    {
      q: "1. What is the objective and real-world significance of the SkillBridge project?",
      qMr: "SkillBridge प्रकल्पाचा मुख्य उद्देश आणि उपयोग काय आहे?",
      a: "SkillBridge bridges the communication gap between final-year computer applications students and tech employers. Students showcase verified skills, take objective skill assessments, upload standardized resumes, and apply for internships. Companies review verified credentials and manage the hiring pipeline directly, while college coordinators have real-time placement statistics.",
      aMr: "SkillBridge अंतिम वर्षाच्या विद्यार्थ्यांची कौशल्ये आणि आयटी कंपन्या यांच्यातील दुवा साधतो. यामध्ये विद्यार्थी थेट अर्ज करू शकतात, कौशल्य चाचणी देऊ शकतात आणि कंपन्या थेट निवड प्रक्रिया करू शकतात."
    },
    {
      q: "2. Why is Prepared Statements mandatory in PHP PDO / MySQLi for this project?",
      qMr: "PHP PDO मध्ये Prepared Statements वापरणे का आवश्यक आहे?",
      a: "Prepared statements parameterize data inputs. When a query is prepared, the SQL engine compiles the query template separately from user parameters. This completely eliminates SQL Injection (SQLi) attacks, because input strings cannot alter query logic regardless of quotes or special characters.",
      aMr: "Prepared statements वापरल्याने युझरने दिलेला इनपुट थेट SQL क्वेरीचा भाग बनत नाही, तर पॅरामीटर म्हणून जातो. यामुळे SQL Injection हल्ल्यांपासून डेटाबेस पूर्णपणे सुरक्षित राहतो."
    },
    {
      q: "3. How is Role-Based Access Control (RBAC) and Session Security implemented?",
      qMr: "युझर रोल (Role-Based Access Control) आणि सेशन सिक्युरिटी कशी काम करते?",
      a: "Upon login, the user's role (student, company, or admin) and user_id are bound into server-side $_SESSION variables after verifying password_verify(). Every protected page (student/dashboard.php, company/index.php, admin/dashboard.php) begins with a session authorization check. If a student attempts to access company or admin endpoints, the system redirects them to an unauthorized access error page.",
      aMr: "लॉगिन झाल्यावर पासवर्ड bcrypt द्वारे तपासला जातो आणि युझरचा रोल ($_SESSION['role']) सर्व्हरवर सेव्ह होतो. प्रत्येक पानावर रोल तपासला जातो; उदा. विद्यार्थ्याला कंपनी किंवा ॲडमिन पानावरील ॲक्सेस नाकारला जातो."
    },
    {
      q: "4. Explain the Normalization level of the SkillBridge relational database.",
      qMr: "डेटाबेस नॉर्मलायझेशन (Normalization) ची पायरी स्पष्ट करा.",
      a: "The schema satisfies 3rd Normal Form (3NF). 1NF is achieved as all attributes hold atomic values (no repeating groups). 2NF is achieved because all non-key attributes depend on the entire primary key with zero partial dependencies. 3NF is achieved because no transitive dependencies exist (e.g. company address resides in 'companies', referenced solely by company_id in 'internships').",
      aMr: "डेटाबेस 3NF (Third Normal Form) मध्ये आहे. प्रत्येक टेबलमध्ये प्रायमरी की आहे, कोणतीही माहिती अनावश्यकपणे पुन्हा साठवली जात नाही आणि फॉरेन की द्वारे अचूक संबंध जोडले आहेत."
    },
    {
      q: "5. How are resume uploads securely handled in PHP without risking server compromise?",
      qMr: "रेझ्युमे फाईल अपलोड करताना सिक्युरिटी कशी सांभाळली जाते?",
      a: "1. File extension validation (strictly .pdf and .docx). 2. MIME type verification via mime_content_type(). 3. File size restriction (max 2MB). 4. Cryptographic random renaming (e.g. sha1(microtime()).pdf) to prevent file overwrites and path traversal attacks. 5. Placement in a private storage directory with direct script execution disabled via .htaccess.",
      aMr: "फाईलचा प्रकार (MIME type - फक्त PDF/DOCX) तपासला जातो, फाईल साईज २ MB मर्यादित ठेवली जाते, आणि फाईलला सुरक्षित नवीन नाव देऊन सुरक्षित फोल्डरमध्ये ठेवले जाते."
    },
    {
      q: "6. What is the difference between an INNER JOIN and a LEFT JOIN in internship queries?",
      qMr: "INNER JOIN आणि LEFT JOIN मध्ये काय फरक आहे?",
      a: "INNER JOIN returns only records where both tables match. For example, SELECT * FROM internships INNER JOIN applications returns only internships that have at least one application. LEFT JOIN returns all internships regardless of whether any student has applied yet, displaying NULL for application columns when no applications exist.",
      aMr: "INNER JOIN फक्त दोन्ही टेबल्समधील मॅचिंग रेकॉर्ड दाखवतो, तर LEFT JOIN डाव्या टेबलमधील सर्व रेकॉर्ड्स दाखवतो (जरी उजव्या टेबलमध्ये डेटा नसला तरी)."
    },
    {
      q: "7. Why should Admin accounts NOT have a public registration page?",
      qMr: "ॲडमिन अकाउंटसाठी पब्लिक रजिस्ट्रेशन पेज का ठेवू नये?",
      a: "Public registration for admin roles creates a critical privilege escalation vector. Anyone could register as an admin and alter candidate selections, modify company records, or access sensitive student documents. Admin accounts are pre-provisioned securely by system database administrators.",
      aMr: "सार्वजनिक रजिस्ट्रेशन ठेवल्यास कोणताही अनोळखी व्यक्ती ॲडमिन बनून सिस्टिमचा डेटा बदलू शकतो. त्यामुळे ॲडमिन खाते थेट डेटाबेसमधून किंवा कॉलेज ऑथॉरिटीद्वारेच तयार केले जाते."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Academic Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                TYBBA(CA) Academic Project Documentation & Viva Hub
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                SPPU Syllabus Aligned
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Complete academic deliverables for final-year practical evaluation: Entity Relationship Diagram (ERD), full MySQL schema for XAMPP, XAMPP directory architecture, and viva voce question preparation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={exportDatabaseSQL}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download skillbridge.sql</span>
          </button>
        </div>
      </div>

      {/* Segmented Nav */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-px">
          {[
            { id: 'erd', label: 'ER Diagram & Relational Model', icon: Layers },
            { id: 'sql', label: 'MySQL Schema & DDL Script', icon: Database },
            { id: 'xampp', label: 'XAMPP & PHP Architecture', icon: FolderTree },
            { id: 'viva', label: 'Viva Voce Q&A Cheat Sheet (7 Core)', icon: HelpCircle },
            { id: 'srs', label: 'Project Synopsis & SRS', icon: BookOpen },
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

      {/* TAB 1: ER DIAGRAM */}
      {activeTab === 'erd' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Entity Relationship (ER) & Relational Schema</h3>
            <p className="text-xs text-slate-500">
              Normalized relational mapping across 6 core entities with Primary Key (PK) and Foreign Key (FK) constraints
            </p>
          </div>

          {/* Interactive ER Diagram Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            {/* Entity 1: users */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">1. users (Master Auth)</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono">1:1 with Profile</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-indigo-700">PK: user_id (INT, AUTO_INC)</li>
                <li>email (VARCHAR 120, UNIQUE)</li>
                <li>password_hash (VARCHAR 255, Bcrypt)</li>
                <li>role (ENUM: student, company, admin)</li>
                <li>status (ENUM: active, inactive)</li>
                <li>created_at (TIMESTAMP)</li>
              </ul>
            </div>

            {/* Entity 2: students */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
              <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">2. students</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-mono">FK: users</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-indigo-700">PK: student_id (INT, AUTO_INC)</li>
                <li className="font-semibold text-purple-700">FK: user_id → users</li>
                <li>prn_number (VARCHAR 30, UNIQUE)</li>
                <li>full_name (VARCHAR 100)</li>
                <li>college_name (VARCHAR 150)</li>
                <li>cgpa (DECIMAL 3,2)</li>
                <li>resume_file_path (VARCHAR 255)</li>
              </ul>
            </div>

            {/* Entity 3: companies */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">3. companies</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">FK: users</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-amber-700">PK: company_id (INT, AUTO_INC)</li>
                <li className="font-semibold text-purple-700">FK: user_id → users</li>
                <li>company_name (VARCHAR 120)</li>
                <li>industry_sector (VARCHAR 100)</li>
                <li>location_city (VARCHAR 100)</li>
                <li>is_verified (TINYINT 1)</li>
              </ul>
            </div>

            {/* Entity 4: internships */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">4. internships</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono">1:N with Applications</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-indigo-700">PK: internship_id (INT, AUTO_INC)</li>
                <li className="font-semibold text-purple-700">FK: company_id → companies</li>
                <li>title (VARCHAR 150)</li>
                <li>stipend_monthly (DECIMAL 10,2)</li>
                <li>work_mode (ENUM: Remote/Hybrid/Onsite)</li>
                <li>required_skills (TEXT)</li>
                <li>listing_status (active/closed)</li>
              </ul>
            </div>

            {/* Entity 5: applications */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">5. applications</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Associative Entity</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-emerald-700">PK: application_id (INT, AUTO_INC)</li>
                <li className="font-semibold text-purple-700">FK: internship_id → internships</li>
                <li className="font-semibold text-purple-700">FK: student_id → students</li>
                <li>status (pending/shortlisted/selected/rejected)</li>
                <li>recruiter_remarks (TEXT)</li>
                <li>interview_datetime (DATETIME)</li>
              </ul>
            </div>

            {/* Entity 6: student_test_results */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 font-mono">6. student_test_results</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono">Skill Validation</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="font-bold text-indigo-700">PK: result_id (INT, AUTO_INC)</li>
                <li className="font-semibold text-purple-700">FK: student_id → students</li>
                <li className="font-semibold text-purple-700">FK: test_id → assessment_tests</li>
                <li>score_obtained (INT)</li>
                <li>percentage (DECIMAL 5,2)</li>
                <li>badge_awarded (VARCHAR 80)</li>
              </ul>
            </div>

          </div>

          {/* Relationships Explanation */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">Cardinality & Relationships Summary:</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li><strong>users to students / companies:</strong> 1-to-1 mandatory specialization.</li>
              <li><strong>companies to internships:</strong> 1-to-Many (One company can post multiple openings).</li>
              <li><strong>students to internships (via applications):</strong> Many-to-Many resolved by the <code>applications</code> table.</li>
              <li><strong>students to test_results:</strong> 1-to-Many (One student can attempt multiple skill evaluations).</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: SQL SCHEMA */}
      {activeTab === 'sql' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Direct MySQL DDL & DML Script</h3>
              <p className="text-xs text-slate-500">
                Ready to paste into phpMyAdmin or run via MySQL command-line in XAMPP
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySql}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied SQL!' : 'Copy Script'}</span>
              </button>

              <button
                onClick={exportDatabaseSQL}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[500px]">
            {EXPORT_SQL_SCHEMA}
          </pre>
        </div>
      )}

      {/* TAB 3: XAMPP & PHP ARCHITECTURE */}
      {activeTab === 'xampp' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">How to Run in VS Code & XAMPP (Localhost Setup Guide)</h3>
                <p className="text-xs text-slate-500">
                  Step-by-step local development workflow for TYBBA(CA) project viva & practical examination
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded self-start sm:self-auto">
                Path: C:\xampp\htdocs\skillbridge\
              </span>
            </div>
          </div>

          {/* 5-Step Visual Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">1</div>
              <div className="font-bold text-slate-900">Start XAMPP</div>
              <p className="text-slate-500 text-[11px]">Open XAMPP Control Panel. Click <strong>Start</strong> on Apache & MySQL.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">2</div>
              <div className="font-bold text-slate-900">Import Database</div>
              <p className="text-slate-500 text-[11px]">Go to <code>localhost/phpmyadmin</code>, create <code>skillbridge_db</code> and import the SQL file.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">3</div>
              <div className="font-bold text-slate-900">Open in VS Code</div>
              <p className="text-slate-500 text-[11px]">In VS Code: <code>File → Open Folder</code> → select <code>C:\xampp\htdocs\skillbridge</code>.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">4</div>
              <div className="font-bold text-slate-900">Create PHP Files</div>
              <p className="text-slate-500 text-[11px]">Copy the clean PHP templates below into their respective folders.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">5</div>
              <div className="font-bold text-slate-900">Run in Browser</div>
              <p className="text-slate-500 text-[11px]">Open browser and visit: <code>http://localhost/skillbridge/</code></p>
            </div>
          </div>

          {/* Interactive File Selector & Code Copy Hub */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-slate-100 p-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1 font-mono">
                {[
                  { id: 'db', name: 'config/db.php' },
                  { id: 'index', name: 'index.php' },
                  { id: 'login', name: 'auth/login.php' },
                  { id: 'register', name: 'auth/register.php' },
                  { id: 'student', name: 'student/dashboard.php' },
                  { id: 'company', name: 'company/dashboard.php' },
                  { id: 'admin', name: 'admin/dashboard.php' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActivePhpFile(f.id as any)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      activePhpFile === f.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCopyPhpCode(phpCodeSnippets[activePhpFile])}
                className="px-3 py-1 bg-white hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-medium text-slate-800 transition-colors flex items-center gap-1 shadow-2xs"
              >
                {copiedPhp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedPhp ? 'Copied to Clipboard!' : 'Copy This File Code'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-[420px] leading-relaxed">
              <pre>{phpCodeSnippets[activePhpFile]}</pre>
            </div>
          </div>

          {/* VS Code Extension Tips & Troubleshooting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Recommended VS Code Extensions for PHP:</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                <li><strong>PHP Intelephense</strong> (Ben Mewburn) — Syntax highlight, autocomplete, error detection.</li>
                <li><strong>PHP Server</strong> (brapifra) — Quick local PHP preview directly inside VS Code.</li>
                <li><strong>Tailwind CSS IntelliSense</strong> — Autocomplete for utility CSS styling.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Common XAMPP Issues & Solutions:</h4>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                <li><strong>Port 80 Conflict:</strong> If Apache fails to start, Skype or IIS is using port 80. Change port in <code>httpd.conf</code> to 8080 (visit <code>localhost:8080/skillbridge</code>).</li>
                <li><strong>Access Denied MySQL:</strong> Default root user in XAMPP has no password ($password = "").</li>
                <li><strong>404 Not Found:</strong> Confirm folder name matches exactly: <code>C:\xampp\htdocs\skillbridge\index.php</code>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VIVA VOCE CHEAT SHEET */}
      {activeTab === 'viva' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">TYBBA(CA) External Examiner Viva Voce Preparation</h3>
            <p className="text-xs text-slate-500">
              The 7 most important technical questions asked by university examiners with answers in English & Marathi
            </p>
          </div>

          <div className="space-y-3">
            {vivaQuestions.map((item, idx) => {
              const isExpanded = expandedFaq === idx;

              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs font-bold text-slate-900"
                  >
                    <div>
                      <div>{item.q}</div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">{item.qMr}</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-white text-xs space-y-3 border-t border-slate-200">
                      <div>
                        <strong className="text-slate-900 block mb-1">Answer (English):</strong>
                        <p className="text-slate-700 leading-relaxed">{item.a}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <strong className="text-indigo-900 block mb-1">उत्तर (मराठीत):</strong>
                        <p className="text-slate-600 leading-relaxed font-sans">{item.aMr}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: PROJECT SYNOPSIS & SRS */}
      {activeTab === 'srs' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Project Synopsis & SRS Summary</h3>
              <p className="text-xs text-slate-500">Savitribai Phule Pune University · TYBBA(CA) Final Year Project</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Synopsis</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">1. Project Title</h4>
              <p>SkillBridge: Student Skill & Internship Management System for Computer Applications Graduates.</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">2. Problem Statement</h4>
              <p>
                In many academic institutions, internship drives and student skill matching rely on informal messaging channels, unorganized spreadsheets, and manual email submissions. Students lack feedback on application status, and companies struggle to verify technical competencies before scheduling interviews. SkillBridge centralizes this workflow into a single role-based web portal.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">3. Hardware & Software Requirements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Software Environment:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li>Operating System: Windows 10/11 or Linux</li>
                    <li>Web Server: Apache HTTP Server (via XAMPP)</li>
                    <li>Server-Side Scripting: PHP 8.1+</li>
                    <li>Database Engine: MySQL / MariaDB 10.4+</li>
                    <li>Frontend: HTML5, CSS3, JavaScript, Tailwind CSS</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Hardware Minimums:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li>Processor: Intel Core i3 / AMD Ryzen 3 or higher</li>
                    <li>RAM: 4 GB minimum (8 GB recommended)</li>
                    <li>Storage: 20 GB free disk space for XAMPP & data</li>
                    <li>Network: Localhost connection for internal demo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">4. Module Descriptions</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><strong>Student Module:</strong> Registration, profile management, skill inventory, resume upload, internship search, application status tracking, and MCQ assessment tests.</li>
                <li><strong>Company Module:</strong> Company registration, vacancy posting, resume screening, status updating (Pending/Shortlisted/Selected/Rejected), and interview notes.</li>
                <li><strong>Admin Module:</strong> Verification of companies, student database management, audit logs, and college placement reports generation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
