import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, MessageCircle, Share2, Bookmark, ThumbsUp, ArrowLeft, User, CheckCircle2, XCircle, Award, History, ChevronDown, ChevronUp } from 'lucide-react';
import ReviewScore from '../components/ReviewScore/ReviewScore';
import NewsCard from '../components/NewsCard/NewsCard';
import { useNews } from '../context/NewsContext';
import {  Newspaper } from 'lucide-react';
import './ArticlePage.css';

export default function ArticlePage() {
  const { id } = useParams();
  const { getArticleById, articles, featured } = useNews();
  const article = getArticleById(id);
  const [showRevisionDetails, setShowRevisionDetails] = useState(false);

  if (!article) {
    return (
      <div className="article-page article-page--not-found">
        <h1>ไม่พบบทความ</h1>
        <p>บทความนี้อาจถูกลบหรือยังไม่มีในระบบ</p>
        <Link to="/" className="article-page__back">
          <ArrowLeft size={16} />
          กลับสู่หน้าแรก
        </Link>
      </div>
    );
  }

  const allArticles = [...featured, ...articles];
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const categoryLabels = {
    news: ' ข่าว',
    reviews: ' รีวิว',
    guides: ' ไกด์',
    esports: ' อีสปอร์ต',
    videos: ' วิดีโอ',
    upcoming: ' เกมเร็วๆ นี้',
  };

  return (
    <main className="article-page">
      {/* Hero Image */}
      <div className="article-page__hero">
        <img src={article.image} alt={article.title} className="article-page__hero-img" />
        <div className="article-page__hero-overlay" />
        <div className="article-page__hero-content">
          <Link to="/" className="article-page__back-btn">
            <ArrowLeft size={18} />
            กลับ
          </Link>
        </div>
      </div>

      <div className="article-page__container">
        <article className="article-page__main">
          {/* Header */}
          <header className="article-page__header">
            <span className="article-page__category">
              {categoryLabels[article.category] || article.category}
            </span>
            <h1 className="article-page__title">{article.title}</h1>

            <div className="article-page__meta">
              <div className="article-page__author">
                <div className="article-page__avatar">
                  <User size={18} />
                </div>
                <div>
                  <span className="article-page__author-name">{article.author || 'GamePulse Staff'}</span>
                  <span className="article-page__date">{article.date}</span>
                </div>
              </div>

              <div className="article-page__stats">
                <span><Clock size={14} /> {article.readTime || '5 นาที'}</span>
                <span><Eye size={14} /> {(article.views || 0).toLocaleString()}</span>
                <span><MessageCircle size={14} /> {article.comments || 0}</span>
              </div>
            </div>

            {/* แถบแจ้งเตือนประวัติการแก้ไขบทความ (Revision History Banner) */}
            {article.editHistory && article.editHistory.length > 0 && (
              <div className="article-page__revision-banner">
                <div className="article-page__revision-header">
                  <div className="article-page__revision-info">
                    <History size={16} />
                    <span>
                      บทความนี้ได้รับการปรับปรุงล่าสุด: <strong>{article.lastEditedDisplay || article.date}</strong> (แก้ไข {article.editHistory.length} ครั้ง)
                    </span>
                  </div>
                  <button
                    type="button"
                    className="article-page__revision-toggle"
                    onClick={() => setShowRevisionDetails(!showRevisionDetails)}
                  >
                    <span>{showRevisionDetails ? 'ซ่อนประวัติ' : 'ดูประวัติการแก้ไข'}</span>
                    {showRevisionDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {showRevisionDetails && (
                  <div className="article-page__revision-details">
                    <ul className="article-page__revision-list">
                      {article.editHistory.map((rev, i) => (
                        <li key={i}>
                          <span className="rev-badge">ครั้งที่ #{rev.revisionNumber || (article.editHistory.length - i)}</span>
                          <span className="rev-date">{rev.displayDate || rev.timestamp}</span>
                          <span className="rev-editor">โดย: {rev.editedBy}</span>
                          <span className="rev-reason">หมายเหตุ: {rev.reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Review Score Section (ถ้าเป็นโหมดรีวิว) */}
            {article.score && (
              <div className="article-page__score-section">
                <ReviewScore score={article.score} size="large" />
                {article.verdict && (
                  <div className="article-page__verdict-box">
                    <div className="article-page__verdict-title">
                      <Award size={18} />
                      <span>คำตัดสินจากทีมงาน</span>
                    </div>
                    <p className="article-page__verdict-text">{article.verdict}</p>
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Content Body */}
          <div className="article-page__body">
            {article.excerpt && (
              <p className="article-page__lead">{article.excerpt}</p>
            )}

            {/* แสดงเนื้อหาที่ทีมงานเขียนเข้ามา */}
            {article.content ? (
              <div className="article-page__user-content">
                {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>รายละเอียดสำคัญ</h2>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <blockquote className="article-page__quote">
                  "นี่คือหนึ่งในการเปิดตัวที่น่าตื่นเต้นที่สุดในประวัติศาสตร์วงการเกม" - {article.author || 'GamePulse'}
                </blockquote>

                <h2>สิ่งที่คาดหวัง</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </>
            )}

            {/* Pros & Cons Box สำหรับรีวิวเกม */}
            {article.category === 'reviews' && (article.pros?.length > 0 || article.cons?.length > 0) && (
              <div className="article-page__pros-cons">
                {article.pros?.length > 0 && (
                  <div className="article-page__pros">
                    <h3 className="article-page__box-title text-success">
                      <CheckCircle2 size={18} /> จุดเด่น (ข้อดี)
                    </h3>
                    <ul>
                      {article.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.cons?.length > 0 && (
                  <div className="article-page__cons">
                    <h3 className="article-page__box-title text-danger">
                      <XCircle size={18} /> จุดด้อย (ข้อควรระวัง)
                    </h3>
                    <ul>
                      {article.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-page__tags">
              {article.tags.map((tag) => (
                <span key={tag} className="article-page__tag">#{tag}</span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="article-page__actions">
            <button className="article-page__action-btn" onClick={() => alert('ขอบคุณสำหรับกำลังใจ!')}>
              <ThumbsUp size={18} />
              <span>ถูกใจ</span>
            </button>
            <button className="article-page__action-btn" onClick={() => alert('บันทึกบทความเรียบร้อย')}>
              <Bookmark size={18} />
              <span>บันทึก</span>
            </button>
            <button className="article-page__action-btn" onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
              }
            }}>
              <Share2 size={18} />
              <span>แชร์</span>
            </button>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="article-page__related">
            <h2 className="article-page__related-title">บทความที่เกี่ยวข้อง</h2>
            <div className="article-page__related-grid">
              {relatedArticles.map((item, index) => (
                <NewsCard key={item.id} article={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
