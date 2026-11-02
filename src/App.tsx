import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/home/HomePage';
import { InternshipDirectory } from './components/internships/InternshipDirectory';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CompanyDashboard } from './components/company/CompanyDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectAcademicHub } from './components/academic/ProjectAcademicHub';
import { AuthModal } from './components/auth/AuthModal';
import { InternshipDetailsModal } from './components/common/InternshipDetailsModal';
import { ApplyInternshipModal } from './components/common/ApplyInternshipModal';
import { Internship } from './types';

function MainApp() {
  const { currentRole } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedInternshipForDetails, setSelectedInternshipForDetails] = useState<Internship | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInternshipForApply, setSelectedInternshipForApply] = useState<Internship | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleOpenInternshipDetails = (internship: Internship) => {
    setSelectedInternshipForDetails(internship);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApplyModal = (internship: Internship) => {
    setSelectedInternshipForApply(internship);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={setCurrentTab}
            onApplyInternship={handleOpenApplyModal}
            onViewInternshipDetails={handleOpenInternshipDetails}
          />
        )}

        {currentTab === 'internships' && (
          <InternshipDirectory
            onApply={handleOpenApplyModal}
            onViewDetails={handleOpenInternshipDetails}
          />
        )}

        {currentTab === 'student' && (
          <StudentDashboard
            onApplyInternship={handleOpenApplyModal}
            onViewInternshipDetails={handleOpenInternshipDetails}
          />
        )}

        {currentTab === 'company' && (
          <CompanyDashboard />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}

        {currentTab === 'academic' && (
          <ProjectAcademicHub />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          // If logged in as student, can stay or switch
        }}
      />

      {/* Internship Details Modal */}
      <InternshipDetailsModal
        internship={selectedInternshipForDetails}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedInternshipForDetails(null);
        }}
        onApply={(internship) => {
          handleOpenApplyModal(internship);
        }}
      />

      {/* Apply Internship Modal */}
      <ApplyInternshipModal
        internship={selectedInternshipForApply}
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedInternshipForApply(null);
        }}
        onSuccess={() => {
          // Refresh / can navigate to student applications tab
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
