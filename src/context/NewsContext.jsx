import { createContext, useContext, useState, useEffect } from 'react';
import { latestNews as initialLatestNews, featuredNews as initialFeaturedNews } from '../data/mockData';

const NewsContext = createContext();

const STORAGE_KEY = 'gamepulse_articles_v1';

export function NewsProvider({ children }) {
  // ดึงข้อมูลข่าวสารที่มีอยู่ ผสมกับข่าวที่ทีมงานเพิ่มไว้ใน localStorage
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved articles:', e);
    }
    // ค่าเริ่มต้นถ้ายังไม่มีใน localStorage (เพิ่ม editHistory: [] ให้บทความเริ่มต้น)
    return initialLatestNews.map(item => ({
      ...item,
      editHistory: item.editHistory || [],
      createdBy: item.createdBy || 'admin',
    }));
  });

  const [featured] = useState(initialFeaturedNews);

  // บันทึกลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles to localStorage:', e);
    }
  }, [articles]);

  // ฟังก์ชันสำหรับเพิ่มข่าวหรือรีวิวใหม่จากทีมงาน
  const addArticle = (newArticle) => {
    const now = new Date();
    const articleWithMeta = {
      ...newArticle,
      id: Date.now(), // ใช้ timestamp เป็น ID ไม่ซ้ำ
      date: newArticle.date || now.toISOString().split('T')[0],
      createdAt: now.toISOString(),
      views: 1,
      comments: 0,
      author: newArticle.author || 'GamePulse Staff',
      readTime: newArticle.readTime ? `${newArticle.readTime} นาที` : '5 นาที',
      createdBy: newArticle.createdBy || 'admin',
      editHistory: [], // ประวัติการแก้ไขเริ่มต้นว่างเปล่า
    };

    // นำข่าวใหม่ขึ้นมาเป็นอันดับแรกสุดทันที
    setArticles((prev) => [articleWithMeta, ...prev]);
    return articleWithMeta;
  };

  // ฟังก์ชันแก้ไขบทความ พร้อมบันทึกประวัติการแก้ไข (Revision History)
  const updateArticle = (id, updatedData, staffUsername = 'admin', editReason = '') => {
    const numId = parseInt(id, 10);
    const now = new Date();
    const thaiDateTime = now.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let updatedArticleResult = null;

    setArticles((prevArticles) =>
      prevArticles.map((art) => {
        if (art.id !== numId) return art;

        const currentHistory = art.editHistory || [];
        const newRevision = {
          revisionNumber: currentHistory.length + 1,
          timestamp: now.toISOString(),
          displayDate: thaiDateTime,
          editedBy: staffUsername,
          reason: editReason.trim() || 'อัปเดตเนื้อหาบทความ',
          previousTitle: art.title,
        };

        updatedArticleResult = {
          ...art,
          ...updatedData,
          id: numId,
          lastEditedAt: now.toISOString(),
          lastEditedDisplay: thaiDateTime,
          lastEditedBy: staffUsername,
          editHistory: [newRevision, ...currentHistory],
        };

        return updatedArticleResult;
      })
    );

    return updatedArticleResult;
  };

  // ฟังก์ชันลบบทความ
  const deleteArticle = (id) => {
    const numId = parseInt(id, 10);
    setArticles((prev) => prev.filter((art) => art.id !== numId));
  };

  // ค้นหาบทความตาม ID
  const getArticleById = (id) => {
    const numId = parseInt(id, 10);
    const foundFeatured = featured.find((item) => item.id === numId);
    if (foundFeatured) return foundFeatured;
    return articles.find((item) => item.id === numId);
  };

  // รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น
  const resetToDefault = () => {
    setArticles(initialLatestNews);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        featured,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticleById,
        resetToDefault,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}
