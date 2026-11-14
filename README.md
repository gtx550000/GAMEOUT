# 🎮 GAMEPULSE — เว็บไซต์ข่าวเกมสไตล์ IGN (ธีมขาว-แดง)

**GAMEPULSE** คือเว็บข่าวสารวงการเกม รีวิว บทความ และอีสปอร์ต ที่ได้รับการออกแบบโดยเน้นความทันสมัย ใช้งานง่าย มีเอกลักษณ์ด้วยธีมสีขาว-แดง (ได้แรงบันดาลใจจาก IGN) พร้อมการแบ่งแยกคอมโพเนนต์ (Component-Driven) อย่างเป็นระเบียบ เพื่อให้ง่ายต่อการดูแลรักษา (Maintenance) และต่อยอดเพิ่มฟีเจอร์ในอนาคต

---

## 🌟 ฟีเจอร์เด่น (Key Features)

- 🎨 **ธีมขาว-แดง (IGN-Inspired & Unique Identity)**: เอกลักษณ์ชัดเจน สะอาดตา มีมิติด้วย Red Glow และแอนิเมชันที่ลื่นไหล
- 🌓 **ระบบ Dark / Light Mode**: สลับโหมดกลางวัน-กลางคืนได้ทันที พร้อมจดจำสถานะผ่าน `localStorage`
- ⚡ **Hero Slider อัตโนมัติ**: สไลด์โชว์ข่าวเด่นพร้อม Progress Bar นับถอยหลัง และปุ่มเลื่อนมือ
- 🔥 **แถบเทรนด์วิ่ง (Marquee Trending Bar)**: แสดงประเด็นเกมฮิตแบบเรียลไทม์ที่กำลังเป็นกระแส
- 🏷️ **ตัวกรองหมวดหมู่แบบเคลื่อนไหว (Animated Filter)**: กรองข่าวตามหมวดหมู่ได้ทันใจ ใช้ Framer Motion เพื่อความนุ่มนวล
- 🎯 **ระบบ Game Hype Meter**: แสดงแถบพลังความน่าเล่นของเกมใหม่ตามเฉดสีและเปอร์เซ็นต์
- ✍️ **ระบบจัดการบทความสำหรับทีมงาน (Staff Addnews Portal)**:
  - ซ่อนจากหน้าเว็บหลัก ไม่แสดงปุ่มรบกวนสายตาผู้ชมทั่วไป
  - เข้าถึงผ่าน URL Path: `/add-news`, `/staff`, หรือ `/admin`
  - เข้าถึงผ่านทางลัดคีย์บอร์ด (Keyboard Shortcut): กด `Ctrl + Shift + A` (หรือ `Cmd + Shift + A` บน Mac) ได้จากทุกหน้า
  - เข้าถึงผ่านลิงก์ลับ "ระบบทีมงาน (Staff)" บริเวณท้ายเว็บ (Footer)
  - ต้อง Login ผ่าน Username / Password เฉพาะทีมงาน
  - แบ่ง 3 แท็บหลัก: **1. เพิ่มข่าวสาร (Gaming News)**, **2. รีวิวเกม (Game Review)**, และ **3. ประวัติบทความ & จัดการแก้ไข (My Articles & History)**
  - **ระบบประวัติบทความของนักเขียน (Archive & History)**:
    - ค้นหาบทความตาม **วันเจาะจงผ่านปฏิทิน (Calendar Date Picker)** หรือเลือกตาม **เดือน**
    - กรองแยกหมวดหมู่ ข่าวสาร / รีวิวเกม / คำค้นหา
  - **ระบบแก้ไขบทความ & บันทึกประวัติการแก้ไข (Revision History & Changelog)**:
    - แก้ไขบทความเดิมได้ทันที พร้อมดึงข้อมูลกลับเข้าฟอร์มอัตโนมัติ
    - บันทึกประวัติการแก้ไข (วันเวลา, ผู้แก้ไข, หมายเหตุการแก้ไข) แสดงเป็น Timeline ละเอียด
    - แสดงป้ายแจ้งเตือนประวัติการแก้ไขบนหน้ารายละเอียดบทความ (`/article/:id`) เพื่อความโปร่งใสแบบมืออาชีพ
  - มี **Live Preview สด** จำลองหน้าตาก่อนเผยแพร่จริง
  - เมื่อกดบันทึก ข้อมูลจะซิงค์ขึ้นหน้าแรกและหน้าหมวดหมู่ทันทีผ่าน `NewsContext` และ `localStorage`
