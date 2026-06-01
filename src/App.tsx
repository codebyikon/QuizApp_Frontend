import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import AssessmentsManagement from './pages/admin/AssessmentsManagement';
import Analytics from './pages/admin/Analytics';
import CategoryList from './pages/student/CategoryList';
import AssessmentList from './pages/student/AssessmentList';
import TakeAssessment from './pages/student/TakeAssessment';
import AssessmentResult from './pages/student/AssessmentResult';
import SubmissionHistory from './pages/student/SubmissionHistory';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
          <Navbar />
          <div className="app-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute roles={['student']} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/categories" element={<CategoryList />} />
              <Route path="/student/assessments" element={<AssessmentList />} />
              <Route path="/student/assessment/:id" element={<TakeAssessment />} />
              <Route path="/student/result/:id" element={<AssessmentResult />} />
              <Route path="/student/history" element={<SubmissionHistory />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersManagement />} />
              <Route path="/admin/categories" element={<CategoriesManagement />} />
              <Route path="/admin/assessments" element={<AssessmentsManagement />} />
              <Route path="/admin/analytics" element={<Analytics />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
