import { Link } from 'react-router-dom';
import { Clock, Eye, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './NewsCard.css';

export default function NewsCard({ article, index = 0, variant = 'default' }) {
  const categoryLabels = {
    news: '📰 ข่าว',
    reviews: '⭐ รีวิว',
    guides: '📖 ไกด์',
    esports: '🏆 อีสปอร์ต',
    videos: '🎬 วิดีโอ',
    upcoming: '🚀 เกมเร็วๆ นี้',
  };

  return (
    <motion.article
      className={`news-card news-card--${variant}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/article/${article.id}`} className="news-card__link">
        <div className="news-card__image-wrapper">
          <img
            src={article.image}
            alt={article.title}
            className="news-card__image"
            loading="lazy"
          />
          <div className="news-card__image-overlay" />
          <span className="news-card__category">
            {categoryLabels[article.category] || article.category}
          </span>
          {article.score && (
            <div className="news-card__score">
              <span className="news-card__score-value">{article.score}</span>
            </div>
          )}
        </div>

        <div className="news-card__body">
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__excerpt">{article.excerpt}</p>

          <div className="news-card__footer">
            <div className="news-card__meta">
              <span className="news-card__meta-item">
                <Clock size={13} />
                {article.readTime}
              </span>
              <span className="news-card__meta-item">
                <Eye size={13} />
                {article.views >= 1000
                  ? `${(article.views / 1000).toFixed(0)}K`
                  : article.views}
              </span>
              <span className="news-card__meta-item">
                <MessageCircle size={13} />
                {article.comments}
              </span>
            </div>

            <div className="news-card__actions">
              <button
                className="news-card__action-btn"
                onClick={(e) => { e.preventDefault(); }}
                aria-label="บันทึก"
              >
                <Bookmark size={16} />
              </button>
              <button
                className="news-card__action-btn"
                onClick={(e) => { e.preventDefault(); }}
                aria-label="แชร์"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="news-card__tags">
            {article.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="news-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
