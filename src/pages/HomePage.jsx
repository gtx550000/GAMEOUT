import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import TrendingBar from '../components/TrendingBar/TrendingBar';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import NewsCard from '../components/NewsCard/NewsCard';
import GameCard from '../components/GameCard/GameCard';
import Newsletter from '../components/Newsletter/Newsletter';
import { upcomingGames } from '../data/mockData';
import { useNews } from '../context/NewsContext';
import { Flame, Newspaper, Gamepad, ArrowRight, ChartBarIncreasing } from 'lucide-react';
import './HomePage.css';

const newsSectionTitles = {
  all: 'เนื้อหาข้อมูลทั้งหมด',
  news: 'เนื้อหาข่าวสารเกมใหม่ล่าสุด',
  reviews: 'รีวิวเกมล่าสุด',
  guides: 'ไกด์และคู่มือเกมล่าสุด',
  esports: 'ข่าวอีสปอร์ตล่าสุด',
  videos: 'วิดีโอเกมล่าสุด',
  upcoming: 'ข่าวเกมที่กำลังจะเปิดตัว',
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const { articles } = useNews();
  const sectionTitle = newsSectionTitles[activeCategory] || newsSectionTitles.all;

  // เปลี่ยนหมวดหมู่พร้อมบันทึกลง URL เพื่อให้ปุ่มย้อนกลับจากเมาส์จำค่าหมวดหมู่เดิมได้แม่นยำ
  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      setSearchParams({}, { replace: false });
    } else {
      setSearchParams({ category: catId }, { replace: false });
    }
  };

  const filteredNews = activeCategory === 'all'
    ? articles
    : articles.filter((item) => item.category === activeCategory);

  return (
    <main className="home">
      {/* Hero Section */}
      <Hero />

      {/* Trending Bar */}
      <TrendingBar />

      {/* Main Content */}
      <div className="home__content container">
        {/* Section Header */}
        <div className="home__section-header">
          <div className="home__section-title-wrapper">
            <ChartBarIncreasing size={24} className="home__section-icon" />
            <h2 className="home__section-title">หมวดหมู่</h2>
          </div>
          <a href="#news-section" className="home__view-all">
            ดูทั้งหมด ({articles.length})
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Upcoming Games Section */}
        {activeCategory === 'all' && (
          <section className="home__upcoming container">
            <div className="home__section-header">
              <div className="home__section-title-wrapper">
                <Flame size={24} className="home__section-icon" />
                <h2 className="home__section-title">เกมที่น่าจับตามอง</h2>
              </div>
            </div>

            <div className="home__upcoming-grid">
              {upcomingGames.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="home__upcoming container">
          <div className="home__section-header">
            <div className="home__section-title-wrapper">
              <Newspaper size={24} className="home__section-icon" />
              <h2 className="home__section-title">{sectionTitle}</h2>
            </div>
          </div>

          <div className="home__news-grid" id="news-section">
            {filteredNews.length > 0 ? (
              filteredNews.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))
            ) : (
              <div className="home__empty">
                <Gamepad size={48} />
                <p>ไม่พบข่าวในหมวดนี้</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Newsletter 
      <Newsletter />*/}
    </main>
  );
}
