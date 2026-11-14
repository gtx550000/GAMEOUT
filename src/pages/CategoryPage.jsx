import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard/NewsCard';
import { useNews } from '../context/NewsContext';
import { BookOpen, Newspaper, Rocket, SortAsc, Star, Trophy } from 'lucide-react';
import './CategoryPage.css';

const categoryConfig = {
  news: { title: 'ข่าวเกม', icon: Newspaper, desc: 'ข่าวสารล่าสุดจากวงการเกมทั่วโลก' },
  reviews: { title: 'รีวิวเกม', icon: Star, desc: 'รีวิวเชิงลึกจากทีมงานผู้เชี่ยวชาญ' },
  guides: { title: 'ไกด์ & คู่มือ', icon: BookOpen, desc: 'คู่มือและเทคนิคที่ช่วยให้คุณเล่นเก่งขึ้น' },
  esports: { title: 'อีสปอร์ต', icon: Trophy, desc: 'ติดตามผลการแข่งขันและวงการอีสปอร์ต' },
  upcoming: { title: 'เกมเร็วๆ นี้', icon: Rocket, desc: 'เกมที่กำลังจะเปิดตัว พร้อมข้อมูลล่าสุด' },
};

export default function CategoryPage() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('latest');
  const config = categoryConfig[category] || { title: 'บทความ', icon: Newspaper, desc: '' };
  const CategoryIcon = config.icon;

  const { articles, featured } = useNews();
  const allArticles = useMemo(() => [...featured, ...articles], [featured, articles]);

  const filteredArticles = useMemo(() => {
    let list = allArticles.filter((a) => a.category === category);
    if (sortBy === 'popular') {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'comments') {
      list.sort((a, b) => (b.comments || 0) - (a.comments || 0));
    } else {
      // latest
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    return list;
  }, [allArticles, category, sortBy]);

  return (
    <main className="category-page">
      <div className="category-page__header">
        <div className="container">
          <CategoryIcon className="category-page__icon" aria-hidden="true" />
          <h1 className="category-page__title">{config.title}</h1>
          <p className="category-page__desc">{config.desc}</p>
        </div>
      </div>

      <div className="container">
        <div className="category-page__toolbar">
          <span className="category-page__count">
            พบ {filteredArticles.length} บทความในหมวดนี้
          </span>
          <div className="category-page__sort">
            <SortAsc size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="category-page__sort-select"
            >
              <option value="latest">ล่าสุด</option>
              <option value="popular">ยอดนิยม</option>
              <option value="comments">ความคิดเห็นมากสุด</option>
            </select>
          </div>
        </div>

        <div className="category-page__grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))
          ) : (
            <div className="category-page__empty">
              <Newspaper size={48} />
              <p>ยังไม่มีบทความในหมวดนี้</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
