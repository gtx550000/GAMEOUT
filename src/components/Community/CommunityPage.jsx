import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Gamepad2,
  MessageCircle,
  Newspaper,
  Star,
  Trophy,
  UsersRound,
} from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import './CommunityPage.css';

const communityPages = {
  forum: {
    title: 'ฟอรัมเกมเมอร์',
    description: 'พื้นที่พูดคุย แลกเปลี่ยนความคิดเห็น และแบ่งปันประสบการณ์จากเกมที่คุณชื่นชอบ',
    icon: MessageCircle,
  },
  events: {
    title: 'กิจกรรมชุมชน',
    description: 'ติดตามแนวทางกิจกรรมและร่วมเป็นส่วนหนึ่งของชุมชน GameOut',
    icon: CalendarDays,
  },
  contributors: {
    title: 'ผู้มีส่วนร่วม',
    description: 'ทำความรู้จักผู้เขียนและทีมงานที่ร่วมแบ่งปันข่าวสารและเรื่องราวในวงการเกม',
    icon: UsersRound,
  },
};

const forumBoards = [
  { title: 'ข่าวและประเด็นร้อน', description: 'พูดคุยเรื่องข่าวเกมล่าสุดและประเด็นที่กำลังเป็นกระแส', href: '/news', icon: Newspaper },
  { title: 'รีวิวจากเกมเมอร์', description: 'แลกเปลี่ยนมุมมองและประสบการณ์หลังเล่นเกม', href: '/reviews', icon: Star },
  { title: 'ไกด์และเทคนิค', description: 'แบ่งปันวิธีเล่น เคล็ดลับ และคำแนะนำสำหรับเกมที่ชอบ', href: '/guides', icon: BookOpen },
  { title: 'อีสปอร์ต', description: 'ติดตามการแข่งขัน ทีมโปรด และข่าวสารวงการอีสปอร์ต', href: '/esports', icon: Trophy },
];

const communityActivities = [
  { title: 'ชวนคุยเรื่องเกม', description: 'เลือกข่าวหรือเกมที่สนใจ แล้วร่วมแลกเปลี่ยนความคิดเห็นกับผู้อ่านคนอื่น', href: '/news', icon: MessageCircle, action: 'ดูข่าวเกม' },
  { title: 'แบ่งปันไกด์และเทคนิค', description: 'ค้นหาเคล็ดลับและคู่มือที่ช่วยให้การเล่นเกมสนุกและเข้าใจง่ายขึ้น', href: '/guides', icon: BookOpen, action: 'อ่านไกด์' },
  { title: 'ค้นหาเกมที่น่าสนใจ', description: 'อ่านรีวิวจากทีมงานและค้นพบเกมที่อาจกลายเป็นเกมโปรดเกมต่อไป', href: '/reviews', icon: Gamepad2, action: 'ดูรีวิวเกม' },
];

