import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Hash, Newspaper } from 'lucide-react';
import NewsCard from '../components/NewsCard/NewsCard';
import { useNews } from '../context/NewsContext';
import './CategoryPage.css';

const normalizeTag = (value) => value.trim().replace(/^#+/, '').toLocaleLowerCase();

export default function TagPage() {
  const { tag = '' } = useParams();
  const { articles, featured } = useNews();
  const normalizedTag = normalizeTag(tag);

  const matchingArticles = useMemo(() => (
    [...featured, ...articles]
      .filter((article) =>
        Array.isArray(article.tags) &&
        article.tags.some((articleTag) =>
          typeof articleTag === 'string' && normalizeTag(articleTag) === normalizedTag
        )
      )
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  ), [articles, featured, normalizedTag]);

  return (
    <main className="category-page">
      <div className="category-page__header">
        <div className="container">
          <Hash className="category-page__icon" aria-hidden="true" />
          <h1 className="category-page__title">#{tag.replace(/^#+/, '')}</h1>
          <p className="category-page__desc">บทความทั้งหมดที่มีแท็กนี้</p>
        </div>
      </div>

      <div className="container">
        <div className="category-page__toolbar">
          <span className="category-page__count">
            พบ {matchingArticles.length} บทความ
          </span>
        </div>

        <div className="category-page__grid">
          {matchingArticles.length > 0 ? (
            matchingArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))
          ) : (
            <div className="category-page__empty">
              <Newspaper size={48} />
              <p>ยังไม่มีบทความที่ติดแท็กนี้</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
