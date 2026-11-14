import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun, Gamepad2, Bell, User } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'หน้าแรก' },
  { path: '/news', label: 'ข่าว' },
  { path: '/reviews', label: 'รีวิว' },
  { path: '/guides', label: 'ไกด์' },
  { path: '/esports', label: 'อีสปอร์ต' },
  { path: '/upcoming', label: 'เกมเร็วๆ นี้' },
];

export default function Navbar({ isDark, toggleDark }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <Gamepad2 size={28} />
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-main">GAME</span>
              <span className="navbar__logo-accent">OUT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="ค้นหา"
            >
              <Search size={20} />
            </button>

            <button
              className="navbar__action-btn"
              onClick={toggleDark}
              aria-label="เปลี่ยนธีม"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="navbar__action-btn navbar__notification-btn" aria-label="การแจ้งเตือน">
              <Bell size={20} />
              <span className="navbar__notification-badge">3</span>
            </button>

            <button className="navbar__action-btn navbar__user-btn" aria-label="โปรไฟล์">
              <User size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="navbar__mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="เมนู"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="navbar__search-dropdown">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__overlay" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <div className="navbar__logo">
              <div className="navbar__logo-icon">
                <Gamepad2 size={24} />
              </div>
              <div className="navbar__logo-text">
                <span className="navbar__logo-main">GAME</span>
                <span className="navbar__logo-accent">PULSE</span>
              </div>
            </div>
            <button
              className="mobile-menu__close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-menu__links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu__footer">
            <button className="mobile-menu__theme-btn" onClick={toggleDark}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDark ? 'โหมดสว่าง' : 'โหมดมืด'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
