import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Eye, MessageCircle, Play } from 'lucide-react';
import { featuredNews } from '../../data/mockData';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const article = featuredNews[currentSlide];

  return (
    <section className="hero">
      <div className="hero__slider">
        {featuredNews.map((item, index) => (
          <div
            key={item.id}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
          >
            <div className="hero__image-wrapper">
              <img src={item.image} alt={item.title} className="hero__image" />
              <div className="hero__overlay" />
            </div>
          </div>
        ))}

        {/* Content */}
        <div className="hero__content">
          <div className="hero__content-inner">
            <span className="hero__category">{article.category === 'news' ? '📰 ข่าว' : article.category}</span>
            <h1 className="hero__title">{article.title}</h1>
            <p className="hero__excerpt">{article.excerpt}</p>
            <div className="hero__meta">
              <span className="hero__meta-item">
                <Clock size={14} />
                {article.readTime}
              </span>
              <span className="hero__meta-item">
                <Eye size={14} />
                {article.views.toLocaleString()} views
              </span>
              <span className="hero__meta-item">
                <MessageCircle size={14} />
                {article.comments} comments
              </span>
            </div>
            <div className="hero__actions">
              <Link to={`/article/${article.id}`} className="hero__btn hero__btn--primary">
                อ่านเพิ่มเติม
              </Link>
              <button className="hero__btn hero__btn--secondary">
                <Play size={16} />
                ดูวิดีโอ
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hero__nav">
          <button className="hero__nav-btn" onClick={prevSlide} aria-label="ก่อนหน้า">
            <ChevronLeft size={24} />
          </button>
          <button className="hero__nav-btn" onClick={nextSlide} aria-label="ถัดไป">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="hero__dots">
          {featuredNews.map((_, index) => (
            <button
              key={index}
              className={`hero__dot ${index === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="hero__progress">
          <div
            className="hero__progress-bar"
            key={currentSlide}
            style={{ animationDuration: isAutoPlaying ? '5s' : '0s' }}
          />
        </div>
      </div>
    </section>
  );
}
