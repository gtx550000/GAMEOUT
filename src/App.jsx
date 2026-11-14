import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import Addnews from './components/Addnews/Addnews';
import { NewsProvider } from './context/NewsContext';
import { useDarkMode } from './hooks/useDarkMode';
import './App.css';

// ช่วยเลื่อนหน้าจอขึ้นบนสุดเมื่อเปลี่ยน Route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ทางลัดคีย์บอร์ดเฉพาะทีมงาน: กด Ctrl + Shift + A เพื่อเปิดหน้าเพิ่มข่าว/รีวิว
function StaffKeyboardShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ตรวจสอบคีย์ลัด Ctrl + Shift + A (หรือ Cmd + Shift + A บน macOS)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/add-news');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

function App() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <NewsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <StaffKeyboardShortcut />
        <div className="app-wrapper">
          <Navbar isDark={isDark} toggleDark={toggleDark} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />

              {/* URL Path สำหรับทีมงานเข้าสู่ระบบจัดการข่าวและรีวิว */}
              <Route path="/add-news" element={<Addnews />} />
              <Route path="/addnews" element={<Addnews />} />
              <Route path="/staff" element={<Addnews />} />
              <Route path="/admin" element={<Addnews />} />

              <Route path="/:category" element={<CategoryPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </NewsProvider>
  );
}

export default App;
