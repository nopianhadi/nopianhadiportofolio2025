
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Services from './components/Services';
import VideoIntroduction from './components/VideoIntroduction';
import Process from './components/Process';
import AIIntegration from './components/AIIntegration';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Articles from './components/Articles';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyDetail from './components/CaseStudyDetail';
import ArticleDetail from './components/ArticleDetail';
import ScrollingBackground3D from './components/ScrollingBackground3D';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProjectsManagement from './components/admin/ProjectsManagement';
import ArticlesManagement from './components/admin/ArticlesManagement';
import TestimonialsManagement from './components/admin/TestimonialsManagement';
import SettingsManagement from './components/admin/SettingsManagement';
import ContactMessages from './components/admin/ContactMessages';
const HomePage: React.FC = () => {
  React.useEffect(() => {

    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    });

    // Parallax effect untuk smooth transitions
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#F6F6F6] text-gray-800 relative">
      <ScrollingBackground3D />
      <div className="relative z-10">
        <Header />
        <main className="transition-all duration-300 ease-out">
          <Hero />
          <Profile />
          <Skills />
          <SelectedWork />
          <Services />
          <VideoIntroduction />
          <Process />
          <AIIntegration />
          <Experience />
          <Testimonials />
          <Articles />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/:id" element={<CaseStudyDetail />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/projects" 
          element={
            <ProtectedRoute>
              <ProjectsManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/testimonials" 
          element={
            <ProtectedRoute>
              <TestimonialsManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/articles" 
          element={
            <ProtectedRoute>
              <ArticlesManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <SettingsManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/messages" 
          element={
            <ProtectedRoute>
              <ContactMessages />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
