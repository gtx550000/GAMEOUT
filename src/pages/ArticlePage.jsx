import { useState, useCallback } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Clock, Eye, MessageCircle, Share2, Bookmark, ThumbsUp, ArrowLeft, User, CheckCircle2, XCircle, Award } from 'lucide-react';
import ReviewScore from '../components/ReviewScore/ReviewScore';
import NewsCard from '../components/NewsCard/NewsCard';
import { useNews } from '../context/NewsContext';
import './ArticlePage.css';

export default function ArticlePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getArticleById, articles, featured } = useNews();
  const article = getArticleById(id);

  // คำนวณหน้าที่ควรถอยกลับไป: ถ้ามี state.from ใช้ตามนั้น หากไม่มีให้ถอยไปที่หมวดหมู่ของบทความนั้น เช่น /news
  const defaultCategoryPath = article?.category ? `/${article.category}` : '/news';
  const fromState = location.state?.from;
  const returnTo = fromState && !fromState.startsWith(`/article/${id}`) ? fromState : defaultCategoryPath;

  // ฟังก์ชันย้อนกลับอัจฉริยะ
  const handleBack = useCallback((e) => {
    if (e) e.preventDefault();

    // 1. ถ้ามีข้อมูลหน้าที่ส่งต่อมาและไม่ใช่หน้าปัจจุบัน ให้กลับไปหน้านั้น
    if (fromState && !fromState.startsWith(`/article/${id}`)) {
      navigate(fromState);
      return;
    }

    // 2. ถ้ามีประวัติการเข้าชมใน Browser ให้ย้อนกลับตามจริง
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }

    // 3. Fallback: กลับไปหน้าหมวดหมู่ของบทความนั้น (เช่น /news, /reviews) แทนการกลับไปหน้าแรก
    navigate(defaultCategoryPath);
  }, [fromState, id, navigate, defaultCategoryPath]);

  if (!article) {
    return (
      <div className="article-page article-page--not-found">
        <h1>ไม่พบบทความ</h1>
        <p>บทความนี้อาจถูกลบหรือยังไม่มีในระบบ</p>
        <button
          type="button"
          onClick={handleBack}
          className="article-page__back"
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <ArrowLeft size={16} />
          ย้อนกลับ
        </button>
      </div>
    );
  }

  const allArticles = [...featured, ...articles];
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const categoryLabels = {
    news: '📰 ข่าว',
    reviews: '⭐ รีวิว',
    guides: '📖 ไกด์',
    esports: '🏆 อีสปอร์ต',
    videos: '🎬 วิดีโอ',
    upcoming: '🚀 เกมเร็วๆ นี้',
  };

  return (
    <main className="article-page">
      {/* Hero Image */}
      <div className="article-page__hero">
        <img src={article.image} alt={article.title} className="article-page__hero-img" />
        <div className="article-page__hero-overlay" />
        <div className="article-page__hero-content">
          <button
            type="button"
            onClick={handleBack}
            className="article-page__back-btn"
            style={{ cursor: 'pointer' }}
            aria-label="ย้อนกลับไปหน้าก่อนหน้า"
          >
            <ArrowLeft size={18} />
            กลับ
          </button>
        </div>
      </div>

      <div className="article-page__container">
        <article className="article-page__main">
          {/* Header */}
          <header className="article-page__header">
            <Link to={`/${article.category}`} className="article-page__category">
              {categoryLabels[article.category] || article.category}
            </Link>
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

            {/* ข้อความแจ้งว่าบทความได้รับการปรับปรุง */}
            {article.editHistory && article.editHistory.length > 0 && (
              <div className="article-page__revision-banner">
                <span className="article-page__revision-info">
                  บทความนี้ได้รับการปรับปรุงล่าสุด: {article.lastEditedDisplay || article.date}
                </span>
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

            {article.category === 'guides' && article.guideSections?.length > 0 ? (
              <div className="article-page__guide-sections">
                {article.guideSections.map((section, index) => (
                  <section className="article-page__guide-section" key={index}>
                    <h2>ขั้นตอนที่ {index + 1}</h2>
                    {section.content?.trim() && (
                      <div className="article-page__user-content">
                        {section.content.trim().split(/\n\s*\n/).map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {section.image && (
                      <img
                        className="article-page__guide-image"
                        src={section.image}
                        alt={`${article.title} - ภาพประกอบขั้นตอนที่ ${index + 1}`}
                      />
                    )}
                  </section>
                ))}
              </div>
            ) : article.content?.trim() ? (
              <div className="article-page__user-content">
                {article.content.trim().split(/\n\s*\n/).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            ) : null}

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
              {article.tags.filter((tag) => typeof tag === 'string' && tag.trim()).map((tag) => {
                const cleanTag = tag.trim().replace(/^#+/, '');
                return (
                  <Link
                    key={tag}
                    to={`/tag/${encodeURIComponent(cleanTag)}`}
                    className="article-page__tag"
                  >
                    #{cleanTag}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="article-page__actions">
            <button className="article-page__action-btn" type="button" onClick={() => alert('ขอบคุณสำหรับกำลังใจ!')}>
              <ThumbsUp size={18} />
              <span>ถูกใจ</span>
            </button>
            <button className="article-page__action-btn" type="button" onClick={() => alert('บันทึกบทความเรียบร้อย')}>
              <Bookmark size={18} />
              <span>บันทึก</span>
            </button>
            <button className="article-page__action-btn" type="button" onClick={() => {
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
