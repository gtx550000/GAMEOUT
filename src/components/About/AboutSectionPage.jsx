import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Mail, ShieldCheck, Scale } from 'lucide-react';
import './AboutPage.css';

const pageContent = {
  careers: {
    title: 'ร่วมงานกับเรา',
    description: 'ร่วมแบ่งปันความรู้และสร้างเนื้อหาเกมที่เป็นประโยชน์ให้กับผู้อ่าน GameOut',
    icon: BriefcaseBusiness,
    sections: [
      {
        title: 'รูปแบบการมีส่วนร่วม',
        paragraphs: [
          'เราสนใจเนื้อหาข่าวเกม รีวิว ไกด์ และบทวิเคราะห์ที่เขียนชัดเจน มีข้อมูลประกอบ และเป็นประโยชน์ต่อผู้เล่น',
          'ผู้ที่สนใจสามารถเริ่มจากการร่วมเป็นผู้มีส่วนร่วมของชุมชน แล้วติดตามประกาศการรับสมัครจากช่องทางของ GameOut',
        ],
      },
      {
        title: 'แนวทางการเขียน',
        paragraphs: [
          'เนื้อหาควรเป็นผลงานต้นฉบับ ระบุแหล่งข้อมูลที่ตรวจสอบได้ และเคารพสิทธิ์ในผลงานของผู้อื่น',
        ],
      },
    ],
    action: { label: 'ดูผู้มีส่วนร่วม', href: '/community/contributors' },
  },
  privacy: {
    title: 'นโยบายความเป็นส่วนตัว',
    description: 'เราอธิบายให้ชัดเจนว่าเว็บไซต์จัดเก็บข้อมูลใดไว้ในเบราว์เซอร์ ใช้เพื่ออะไร และคุณจัดการข้อมูลเหล่านั้นได้อย่างไร',
    icon: ShieldCheck,
    sections: [
      {
        title: 'ข้อมูลที่จัดเก็บและวัตถุประสงค์',
        paragraphs: [
          'เว็บไซต์บันทึกการตั้งค่าธีมสว่างหรือมืดไว้ใน localStorage เพื่อจดจำการตั้งค่าของคุณ และบันทึกข้อมูลข่าว/รีวิวที่ใช้บนเว็บไซต์ รวมถึงรายการที่เพิ่มหรือแก้ไขผ่านหน้าทีมงาน ไว้ใน localStorage ของเบราว์เซอร์',
          'เมื่อเข้าสู่ระบบทีมงาน เว็บไซต์จะเก็บชื่อผู้ใช้และสถานะของทีมงานไว้ใน sessionStorage เพื่อคงสถานะระหว่างใช้งาน โดยข้อมูลนี้ไม่ใช่รหัสผ่าน',
        ],
      },
      {
        title: 'การจัดเก็บ การซิงก์ และการลบข้อมูล',
        paragraphs: [
          'ข้อมูลใน localStorage และ sessionStorage อยู่ในเบราว์เซอร์และอุปกรณ์ที่ใช้งาน ฟังก์ชันปัจจุบันไม่ได้ซิงก์ข้อมูลเหล่านี้ข้ามอุปกรณ์ คุณลบข้อมูลได้จากการตั้งค่าเบราว์เซอร์ โดยการลบข้อมูลเว็บไซต์อาจทำให้ข่าว/รีวิวที่เพิ่มหรือแก้ไขไว้ในเบราว์เซอร์นั้นหายไปด้วย',
          'การออกจากระบบทีมงานจะลบสถานะการเข้าสู่ระบบออกจาก sessionStorage ของแท็บที่ใช้งาน',
        ],
      },
      {
        title: 'ข้อมูลส่วนบุคคลและการเปลี่ยนแปลงนโยบาย',
        paragraphs: [
          'เว็บไซต์เวอร์ชันปัจจุบันไม่มีแบบฟอร์มสมัครสมาชิกหรือติดต่อสำหรับส่งข้อมูลส่วนบุคคล และไม่มีระบบวิเคราะห์พฤติกรรมผู้ใช้ที่ติดตั้งอยู่ในแอป ทั้งนี้ การให้บริการโฮสต์เว็บไซต์อาจมีการประมวลผลข้อมูลทางเทคนิคตามระบบของผู้ให้บริการ',
          'หากฟังก์ชันหรือวิธีจัดเก็บข้อมูลเปลี่ยนแปลง เราจะปรับปรุงหน้านี้ให้สอดคล้องกับการทำงานจริงของเว็บไซต์',
        ],
      },
    ],
    action: { label: 'อ่านข้อกำหนดการใช้งาน', href: '/about/terms' },
  },
  terms: {
    title: 'ข้อกำหนดการใช้งาน',
    description: 'แนวทางการใช้งานข่าว รีวิว ไกด์ และเนื้อหาต่าง ๆ บน GameOut',
    icon: Scale,
    sections: [
      {
        title: 'การใช้เนื้อหา',
        paragraphs: [
          'เนื้อหาบนเว็บไซต์จัดทำขึ้นเพื่อให้ข้อมูลและความบันเทิงเกี่ยวกับเกม ผู้อ่านควรตรวจสอบรายละเอียดสำคัญ เช่น วันวางจำหน่ายหรือข้อมูลการแข่งขัน กับประกาศจากผู้จัดจำหน่ายและผู้จัดงานอีกครั้ง',
          'ห้ามนำเนื้อหา รูปภาพ หรือเครื่องหมายการค้าของผู้อื่นไปใช้โดยละเมิดสิทธิ์ และควรให้เครดิตแหล่งที่มาเมื่ออ้างอิงข้อมูล',
        ],
      },
      {
        title: 'การเปลี่ยนแปลงเว็บไซต์',
        paragraphs: [
          'GameOut อาจปรับปรุงเนื้อหาและรูปแบบเว็บไซต์เพื่อให้เหมาะสมกับการใช้งาน โดยข้อมูลบางส่วนอาจเปลี่ยนแปลงได้ตามการอัปเดต',
        ],
      },
    ],
  },
  contact: {
    title: 'ติดต่อเรา',
    description: 'ช่องทางสำหรับติดตามข่าวสารและร่วมเป็นส่วนหนึ่งของชุมชน GameOut',
    icon: Mail,
    sections: [
      {
        title: 'ข้อเสนอแนะและการมีส่วนร่วม',
        paragraphs: [
          'ขณะนี้เว็บไซต์ยังไม่มีแบบฟอร์มส่งข้อความหรือระบบรับเรื่องติดต่อโดยตรงจากหน้านี้ คุณสามารถสำรวจหน้าชุมชนและติดตามผู้มีส่วนร่วมเพื่อดูข้อมูลเพิ่มเติม',
        ],
      },
    ],
    action: { label: 'ไปที่หน้าชุมชน', href: '/community/forum' },
  },
};

export default function AboutSectionPage() {
  const { section } = useParams();
  const page = pageContent[section];

  if (!page) {
    return (
      <main className="about-page about-page--not-found">
        <h1>ไม่พบหน้านี้</h1>
        <Link to="/about" className="about-page__back">
          <ArrowLeft size={16} />
          กลับไปหน้าเกี่ยวกับเรา
        </Link>
      </main>
    );
  }

  const PageIcon = page.icon;

  return (
    <main className="about-page">
      <section className="about-page__hero">
        <div className="about-page__container">
          <PageIcon className="about-page__hero-icon" aria-hidden="true" />
          <p className="about-page__eyebrow">ABOUT GAMEOUT</p>
          <h1>{page.title}</h1>
          <p className="about-page__hero-copy">{page.description}</p>
        </div>
      </section>

      <div className="about-page__container about-page__details">
        {page.sections.map((item) => (
          <section className="about-page__detail-card" key={item.title}>
            <h2>{item.title}</h2>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        {page.action && (
          <Link to={page.action.href} className="about-page__back">
            {page.action.label}
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </main>
  );
}
