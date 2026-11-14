import { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { trendingTopics } from '../../data/mockData';
import './SearchBar.css';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__input-wrapper">
          <Search size={20} className="search-bar__icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-bar__input"
            placeholder="ค้นหาข่าว, รีวิว, ไกด์..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-bar__clear" onClick={() => setQuery('')}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="search-bar__trending">
          <div className="search-bar__trending-header">
            <TrendingUp size={16} />
            <span>กำลังเป็นที่นิยม</span>
          </div>
          <div className="search-bar__trending-tags">
            {trendingTopics.map((topic) => (
              <button
                key={topic.id}
                className="search-bar__tag"
                onClick={() => setQuery(topic.name)}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