export default function CommunityPage() {
  const { section } = useParams();
  const page = communityPages[section];
  const isOverview = !section;
  const { articles, featured } = useNews();
  const PageIcon = page?.icon || UsersRound;

  const contributors = useMemo(() => {
    const authorCounts = new Map();
    [...featured, ...articles].forEach((article) => {
      const author = (article.author || 'ทีมงาน GameOut').trim();
      authorCounts.set(author, (authorCounts.get(author) || 0) + 1);
    });

    return [...authorCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [articles, featured]);

  if (!page && !isOverview) {
    return (
      <main className="community-page community-page--not-found">
        <h1>ไม่พบหน้าชุมชน</h1>
        <Link to="/" className="community-page__back">
          <ArrowLeft size={16} />
          กลับหน้าแรก
        </Link>
      </main>
    );
  }

  return (
    <main className="community-page">
      <header className="community-page__hero">
        <div className="community-page__container">
          <PageIcon className="community-page__hero-icon" aria-hidden="true" />
          <p className="community-page__eyebrow">GAMEOUT COMMUNITY</p>
          <h1>{page?.title || 'ชุมชนเกมเมอร์'}</h1>
          <p className="community-page__description">
            {page?.description || 'พื้นที่สำหรับพูดคุยเรื่องเกม ร่วมกิจกรรม และทำความรู้จักผู้มีส่วนร่วมของ GameOut'}
          </p>
        </div>
      </header>

      <div className="community-page__container community-page__content">
        {isOverview && (
          <>
            <section className="community-page__overview-section">
              <div className="community-page__section-heading community-page__section-heading--link">
                <div>
                  <h2>ฟอรัมและหัวข้อพูดคุย</h2>
                  <p>เลือกสำรวจข่าว รีวิว ไกด์ และเรื่องราวจากวงการเกม</p>
                </div>
                <Link to="/community/forum" className="community-page__section-link">
                  รายละเอียดฟอรัม <ArrowRight size={15} />
                </Link>
              </div>
              <div className="community-page__grid">
                {forumBoards.map((board) => {
                  const BoardIcon = board.icon;
                  return (
                    <Link to={board.href} className="community-card" key={board.title}>
                      <BoardIcon className="community-card__icon" size={24} />
                      <h3>{board.title}</h3>
                      <p>{board.description}</p>
                      <span className="community-card__action">ไปที่หมวดนี้ <ArrowRight size={15} /></span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="community-page__overview-section">
              <div className="community-page__section-heading community-page__section-heading--link">
                <div>
                  <h2>กิจกรรมชุมชน</h2>
                  <p>ค้นหาแนวทางร่วมสนุกและแบ่งปันความสนใจเกี่ยวกับเกม</p>
                </div>
                <Link to="/community/events" className="community-page__section-link">
                  รายละเอียดกิจกรรม <ArrowRight size={15} />
                </Link>
              </div>
              <div className="community-page__grid community-page__grid--activities">
                {communityActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <article className="community-card" key={activity.title}>
                      <ActivityIcon className="community-card__icon" size={24} />
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                      <Link to={activity.href} className="community-card__action">
                        {activity.action} <ArrowRight size={15} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="community-page__overview-section">
              <div className="community-page__section-heading community-page__section-heading--link">
                <div>
                  <h2>ผู้มีส่วนร่วม</h2>
                  <p>ผู้เขียนที่ร่วมเผยแพร่บทความบน GameOut</p>
                </div>
                <Link to="/community/contributors" className="community-page__section-link">
                  ดูผู้เขียนทั้งหมด <ArrowRight size={15} />
                </Link>
              </div>
              <div className="community-page__grid community-page__grid--contributors">
                {contributors.slice(0, 6).map((contributor) => (
                  <article className="community-contributor" key={contributor.name}>
                    <div className="community-contributor__avatar">
                      <UsersRound size={24} />
                    </div>
                    <div>
                      <h3>{contributor.name}</h3>
                      <p>{contributor.count} บทความ</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {section === 'forum' && (
          <>
            <div className="community-page__section-heading">
              <h2>เลือกหัวข้อที่สนใจ</h2>
              <p>เริ่มต้นจากหมวดที่คุณอยากติดตามหรือพูดคุย</p>
            </div>
            <div className="community-page__grid">
              {forumBoards.map((board) => {
                const BoardIcon = board.icon;
                return (
                  <Link to={board.href} className="community-card" key={board.title}>
                    <BoardIcon className="community-card__icon" size={24} />
                    <h3>{board.title}</h3>
                    <p>{board.description}</p>
                    <span className="community-card__action">ไปที่หมวดนี้ <ArrowRight size={15} /></span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {section === 'events' && (
          <>
            <div className="community-page__section-heading">
              <h2>ร่วมสนุกกับชุมชน</h2>
              <p>สำรวจเนื้อหาและร่วมแลกเปลี่ยนเรื่องเกมในแบบที่คุณสนใจ</p>
            </div>
            <div className="community-page__grid">
              {communityActivities.map((activity) => {
                const ActivityIcon = activity.icon;
                return (
                  <article className="community-card" key={activity.title}>
                    <ActivityIcon className="community-card__icon" size={24} />
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <Link to={activity.href} className="community-card__action">
                      {activity.action} <ArrowRight size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {section === 'contributors' && (
          <>
            <div className="community-page__section-heading">
              <h2>ทีมผู้เขียนและผู้มีส่วนร่วม</h2>
              <p>รายชื่อผู้เขียนที่มีบทความเผยแพร่บน GameOut</p>
            </div>
            {contributors.length > 0 ? (
              <div className="community-page__grid community-page__grid--contributors">
                {contributors.map((contributor) => (
                  <article className="community-contributor" key={contributor.name}>
                    <div className="community-contributor__avatar">
                      <UsersRound size={24} />
                    </div>
                    <div>
                      <h3>{contributor.name}</h3>
                      <p>{contributor.count} บทความ</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="community-page__empty">ยังไม่มีข้อมูลผู้มีส่วนร่วม</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
