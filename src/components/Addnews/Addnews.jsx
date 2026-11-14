import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  User,
  KeyRound,
  FileText,
  Star,
  Image,
  Tag,
  Clock,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Layers,
  Award,
  History,
  Calendar,
  Search,
  Edit3,
  ExternalLink,
  RotateCcw,
  X,
  AlertCircle,
  FileCheck2,
  Filter
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import ReviewScore from '../ReviewScore/ReviewScore';
import './Addnews.css';

// รหัสผ่านของทีมงาน GamePulse
const STAFF_CREDENTIALS = [
  { username: 'admin', password: 'password123', role: 'บรรณาธิการบริหาร (Editor-in-Chief)' },
  { username: 'editor', password: 'gamepulse2026', role: 'ผู้เขียนข่าวและนักวิจารณ์เกม' },
];

// รูปภาพเกมตัวอย่างที่เตรียมไว้ให้ทีมงานเลือกใช้แบบรวดเร็ว
const PRESET_IMAGES = [
  { name: 'GTA VI', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop' },
  { name: 'Fantasy RPG', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=600&fit=crop' },
  { name: 'PlayStation', url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&h=600&fit=crop' },
  { name: 'Dark Souls', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=1200&h=600&fit=crop' },
  { name: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&h=600&fit=crop' },
  { name: 'Nintendo', url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=1200&h=600&fit=crop' },
];

export default function Addnews() {
  const navigate = useNavigate();
  const { articles, addArticle, updateArticle, deleteArticle } = useNews();

  // สถานะการเข้าสู่ระบบของทีมงาน (เก็บลง sessionStorage)
  const [currentStaff, setCurrentStaff] = useState(() => {
    try {
      const saved = sessionStorage.getItem('gamepulse_staff_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State สำหรับฟอร์มล็อกอิน
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // แท็บหลัก: 'news' (เพิ่มข่าวสาร), 'reviews' (รีวิวเกม), 'history' (ประวัติและแก้ไข)
  const [activeTab, setActiveTab] = useState('news');

  // สถานะกำลังอยู่ในโหมดแก้ไขบทความเดิมหรือไม่
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editReason, setEditReason] = useState('');

  // ฟิลด์ข้อมูลของบทความ
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('news');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [author, setAuthor] = useState(currentStaff?.username ? `Staff: ${currentStaff.username}` : 'GamePulse Staff');
  const [readTime, setReadTime] = useState('5');
  const [tagsInput, setTagsInput] = useState('Gaming, News, 2026');
  const [content, setContent] = useState('');

  // ฟิลด์เฉพาะหมวดรีวิวเกม
  const [score, setScore] = useState(8.5);
  const [verdict, setVerdict] = useState('');
  const [pros, setPros] = useState(['กราฟิกอลังการระดับ Next-Gen', 'เกมเพลย์ลื่นไหล น่าติดตาม']);
  const [cons, setCons] = useState(['เนื้อเรื่องช่วงต้นดำเนินเรื่องช้า']);
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  // สถานะแสดงพรีวิว หรือแสดงความสำเร็จ
  const [showPreview, setShowPreview] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  // สถานะเปิดดูประวัติการแก้ไขของบทความ (Modal)
  const [viewingHistoryArticle, setViewingHistoryArticle] = useState(null);

  // -------------------------------------------------------------
  // Filter States สำหรับหน้าประวัติ (History Tab)
  // -------------------------------------------------------------
  const [historySearch, setHistorySearch] = useState('');
  const [historyCategory, setHistoryCategory] = useState('all');
  const [historyDate, setHistoryDate] = useState(''); // เลือกวันจากปฏิทิน เช่น 2026-11-14
  const [historyMonth, setHistoryMonth] = useState('all'); // เลือกเดือน เช่น 2026-11

  // คัดกรองบทความของนักเขียนคนนั้น
  const authorArticles = useMemo(() => {
    if (!currentStaff) return [];

    return articles.filter((art) => {
      // ตรวจสอบว่าเป็นบทความของนักเขียนคนนี้หรือไม่
      // (เปรียบเทียบจาก createdBy หรือชื่อผู้เขียน หรือถ้าเป็น admin สามารถดูทั้งหมดได้)
      const isOwner =
        art.createdBy === currentStaff.username ||
        (art.author && art.author.toLowerCase().includes(currentStaff.username.toLowerCase())) ||
        currentStaff.username === 'admin';

      if (!isOwner) return false;

      // กรองตามคำค้นหา
      if (historySearch.trim()) {
        const query = historySearch.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchExcerpt = (art.excerpt || '').toLowerCase().includes(query);
        if (!matchTitle && !matchExcerpt) return false;
      }

      // กรองตามหมวดหมู่ (ข่าว หรือ รีวิว)
      if (historyCategory === 'news' && art.category === 'reviews') return false;
      if (historyCategory === 'reviews' && art.category !== 'reviews') return false;

      // กรองตามวันที่ระบุจากปฏิทิน
      if (historyDate && art.date !== historyDate) {
        return false;
      }

      // กรองตามเดือน เช่น 2026-11
      if (historyMonth !== 'all') {
        const artMonth = (art.date || '').substring(0, 7);
        if (artMonth !== historyMonth) return false;
      }

      return true;
    });
  }, [articles, currentStaff, historySearch, historyCategory, historyDate, historyMonth]);

  // รวบรวมเดือนทั้งหมดที่มีบทความ สำหรับ Dropdown กรองเดือน
  const availableMonths = useMemo(() => {
    const monthsSet = new Set();
    articles.forEach((art) => {
      if (art.date) {
        const m = art.date.substring(0, 7);
        if (m) monthsSet.add(m);
      }
    });
    return Array.from(monthsSet).sort().reverse();
  }, [articles]);

  // การล็อกอิน
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const matched = STAFF_CREDENTIALS.find(
      (c) => c.username === loginUsername.trim() && c.password === loginPassword.trim()
    );

    if (matched) {
      const staffData = { username: matched.username, role: matched.role };
      setCurrentStaff(staffData);
      setAuthor(`ทีมงาน: ${matched.username}`);
      sessionStorage.setItem('gamepulse_staff_user', JSON.stringify(staffData));
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านทีมงานไม่ถูกต้อง (ดูข้อมูลทดสอบด้านล่าง)');
    }
  };

  // การออกจากระบบ
  const handleLogout = () => {
    setCurrentStaff(null);
    sessionStorage.removeItem('gamepulse_staff_user');
  };

  // จัดการเพิ่มข้อดี/ข้อเสีย
  const handleAddPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const handleRemovePro = (index) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const handleAddCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  const handleRemoveCon = (index) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  // เริ่มต้นแก้ไขบทความ (ดึงข้อมูลเข้าสู่ฟอร์ม)
  const handleStartEdit = (art) => {
    setEditingArticleId(art.id);
    setTitle(art.title || '');
    setCategory(art.category || 'news');
    setExcerpt(art.excerpt || '');
    setImage(art.image || PRESET_IMAGES[0].url);
    setAuthor(art.author || `ทีมงาน: ${currentStaff.username}`);
    setReadTime(art.readTime ? String(art.readTime).replace(/[^0-9]/g, '') : '5');
    setTagsInput(art.tags ? art.tags.join(', ') : '');
    setContent(art.content || '');
    setEditReason('');

    // ฟิลด์รีวิว
    if (art.category === 'reviews') {
      setActiveTab('reviews');
      setScore(art.score || 8.5);
      setVerdict(art.verdict || '');
      setPros(art.pros || ['เกมเพลย์ลื่นไหล ยอดเยี่ยม']);
      setCons(art.cons || ['มีปัญหาเฟรมเรตตกเล็กน้อย']);
    } else {
      setActiveTab('news');
    }

    // เลื่อนหน้าจอขึ้นด้านบน
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ยกเลิกโหมดแก้ไข
  const handleCancelEdit = () => {
    setEditingArticleId(null);
    setEditReason('');
    handleResetForm();
  };

  // ยืนยันการลบบทความ
  const handleDeleteArticle = (id, artTitle) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบบทความ "${artTitle}" นี้ออกจากระบบ?`)) {
      deleteArticle(id);
      alert('ลบบทความเรียบร้อยแล้ว');
    }
  };

  // บันทึกและเผยแพร่ข่าว/รีวิว (ทั้งแบบสร้างใหม่ และแบบแก้ไข)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim()) {
      alert('กรุณากรอกหัวข้อและคำโปรยให้ครบถ้วน');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const articleData = {
      title: title.trim(),
      category: activeTab === 'reviews' ? 'reviews' : category,
      excerpt: excerpt.trim(),
      image: image.trim() || PRESET_IMAGES[0].url,
      author: author.trim() || 'GamePulse Staff',
      readTime,
      tags: tags.length > 0 ? tags : ['GamePulse', 'Gaming'],
      content: content.trim(),
      createdBy: currentStaff?.username || 'admin',
    };

    if (activeTab === 'reviews') {
      articleData.score = parseFloat(score);
      articleData.verdict = verdict.trim();
      articleData.pros = pros;
      articleData.cons = cons;
    }

    if (editingArticleId) {
      // โหมดแก้ไขบทความเดิม
      const updated = updateArticle(
        editingArticleId,
        articleData,
        currentStaff.username,
        editReason.trim() || 'อัปเดตข้อมูลบทความ'
      );
      setSuccessInfo({
        id: editingArticleId,
        isEdit: true,
        title: updated ? updated.title : title,
      });
      setEditingArticleId(null);
      setEditReason('');
    } else {
      // โหมดสร้างบทความใหม่
      const created = addArticle(articleData);
      setSuccessInfo({
        id: created.id,
        isEdit: false,
        title: created.title,
      });
    }
  };

  // ล้างฟอร์มเพื่อเริ่มใหม่
  const handleResetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setVerdict('');
    setEditReason('');
    setSuccessInfo(null);
    setShowPreview(false);
  };

  // -------------------------------------------------------------
  // ส่วนที่ 1: หน้าต่าง Login ของทีมงาน (Staff Login Guard)
  // -------------------------------------------------------------
  if (!currentStaff) {
    return (
      <div className="addnews-login">
        <div className="addnews-login__card">
          <div className="addnews-login__badge">
            <Lock size={16} />
            <span>GamePulse Staff Only</span>
          </div>

          <h1 className="addnews-login__title">เข้าสู่ระบบทีมงาน</h1>
          <p className="addnews-login__subtitle">
            พื้นที่เฉพาะสำหรับกองบรรณาธิการและนักเขียน เพื่อเพิ่ม/แก้ไขข่าวสารและบทความรีวิว
          </p>

          {loginError && (
            <div className="addnews-login__alert">
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="addnews-login__form">
            <div className="addnews-login__field">
              <label>
                <User size={16} />
                <span>ชื่อผู้ใช้ทีมงาน</span>
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="เช่น admin หรือ editor"
                required
                autoFocus
              />
            </div>

            <div className="addnews-login__field">
              <label>
                <KeyRound size={16} />
                <span>รหัสผ่าน</span>
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="addnews-login__submit-btn">
              <span>เข้าสู่ระบบจัดการข่าว</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* บัญชีตัวอย่างสำหรับทดสอบ */}
          <div className="addnews-login__demo-box">
            <div className="addnews-login__demo-header">
              <ShieldCheck size={16} />
              <span>บัญชีสำหรับทดสอบของทีมงาน</span>
            </div>
            <div className="addnews-login__demo-list">
              <div
                className="addnews-login__demo-item"
                onClick={() => {
                  setLoginUsername('admin');
                  setLoginPassword('password123');
                }}
              >
                <strong>Admin:</strong> admin / password123 <span>(คลิกเพื่อใส่)</span>
              </div>
              <div
                className="addnews-login__demo-item"
                onClick={() => {
                  setLoginUsername('editor');
                  setLoginPassword('gamepulse2026');
                }}
              >
                <strong>Editor:</strong> editor / gamepulse2026 <span>(คลิกเพื่อใส่)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ส่วนที่ 2: หน้าต่างเมื่อเผยแพร่/แก้ไขสำเร็จ (Success Modal)
  // -------------------------------------------------------------
  if (successInfo) {
    return (
      <div className="addnews-success">
        <div className="addnews-success__card">
          <div className="addnews-success__icon">
            <CheckCircle size={48} />
          </div>
          <h2>{successInfo.isEdit ? 'อัปเดตบทความสำเร็จแล้ว! ✏️' : 'เผยแพร่บทความสำเร็จแล้ว! 🎉'}</h2>
          <p>
            {successInfo.isEdit
              ? `บทความ "${successInfo.title}" ได้รับการแก้ไขและบันทึกประวัติการปรับปรุงเรียบร้อยแล้ว`
              : 'บทความของคุณถูกเพิ่มลงหน้าแรกและหมวดหมู่ของเว็บไซต์แบบสดๆ เรียบร้อยแล้ว'}
          </p>

          <div className="addnews-success__actions">
            <button
              className="addnews-btn addnews-btn--primary"
              onClick={() => navigate(`/article/${successInfo.id}`)}
            >
              <span>ไปดูบทความที่หน้าเว็บทันที</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="addnews-btn addnews-btn--secondary"
              onClick={() => {
                handleResetForm();
                setActiveTab('history');
              }}
            >
              <span>ดูในประวัติบทความ</span>
            </button>

            <button
              className="addnews-btn addnews-btn--text"
              onClick={handleResetForm}
            >
              เขียนบทความอื่นต่อ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ส่วนที่ 3: หน้าหลักของฟอร์ม Addnews
  // -------------------------------------------------------------
  return (
    <div className="addnews-page">
      <div className="container">
        {/* Header แถบข้อมูลทีมงานและปุ่มควบคุม */}
        <div className="addnews-header">
          <div className="addnews-header__info">
            <div className="addnews-header__staff-pill">
              <ShieldCheck size={16} />
              <span>{currentStaff.role}</span>
            </div>
            <h1 className="addnews-header__title">ระบบจัดการข่าวสารและรีวิว</h1>
            <p className="addnews-header__desc">
              กำลังล็อกอินในนาม: <strong>{currentStaff.username}</strong>
            </p>
          </div>

          <div className="addnews-header__actions">
            {activeTab !== 'history' && (
              <button
                type="button"
                className={`addnews-preview-toggle ${showPreview ? 'active' : ''}`}
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye size={18} />
                <span>{showPreview ? 'ปิดพรีวิว' : 'ดูตัวอย่างสด'}</span>
              </button>
            )}

            <button
              type="button"
              className="addnews-logout-btn"
              onClick={handleLogout}
              title="ออกจากระบบ"
            >
              <LogOut size={18} />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>

        {/* แบนเนอร์เตือนเมื่ออยู่ในโหมดแก้ไข (Editing Banner) */}
        {editingArticleId && (
          <div className="addnews-editing-banner">
            <div className="addnews-editing-banner__content">
              <Edit3 size={20} className="addnews-editing-banner__icon" />
              <div>
                <strong>กำลังอยู่ในโหมดแก้ไขบทความ (ID: {editingArticleId})</strong>
                <p>ทำการแก้ไขข้อมูลด้านล่าง แล้วกด "บันทึกการแก้ไข" เพื่ออัปเดตบทความทันที</p>
              </div>
            </div>
            <button
              type="button"
              className="addnews-editing-banner__cancel"
              onClick={handleCancelEdit}
            >
              <X size={16} />
              <span>ยกเลิกการแก้ไข</span>
            </button>
          </div>
        )}

        {/* แท็บหลัก 3 แท็บ: เพิ่มข่าวสาร | รีวิวเกม | ประวัติและการแก้ไข */}
        <div className="addnews-tabs">
          <button
            type="button"
            className={`addnews-tab ${activeTab === 'news' ? 'addnews-tab--active' : ''}`}
            onClick={() => {
              setActiveTab('news');
              if (category === 'reviews') setCategory('news');
            }}
          >
            <FileText size={20} />
            <div className="addnews-tab__text">
              <span className="addnews-tab__name">1. เพิ่มข่าวสาร (Gaming News)</span>
              <span className="addnews-tab__sub">อัปเดตข่าวใหม่ ไกด์เกม อีสปอร์ต</span>
            </div>
          </button>

          <button
            type="button"
            className={`addnews-tab ${activeTab === 'reviews' ? 'addnews-tab--active' : ''}`}
            onClick={() => {
              setActiveTab('reviews');
              setCategory('reviews');
            }}
          >
            <Star size={20} />
            <div className="addnews-tab__text">
              <span className="addnews-tab__name">2. รีวิวเกม (Game Review)</span>
              <span className="addnews-tab__sub">ให้คะแนน วิจารณ์เจาะลึก จุดเด่นจุดด้อย</span>
            </div>
          </button>

          <button
            type="button"
            className={`addnews-tab addnews-tab--history ${activeTab === 'history' ? 'addnews-tab--active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={20} />
            <div className="addnews-tab__text">
              <span className="addnews-tab__name">
                3. ประวัติบทความ & แก้ไข
                <span className="addnews-tab__count">{authorArticles.length}</span>
              </span>
              <span className="addnews-tab__sub">เลือกวัน/เดือน ปฏิทิน และดูประวัติแก้ไข</span>
            </div>
          </button>
        </div>

        {/* -----------------------------------------------------------
            กรณีแท็บ 3: หน้าประวัติบทความของนักเขียน (History & Revision)
           ----------------------------------------------------------- */}
        {activeTab === 'history' ? (
          <div className="addnews-history-section">
            {/* กล่องตัวกรองและปฏิทิน (Filter & Calendar Toolbar) */}
            <div className="addnews-history-toolbar">
              <div className="addnews-history-toolbar__search">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อข่าวสารหรือเกมที่เคยเขียน..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                />
                {historySearch && (
                  <button onClick={() => setHistorySearch('')} className="clear-btn">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="addnews-history-toolbar__filters">
                {/* ตัวกรองหมวดหมู่ */}
                <div className="filter-group">
                  <Filter size={15} />
                  <select
                    value={historyCategory}
                    onChange={(e) => setHistoryCategory(e.target.value)}
                  >
                    <option value="all">ทุกหมวดหมู่</option>
                    <option value="news">เฉพาะข่าวสาร</option>
                    <option value="reviews">เฉพาะรีวิวเกม</option>
                  </select>
                </div>

                {/* ตัวกรองเดือน */}
                <div className="filter-group">
                  <Calendar size={15} />
                  <select
                    value={historyMonth}
                    onChange={(e) => {
                      setHistoryMonth(e.target.value);
                      if (e.target.value !== 'all') setHistoryDate('');
                    }}
                  >
                    <option value="all">ทุกเดือน</option>
                    {availableMonths.map((m) => (
                      <option key={m} value={m}>
                        เดือน {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ตัวเลือกปฏิทินระบุวันเจาะจง (Calendar Date Picker) */}
                <div className="filter-group filter-group--date">
                  <label htmlFor="calendar-date-filter" title="เลือกวันที่จากปฏิทิน">
                    <span>ปฏิทินวัน:</span>
                  </label>
                  <input
                    id="calendar-date-filter"
                    type="date"
                    value={historyDate}
                    onChange={(e) => {
                      setHistoryDate(e.target.value);
                      if (e.target.value) setHistoryMonth('all');
                    }}
                    className="history-date-picker"
                  />
                  {historyDate && (
                    <button
                      type="button"
                      onClick={() => setHistoryDate('')}
                      className="clear-date-btn"
                      title="ล้างวันที่"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* ปุ่มล้างตัวกรองทั้งหมด */}
                {(historyDate || historyMonth !== 'all' || historyCategory !== 'all' || historySearch) && (
                  <button
                    type="button"
                    className="history-reset-btn"
                    onClick={() => {
                      setHistoryDate('');
                      setHistoryMonth('all');
                      setHistoryCategory('all');
                      setHistorySearch('');
                    }}
                  >
                    <RotateCcw size={14} />
                    <span>ล้างตัวกรอง</span>
                  </button>
                )}
              </div>
            </div>

            {/* แสดงสรุปผลการค้นหา */}
            <div className="addnews-history-summary">
              <span>
                พบบทความทั้งหมด <strong>{authorArticles.length}</strong> รายการ
                {historyDate && ` (ตรงกับวันที่ ${historyDate})`}
                {historyMonth !== 'all' && ` (ในเดือน ${historyMonth})`}
              </span>
            </div>

            {/* รายการบทความในประวัติ */}
            {authorArticles.length > 0 ? (
              <div className="addnews-history-list">
                {authorArticles.map((art) => (
                  <div key={art.id} className="addnews-history-item">
                    <div className="addnews-history-item__image">
                      <img src={art.image} alt={art.title} />
                      <span className="addnews-history-item__badge">
                        {art.category === 'reviews' ? '⭐ รีวิว' : '📰 ข่าว'}
                      </span>
                      {art.score && (
                        <span className="addnews-history-item__score">{art.score}</span>
                      )}
                    </div>

                    <div className="addnews-history-item__content">
                      <div className="addnews-history-item__header">
                        <span className="addnews-history-item__date">
                          <Calendar size={13} />
                          {art.date}
                        </span>

                        {/* แสดงสถานะว่าเคยแก้ไขแล้วกี่ครั้ง */}
                        {art.editHistory && art.editHistory.length > 0 ? (
                          <span
                            className="addnews-history-item__edited-tag"
                            onClick={() => setViewingHistoryArticle(art)}
                            title="คลิกเพื่อดูประวัติการแก้ไขทั้งหมด"
                          >
                            <History size={12} />
                            <span>แก้ไขแล้ว {art.editHistory.length} ครั้ง</span>
                          </span>
                        ) : (
                          <span className="addnews-history-item__original-tag">
                            <FileCheck2 size={12} />
                            <span>ต้นฉบับดั้งเดิม</span>
                          </span>
                        )}
                      </div>

                      <h3 className="addnews-history-item__title">{art.title}</h3>
                      <p className="addnews-history-item__excerpt">{art.excerpt}</p>

                      <div className="addnews-history-item__footer">
                        <div className="addnews-history-item__meta">
                          <span>👤 {art.author}</span>
                          <span>⏱️ {art.readTime || '5 นาที'}</span>
                          {art.lastEditedDisplay && (
                            <span className="last-edit-info">
                              (แก้ไขล่าสุด: {art.lastEditedDisplay})
                            </span>
                          )}
                        </div>

                        {/* ปุ่มคำสั่งจัดการบทความ */}
                        <div className="addnews-history-item__actions">
                          {/* ปุ่มดูประวัติการแก้ไข */}
                          {art.editHistory && art.editHistory.length > 0 && (
                            <button
                              type="button"
                              className="act-btn act-btn--history"
                              onClick={() => setViewingHistoryArticle(art)}
                              title="ดูประวัติการแก้ไข"
                            >
                              <History size={15} />
                              <span>ประวัติแก้ไข ({art.editHistory.length})</span>
                            </button>
                          )}

                          {/* ปุ่มแก้ไขบทความ */}
                          <button
                            type="button"
                            className="act-btn act-btn--edit"
                            onClick={() => handleStartEdit(art)}
                            title="แก้ไขเนื้อหาบทความนี้"
                          >
                            <Edit3 size={15} />
                            <span>แก้ไข</span>
                          </button>

                          {/* ปุ่มเปิดดูบนหน้าเว็บ */}
                          <button
                            type="button"
                            className="act-btn act-btn--view"
                            onClick={() => window.open(`/article/${art.id}`, '_blank')}
                            title="เปิดดูหน้าเว็บจริง"
                          >
                            <ExternalLink size={15} />
                          </button>

                          {/* ปุ่มลบ */}
                          <button
                            type="button"
                            className="act-btn act-btn--delete"
                            onClick={() => handleDeleteArticle(art.id, art.title)}
                            title="ลบบทความ"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="addnews-history-empty">
                <AlertCircle size={48} />
                <h3>ไม่พบบทความตามเงื่อนไขที่เลือก</h3>
                <p>ลองเปลี่ยนคำค้นหา หรือเลือกวัน/เดือนอื่นจากปฏิทิน</p>
                <button
                  type="button"
                  className="addnews-btn addnews-btn--secondary"
                  onClick={() => {
                    setHistoryDate('');
                    setHistoryMonth('all');
                    setHistoryCategory('all');
                    setHistorySearch('');
                  }}
                >
                  ดูบทความทั้งหมดของฉัน
                </button>
              </div>
            )}
          </div>
        ) : (
          /* -----------------------------------------------------------
             กรณีแท็บ 1 หรือ 2: ฟอร์มเพิ่ม/แก้ไขข่าวสาร หรือ รีวิวเกม
             ----------------------------------------------------------- */
          <div className={`addnews-grid ${showPreview ? 'addnews-grid--with-preview' : ''}`}>
            {/* คอลัมน์ฟอร์ม */}
            <form onSubmit={handleSubmit} className="addnews-form">
              {/* กล่องเลือกรูปเกมด่วน (Quick Preset Images) */}
              <div className="addnews-card">
                <div className="addnews-card__title">
                  <Image size={18} />
                  <span>รูปภาพหน้าปกบทความ</span>
                </div>

                <div className="addnews-preset-images">
                  <span className="addnews-preset-label">รูปภาพยอดนิยมที่เตรียมไว้ให้ (คลิกเลือกได้ทันที):</span>
                  <div className="addnews-preset-grid">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        className={`addnews-preset-item ${image === preset.url ? 'active' : ''}`}
                        onClick={() => setImage(preset.url)}
                      >
                        <img src={preset.url} alt={preset.name} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="addnews-field">
                  <label>หรือระบุ URL รูปภาพเอง</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
              </div>

              {/* กล่องข้อมูลเนื้อหา */}
              <div className="addnews-card">
                <div className="addnews-card__title">
                  <Layers size={18} />
                  <span>
                    ข้อมูลเนื้อหา ({activeTab === 'news' ? 'ข่าวสารทั่วไป' : 'รีวิวเกม'})
                    {editingArticleId && ' [โหมดแก้ไข]'}
                  </span>
                </div>

                <div className="addnews-field">
                  <label>
                    หัวข้อบทความ / ชื่อเกม <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      activeTab === 'news'
                        ? 'เช่น GTA VI ปล่อยตัวอย่างใหม่ พร้อมวันเปิดตัวอย่างเป็นทางการ...'
                        : 'เช่น รีวิว: Monster Hunter Wilds - การผจญภัยในโลกเปิดที่ยิ่งใหญ่ที่สุด'
                    }
                    required
                  />
                </div>

                {activeTab === 'news' && (
                  <div className="addnews-row">
                    <div className="addnews-field">
                      <label>หมวดหมู่ข่าว</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="news">📰 ข่าวทั่วไป (News)</option>
                        <option value="guides">📖 ไกด์ & ทริค (Guides)</option>
                        <option value="esports">🏆 อีสปอร์ต (Esports)</option>
                        <option value="upcoming">🚀 เกมเร็วๆ นี้ (Upcoming)</option>
                      </select>
                    </div>

                    <div className="addnews-field">
                      <label>
                        <Clock size={14} /> เวลาที่ใช้ในการอ่าน (นาที)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="addnews-field">
                  <label>
                    คำโปรยสรุปสั้น (Excerpt) <span className="required">*</span>
                  </label>
                  <textarea
                    rows="3"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="สรุปเนื้อหาสำคัญ 1-2 ประโยคที่จะแสดงบนการ์ดข่าวหน้าแรก..."
                    required
                  />
                </div>

                <div className="addnews-field">
                  <label>
                    เนื้อหาฉบับเต็ม (Full Article Content)
                  </label>
                  <textarea
                    rows="7"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="พิมพ์เนื้อหาข่าวสาร รายละเอียด หรือบทวิเคราะห์ที่นี่ (เว้นวรรค 2 บรรทัดเพื่อขึ้นย่อหน้าใหม่)..."
                  />
                </div>

                <div className="addnews-row">
                  <div className="addnews-field">
                    <label>
                      <User size={14} /> ผู้เขียน / นามปากกา
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="เช่น GameMaster, IGN Thailand"
                    />
                  </div>

                  <div className="addnews-field">
                    <label>
                      <Tag size={14} /> แท็ก (คั่นด้วยจุลภาค ,)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="เช่น GTA VI, Rockstar, PC, PS5"
                    />
                  </div>
                </div>

                {/* ฟิลด์ระบุเหตุผลการแก้ไข (แสดงเฉพาะตอนอยู่ในโหมดแก้ไข) */}
                {editingArticleId && (
                  <div className="addnews-field addnews-field--edit-reason">
                    <label>
                      <History size={14} /> หมายเหตุประวัติการแก้ไข (Revision Note)
                    </label>
                    <input
                      type="text"
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                      placeholder="เช่น แก้ไขข้อมูลวันวางจำหน่าย และปรับปรุงเนื้อหาย่อหน้าสุดท้าย..."
                    />
                    <small>หมายเหตุนี้จะถูกบันทึกในไทม์ไลน์ประวัติการแก้ไขของบทความ</small>
                  </div>
                )}
              </div>

              {/* กล่องพิเศษเฉพาะ: หมวดรีวิวเกม (Review Only Fields) */}
              {activeTab === 'reviews' && (
                <div className="addnews-card addnews-card--review">
                  <div className="addnews-card__title text-review">
                    <Star size={18} />
                    <span>การประเมินคะแนนและจุดเด่น-จุดด้อย (Review Score & Verdict)</span>
                  </div>

                  {/* ตัวปรับคะแนนรีวิว */}
                  <div className="addnews-score-slider">
                    <div className="addnews-score-slider__header">
                      <span>คะแนนรีวิวจากทีมงาน:</span>
                      <strong className="addnews-score-slider__value">{score} / 10</strong>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="10.0"
                      step="0.1"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className="addnews-range"
                    />
                    <div className="addnews-score-preview">
                      <ReviewScore score={parseFloat(score)} size="medium" />
                    </div>
                  </div>

                  {/* คำตัดสินสรุป */}
                  <div className="addnews-field">
                    <label>
                      <Award size={14} /> คำตัดสินจากทีมงาน (Verdict Summary)
                    </label>
                    <input
                      type="text"
                      value={verdict}
                      onChange={(e) => setVerdict(e.target.value)}
                      placeholder="เช่น ผลงานระดับมาสเตอร์พีซที่แฟนเกมแอ็กชันไม่ควรพลาดเด็ดขาด"
                    />
                  </div>

                  {/* Pros & Cons */}
                  <div className="addnews-row">
                    {/* ข้อดี */}
                    <div className="addnews-field">
                      <label className="text-success">✓ จุดเด่น (ข้อดี)</label>
                      <div className="addnews-input-group">
                        <input
                          type="text"
                          value={newPro}
                          onChange={(e) => setNewPro(e.target.value)}
                          placeholder="พิมพ์ข้อดีแล้วกดเพิ่ม..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddPro();
                            }
                          }}
                        />
                        <button type="button" onClick={handleAddPro} className="btn-add">
                          <Plus size={16} />
                        </button>
                      </div>
                      <ul className="addnews-list addnews-list--pros">
                        {pros.map((p, i) => (
                          <li key={i}>
                            <span>{p}</span>
                            <button type="button" onClick={() => handleRemovePro(i)}>
                              <Trash2 size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ข้อเสีย */}
                    <div className="addnews-field">
                      <label className="text-danger">✕ จุดด้อย (ข้อควรระวัง)</label>
                      <div className="addnews-input-group">
                        <input
                          type="text"
                          value={newCon}
                          onChange={(e) => setNewCon(e.target.value)}
                          placeholder="พิมพ์ข้อเสียแล้วกดเพิ่ม..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCon();
                            }
                          }}
                        />
                        <button type="button" onClick={handleAddCon} className="btn-add">
                          <Plus size={16} />
                        </button>
                      </div>
                      <ul className="addnews-list addnews-list--cons">
                        {cons.map((c, i) => (
                          <li key={i}>
                            <span>{c}</span>
                            <button type="button" onClick={() => handleRemoveCon(i)}>
                              <Trash2 size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ปุ่มบันทึกและส่งข้อมูล */}
              <div className="addnews-form__footer">
                {editingArticleId ? (
                  <div className="addnews-edit-actions">
                    <button type="submit" className="addnews-submit-btn addnews-submit-btn--update">
                      <Sparkles size={18} />
                      <span>บันทึกการแก้ไขบทความ (Update Article)</span>
                    </button>
                    <button
                      type="button"
                      className="addnews-btn addnews-btn--secondary"
                      onClick={handleCancelEdit}
                    >
                      ยกเลิกการแก้ไข
                    </button>
                  </div>
                ) : (
                  <button type="submit" className="addnews-submit-btn">
                    
                    <span>
                      {activeTab === 'news' ? 'เผยแพร่ข่าวสารสู่หน้าเว็บ' : 'เผยแพร่บทความรีวิวสู่หน้าเว็บ'}
                    </span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </form>

            {/* คอลัมน์ Live Preview ด้านข้าง */}
            {showPreview && (
              <div className="addnews-preview-panel">
                <div className="addnews-preview-sticky">
                  <div className="addnews-preview-header">
                    <Eye size={16} />
                    <span>ตัวอย่างการแสดงผลบนหน้าเว็บ (Live Preview)</span>
                  </div>

                  <div className="addnews-preview-card">
                    <div className="addnews-preview-img-wrapper">
                      <img src={image} alt={title || 'Preview'} />
                      <span className="addnews-preview-cat-badge">
                        {activeTab === 'reviews' ? '⭐ รีวิว' : '📰 ข่าว'}
                      </span>
                      {activeTab === 'reviews' && (
                        <div className="addnews-preview-score-badge">
                          {score}
                        </div>
                      )}
                    </div>

                    <div className="addnews-preview-body">
                      <h3>{title || 'หัวข้อข่าว/รีวิวจะปรากฏที่นี่...'}</h3>
                      <p>{excerpt || 'คำโปรยย่อสรุปของบทความจะแสดงตรงจุดนี้...'}</p>

                      <div className="addnews-preview-meta">
                        <span>👤 {author}</span>
                        <span>⏱️ {readTime} นาที</span>
                      </div>

                      {activeTab === 'reviews' && verdict && (
                        <div className="addnews-preview-verdict">
                          <strong>คำตัดสิน:</strong> {verdict}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -----------------------------------------------------------
            Modal หน้าต่างแสดงประวัติการแก้ไข (Revision History Timeline)
           ----------------------------------------------------------- */}
        {viewingHistoryArticle && (
          <div className="addnews-modal-overlay" onClick={() => setViewingHistoryArticle(null)}>
            <div className="addnews-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="addnews-modal-header">
                <div className="addnews-modal-title">
                  <History size={20} />
                  <span>บันทึกประวัติการแก้ไขบทความ (Revision History)</span>
                </div>
                <button
                  type="button"
                  className="addnews-modal-close"
                  onClick={() => setViewingHistoryArticle(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="addnews-modal-body">
                <div className="addnews-modal-article-info">
                  <h4>{viewingHistoryArticle.title}</h4>
                  <p>เขียนครั้งแรกเมื่อ: {viewingHistoryArticle.date} โดย {viewingHistoryArticle.author}</p>
                </div>

                <div className="addnews-timeline">
                  {viewingHistoryArticle.editHistory && viewingHistoryArticle.editHistory.length > 0 ? (
                    viewingHistoryArticle.editHistory.map((rev, index) => (
                      <div key={index} className="addnews-timeline-item">
                        <div className="addnews-timeline-dot" />
                        <div className="addnews-timeline-content">
                          <div className="addnews-timeline-meta">
                            <span className="revision-badge">การแก้ไขครั้งที่ #{rev.revisionNumber || (viewingHistoryArticle.editHistory.length - index)}</span>
                            <span className="timestamp">{rev.displayDate || rev.timestamp}</span>
                          </div>
                          <div className="addnews-timeline-editor">
                            <strong>ผู้แก้ไข:</strong> {rev.editedBy}
                          </div>
                          <p className="addnews-timeline-reason">
                            <strong>หมายเหตุ:</strong> {rev.reason || 'อัปเดตเนื้อหาบทความ'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="empty-history">ยังไม่มีประวัติการแก้ไขสำหรับบทความนี้</p>
                  )}
                </div>
              </div>

              <div className="addnews-modal-footer">
                <button
                  type="button"
                  className="addnews-btn addnews-btn--secondary"
                  onClick={() => setViewingHistoryArticle(null)}
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
