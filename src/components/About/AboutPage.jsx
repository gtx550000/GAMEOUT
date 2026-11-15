import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Newspaper, Scale, ShieldCheck, Star, UsersRound } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import './AboutPage.css';

const aboutSections = [
  {
    title: 'ข่าวเกม',
    description: 'ติดตามความเคลื่อนไหว ข่าวเปิดตัว และประเด็นสำคัญจากวงการเกม',
    href: '/news',
    icon: Newspaper,
  },
  {
    title: 'รีวิวและไกด์',
    description: 'อ่านมุมมองจากทีมงาน พร้อมคู่มือและเทคนิคที่ช่วยให้เล่นได้สนุกขึ้น',
    href: '/reviews',
    icon: Star,
  },
  {
    title: 'ชุมชนเกมเมอร์',
    description: 'ค้นหาหัวข้อพูดคุย กิจกรรม และผู้เขียนที่ร่วมสร้างเนื้อหาบน GameOut',
    href: '/community/forum',
    icon: UsersRound,
  },
  {
    title: 'นโยบายความเป็นส่วนตัว',
    description: 'ดูข้อมูลที่จัดเก็บในเบราว์เซอร์ วัตถุประสงค์การใช้งาน และวิธีลบข้อมูล',
    href: '/about/privacy',
    icon: ShieldCheck,
  },
  {
    title: 'ข้อกำหนดการใช้งาน',
    description: 'อ่านแนวทางการใช้งานและการอ้างอิงเนื้อหาบน GameOut',
    href: '/about/terms',
    icon: Scale,
  },
];

export default function AboutPage() {
  const { articles, featured } = useNews();
  const articleCount = articles.length + featured.length;

  return (
    <main className="about-page">
      <section className="about-page__hero">
        <div className="about-page__container">
          <Gamepad2 className="about-page__hero-icon" aria-hidden="true" />
          <p className="about-page__eyebrow">ABOUT GAMEOUT</p>
          <h1>เกี่ยวกับ GameOut</h1>
          <p className="about-page__hero-copy">
            พื้นที่สำหรับคนรักเกม ที่รวมข่าวสาร รีวิว ไกด์ และเรื่องราวจากชุมชนเกมเมอร์ไว้ในที่เดียว
          </p>
        </div>
      </section>

      <div className="about-page__container about-page__content">
        <section className="about-page__intro">
          <div>
            <h2>โลกของเกม อัปเดตและเข้าใจง่าย</h2>
            <p>
              GameOut นำเสนอข้อมูลเกี่ยวกับเกมและอีสปอร์ต เพื่อให้ผู้อ่านติดตามข่าวใหม่
              ค้นหาเกมที่น่าสนใจ และเข้าถึงคำแนะนำที่เป็นประโยชน์ก่อนออกผจญภัยในเกมโปรด
            </p>
          </div>
          <div className="about-page__stat">
            <strong>{articleCount}</strong>
            <span>บทความในคลัง</span>
          </div>
        </section>

        <section className="about-page__sections">
          <div className="about-page__section-heading">
            <h2>พบกับเนื้อหาของเรา</h2>
            <p>เลือกสำรวจหัวข้อที่คุณสนใจได้เลย</p>
          </div>
          <div className="about-page__grid">
            {aboutSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <Link to={section.href} className="about-card" key={section.title}>
                  <SectionIcon className="about-card__icon" size={26} aria-hidden="true" />
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <span className="about-card__link">
                    สำรวจเนื้อหา <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
