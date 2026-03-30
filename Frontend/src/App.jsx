import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/home'
import AboutMe from './Pages/aboutMe'
import Family from './Pages/family/Family'
import Career from './Pages/career'
import Padmabhushan from './Pages/awards/Padmabhushan'
import RajyotsavaAward from './Pages/awards/RajyotsavaAward'
import DLitt from './Pages/awards/DLitt'
import Interview from './Pages/interview'
import Article from './Pages/article'
import Books from './Pages/books'
import VIPs from './Pages/vips'
import PrivacyPolicy from './Pages/Privacy'
import TermsAndConditions from './Pages/termsAndConditions'
import AwardsIndex from './Pages/awards/index'
import AdminPanel from './Pages/Admin/AdminPanel'
import Media from './Pages/media'
import LoginPage from './Pages/Admin/LoginPage'
import { AuthProvider, useAuth } from './Context/AuthContext'

import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return null; // Or a loading spinner

  if (!admin) {
    return <LoginPage />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/family" element={<Family />} />
        <Route path="/career" element={<Career />} />
        <Route path="/awards" element={<AwardsIndex />} />
        <Route path="/awards/padmabhushan" element={<Padmabhushan />} />
        <Route path="/awards/rajyotsava-award" element={<RajyotsavaAward />} />
        <Route path="/awards/d-litt" element={<DLitt />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/article" element={<Article />} />
        <Route path="/books" element={<Books />} />
        <Route path="/gallery" element={<VIPs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/media" element={<Media />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
