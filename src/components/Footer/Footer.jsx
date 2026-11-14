import { Link } from 'react-router-dom';
import { Gamepad2, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';

// Custom Social SVG Icons
const Icons = {
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Gamepad2 size={24} />
              </div>
              <div className="footer__logo-text">
                <span className="footer__logo-main">GAME</span>
                <span className="footer__logo-accent">OUT</span>
              </div>
            </div>
            <p className="footer__tagline">
              แหล่งรวมข่าวเกม รีวิว และข้อมูลอีสปอร์ตที่ครบที่สุดในไทย
              อัปเดตทุกวัน ทันทุกความเคลื่อนไหวในโลกเกม
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <Icons.Facebook />
              </a>
              {/* <a href="#" className="footer__social-link" aria-label="Twitter">
                <Icons.Twitter />
              </a>*/}
              <a href="#" className="footer__social-link" aria-label="Youtube">
                <Icons.Youtube />
              </a>
              {/* <a href="#" className="footer__social-link" aria-label="Instagram">
                <Icons.Instagram />
              </a>*/}
              {/*<a href="#" className="footer__social-link" aria-label="Github">
                <Icons.Github />
              </a>*/}
            </div>
          </div>

          <div className="footer__links-grid">
            <div className="footer__links-col">
              <h4 className="footer__links-title">เนื้อหา</h4>
              <ul className="footer__links-list">
                <li><Link to="/news" className="footer__link">ข่าวเกม</Link></li>
                <li><Link to="/reviews" className="footer__link">รีวิว</Link></li>
                <li><Link to="/guides" className="footer__link">ไกด์</Link></li>
                <li><Link to="/esports" className="footer__link">อีสปอร์ต</Link></li>
                <li><Link to="/upcoming" className="footer__link">เกมเร็วๆ นี้</Link></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__links-title">ชุมชน</h4>
              <ul className="footer__links-list">
                <li><a href="#" className="footer__link">ฟอรัม</a></li>
                <li><a href="#" className="footer__link">Discord</a></li>
                <li><a href="#" className="footer__link">กิจกรรม</a></li>
                <li><a href="#" className="footer__link">ผู้มีส่วนร่วม</a></li>
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__links-title">เกี่ยวกับ</h4>
              <ul className="footer__links-list">
                <li><a href="#" className="footer__link">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="footer__link">ร่วมงานกับเรา</a></li>
                <li><a href="#" className="footer__link">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="#" className="footer__link">ข้อกำหนดการใช้งาน</a></li>
                <li><a href="#" className="footer__link">ติดต่อเรา</a></li>
                <li><Link to="/add-news" className="footer__link footer__link--staff" title="ทางเข้าเฉพาะทีมงาน">ระบบทีมงาน (Staff)</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 GameOut. สร้างด้วย <Heart size={14} className="footer__heart" /> สำหรับเกมเมอร์
          </p>
          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="กลับไปด้านบน">
            <ArrowUp size={18} />
            <span>กลับด้านบน</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
