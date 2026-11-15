import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Newspaper, Rocket, Star, Trophy } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import './ContentPage.css';

const contentSections = [
  { id: 'news', title: 'ข่าวเกม', description: 'ข่าวสารและความเคลื่อนไหวล่าสุดจากวงการเกม', href: '/news', icon: Newspaper },
  { id: 'reviews', title: 'รีวิว', description: 'อ่านรีวิวและมุมมองจากทีมงานก่อนเลือกเล่นเกม', href: '/reviews', icon: Star },
  { id: 'guides', title: 'ไกด์', description: 'คู่มือและเทคนิคที่ช่วยให้เล่นเกมได้ง่ายขึ้น', href: '/guides', icon: BookOpen },
  { id: 'esports', title: 'อีสปอร์ต', description: 'ติดตามการแข่งขัน ทีม และข่าวสารอีสปอร์ต', href: '/esports', icon: Trophy },
  { id: 'upcoming', title: 'เกมเร็วๆ นี้', description: 'เกมที่กำลังจะเปิดตัวและข้อมูลที่น่าติดตาม', href: '/upcoming', icon: Rocket },
];

export default function ContentPage() {
  const { articles, featured } = useNews();
  const allArticles = [...featured, ...articles];

  return (
    <main className="content-page">
      <header className="content-page__hero">
        <div className="content-page__container">
          <Newspaper className="content-page__hero-icon" aria-hidden="true" />
          <p className="content-page__eyebrow">GAMEOUT CONTENT</p>
          <h1>เนื้อหา</h1>
          <p>สำรวจข่าว รีวิว ไกด์ และเรื่องราวจากวงการเกมในหมวดที่คุณสนใจ</p>
        </div>
      </header>

      <div className="content-page__container content-page__body">
        <div className="content-page__grid">
          {contentSections.map((section) => {
            const SectionIcon = section.icon;
            const count = allArticles.filter((article) => article.category === section.id).length;

            return (
              <Link to={section.href} className="content-card" key={section.id}>
                <SectionIcon className="content-card__icon" size={26} aria-hidden="true" />
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="content-card__footer">
                  <span>{count} บทความ</span>
                  <span className="content-card__action">ดูเนื้อหา <ArrowRight size={16} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