- 🏆 **วงแหวนคะแนนรีวิว (Circular Review Score)**: แสดงคะแนนรีวิวแบบกราฟิก SVG Ring เช่น 9.5/10 สไตล์ IGN
- 🔍 **ระบบค้นหาแบบป๊อปอัป (Search Overlay)**: ค้นหาด่วน พร้อมแท็กคำค้นหายอดนิยม และปิดด้วยปุ่ม `Esc`
- 📱 **Fully Responsive**: รองรับการแสดงผลทุกขนาดหน้าจอ ทั้ง Desktop, Tablet และ Mobile พร้อม Hamburger Menu
- 🧭 **ระบบ Routing ครบวงจร**: รองรับหน้าแรก (`/`), หน้ารายละเอียดบทความ (`/article/:id`), และหน้าหมวดหมู่แยก (`/:category`)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Icons
- **Typography**: Google Fonts ([Kanit](https://fonts.google.com/specimen/Kanit) & [Inter](https://fonts.google.com/specimen/Inter))
- **Styling**: Modern CSS Variables & CSS Modules Pattern (แยกไฟล์ CSS ตาม Component)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
webข่าวเกม/
├── public/                 # ไฟล์ Static ทั่วไป
├── src/
│   ├── assets/             # รูปภาพและโลโก้
│   ├── components/         # คอมโพเนนต์แยกชิ้นส่วนเพื่อง่ายต่อการ MA
│   │   ├── CategoryFilter/ # แถบกรองหมวดหมู่พร้อมแอนิเมชัน
│   │   ├── Footer/         # ท้ายเว็บ, โซเชียล และปุ่มเลื่อนกลับบนสุด
│   │   ├── GameCard/       # การ์ดเกมใหม่พร้อมระดับ Hype Meter
│   │   ├── Hero/           # สไลเดอร์ข่าวเด่นหน้าแรก
│   │   ├── Navbar/         # แถบเมนูนำทาง, ปลั๊กอินค้นหา, สลับโหมด
│   │   ├── NewsCard/       # การ์ดบทความข่าวและรีวิว
│   │   ├── Newsletter/     # ฟอร์มรับจดหมายข่าว
│   │   ├── ReviewScore/    # วงแหวนแสดงคะแนนรีวิว
│   │   ├── SearchBar/      # แถบค้นหาและแท็กยอดนิยม
│   │   └── TrendingBar/    # แถบเทรนด์วิ่ง (Marquee)
│   ├── data/
│   │   └── mockData.js     # แหล่งรวมข้อมูลจำลอง (ข่าว, เทรนด์, เกม)
│   ├── hooks/              # Custom Hooks ที่นำมาใช้ซ้ำได้
│   │   ├── useDarkMode.js
│   │   ├── useLocalStorage.js
│   │   └── useScrollAnimation.js
│   ├── pages/              # หน้าหลักของระบบ
│   │   ├── HomePage.jsx    # หน้าแรก
│   │   ├── ArticlePage.jsx # หน้ารายละเอียดข่าว / รีวิว
│   │   └── CategoryPage.jsx# หน้าหมวดหมู่ข่าวเฉพาะ
│   ├── App.jsx             # จุดเชื่อมต่อ Router และ Layout
│   ├── App.css
│   ├── index.css           # CSS Variables, Reset และ Theme สากล
│   └── main.jsx            # จุดเริ่มต้นของ React Application
├── index.html              # HTML Shell พร้อมตั้งค่า Fonts และ Favicon
├── package.json
└── vite.config.js
```

---

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Server)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

### 3. ตรวจสอบและ Build สำหรับ Production
```bash
npm run build
```
ไฟล์ที่พร้อมเผยแพร่จะถูกสร้างไว้ในโฟลเดอร์ `dist/`

---

## 🔧 แนวทางการบำรุงรักษาและการเพิ่มฟีเจอร์ (Maintenance & Extension)

### การเพิ่มหรือแก้ไขข้อมูลข่าว
เปิดไฟล์ `src/data/mockData.js` เพื่อเพิ่มวัตถุข่าวใหม่ เช่น:
```javascript
{
  id: 13,
  title: 'ชื่อหัวข้อข่าวใหม่',
  excerpt: 'เนื้อหาย่อของข่าว...',
  image: 'URL รูปภาพ',
  category: 'news', // 'news' | 'reviews' | 'guides' | 'esports' | 'upcoming'
  author: 'ชื่อผู้เขียน',
  date: '2026-11-14',
  readTime: '5 นาที',
  tags: ['Tag1', 'Tag2'],
  views: 12000,
  comments: 45,
  score: 9.0 // ใส่เฉพาะกรณีที่มีรีวิว
}
```

### การปรับแต่งสีและธีม
สามารถปรับค่าตัวแปรสีได้ที่ไฟล์ `src/index.css` ที่ `:root`:
- `--primary-red`: รหัสสีแดงหลัก (ค่าเริ่มต้น `#E10000`)
- `--primary-red-dark`: รหัสสีแดงเข้มสำหรับปุ่ม Hover
- `--bg-primary` & `--bg-card`: ปรับสีพื้นหลังของโหมดสว่าง/โหมดมืด

### การเชื่อมต่อกับ API ภายนอก (Real Backend)
สามารถเปลี่ยนจากการอ่านข้อมูลใน `src/data/mockData.js` มาเป็นการเรียกผ่าน `fetch` หรือ `axios` ในแต่ละคอมโพเนนต์หรือ `useEffect` ได้ทันทีโดยไม่กระทบต่อโครงสร้าง Component

---

## 📄 ใบอนุญาต (License)
โปรเจกต์นี้เปิดให้ใช้งานและพัฒนาต่อเพื่อการศึกษาและการเรียนรู้ (MIT License)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
webข่าวเกม/
├── public/                 # ไฟล์ Static ทั่วไป
├── src/
│   ├── assets/             # รูปภาพและโลโก้
│   ├── components/         # คอมโพเนนต์แยกชิ้นส่วนเพื่อง่ายต่อการ MA
│   │   ├── CategoryFilter/ # แถบกรองหมวดหมู่พร้อมแอนิเมชัน
│   │   ├── Footer/         # ท้ายเว็บ, โซเชียล และปุ่มเลื่อนกลับบนสุด
│   │   ├── GameCard/       # การ์ดเกมใหม่พร้อมระดับ Hype Meter
│   │   ├── Hero/           # สไลเดอร์ข่าวเด่นหน้าแรก
│   │   ├── Navbar/         # แถบเมนูนำทาง, ปลั๊กอินค้นหา, สลับโหมด
│   │   ├── NewsCard/       # การ์ดบทความข่าวและรีวิว
│   │   ├── Newsletter/     # ฟอร์มรับจดหมายข่าว
│   │   ├── ReviewScore/    # วงแหวนแสดงคะแนนรีวิว
│   │   ├── SearchBar/      # แถบค้นหาและแท็กยอดนิยม
│   │   └── TrendingBar/    # แถบเทรนด์วิ่ง (Marquee)
│   ├── data/
│   │   └── mockData.js     # แหล่งรวมข้อมูลจำลอง (ข่าว, เทรนด์, เกม)
│   ├── hooks/              # Custom Hooks ที่นำมาใช้ซ้ำได้
│   │   ├── useDarkMode.js
│   │   ├── useLocalStorage.js
│   │   └── useScrollAnimation.js
│   ├── pages/              # หน้าหลักของระบบ
│   │   ├── HomePage.jsx    # หน้าแรก
│   │   ├── ArticlePage.jsx # หน้ารายละเอียดข่าว / รีวิว
│   │   └── CategoryPage.jsx# หน้าหมวดหมู่ข่าวเฉพาะ
│   ├── App.jsx             # จุดเชื่อมต่อ Router และ Layout
│   ├── App.css
│   ├── index.css           # CSS Variables, Reset และ Theme สากล
│   └── main.jsx            # จุดเริ่มต้นของ React Application
├── index.html              # HTML Shell พร้อมตั้งค่า Fonts และ Favicon
├── package.json
└── vite.config.js
```

---

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Server)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

### 3. ตรวจสอบและ Build สำหรับ Production
```bash
npm run build
```
ไฟล์ที่พร้อมเผยแพร่จะถูกสร้างไว้ในโฟลเดอร์ `dist/`

---

## 🔧 แนวทางการบำรุงรักษาและการเพิ่มฟีเจอร์ (Maintenance & Extension)

### การเพิ่มหรือแก้ไขข้อมูลข่าว
เปิดไฟล์ `src/data/mockData.js` เพื่อเพิ่มวัตถุข่าวใหม่ เช่น:
```javascript
{
  id: 13,
  title: 'ชื่อหัวข้อข่าวใหม่',
  excerpt: 'เนื้อหาย่อของข่าว...',
  image: 'URL รูปภาพ',
  category: 'news', // 'news' | 'reviews' | 'guides' | 'esports' | 'upcoming'
  author: 'ชื่อผู้เขียน',
  date: '2026-11-14',
  readTime: '5 นาที',
  tags: ['Tag1', 'Tag2'],
  views: 12000,
  comments: 45,
  score: 9.0 // ใส่เฉพาะกรณีที่มีรีวิว
}
```

### การปรับแต่งสีและธีม
สามารถปรับค่าตัวแปรสีได้ที่ไฟล์ `src/index.css` ที่ `:root`:
- `--primary-red`: รหัสสีแดงหลัก (ค่าเริ่มต้น `#E10000`)
- `--primary-red-dark`: รหัสสีแดงเข้มสำหรับปุ่ม Hover
- `--bg-primary` & `--bg-card`: ปรับสีพื้นหลังของโหมดสว่าง/โหมดมืด

### การเชื่อมต่อกับ API ภายนอก (Real Backend)
สามารถเปลี่ยนจากการอ่านข้อมูลใน `src/data/mockData.js` มาเป็นการเรียกผ่าน `fetch` หรือ `axios` ในแต่ละคอมโพเนนต์หรือ `useEffect` ได้ทันทีโดยไม่กระทบต่อโครงสร้าง Component

---

## 📄 ใบอนุญาต (License)
โปรเจกต์นี้เปิดให้ใช้งานและพัฒนาต่อเพื่อการศึกษาและการเรียนรู้ (MIT License)

