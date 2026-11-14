import { TrendingUp, Flame } from 'lucide-react';
import { trendingTopics } from '../../data/mockData';
import './TrendingBar.css';

export default function TrendingBar() {
  return (
    <div className="trending-bar">
      <div className="trending-bar__container">
        <div className="trending-bar__label">
          <Flame size={16} className="trending-bar__icon" />
          <span>Trending</span>
        </div>
        <div className="trending-bar__scroll">
          <div className="trending-bar__track">
            {[...trendingTopics, ...trendingTopics].map((topic, index) => (
              <a key={`${topic.id}-${index}`} href="#" className="trending-bar__item">
                <span className="trending-bar__rank">#{(index % trendingTopics.length) + 1}</span>
                <span className="trending-bar__name">{topic.name}</span>
                <span className="trending-bar__count">{topic.count}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
