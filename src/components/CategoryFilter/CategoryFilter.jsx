import { motion } from 'framer-motion';
import { BookOpen, Clapperboard, Gamepad2, Newspaper, Rocket, Star, Trophy } from 'lucide-react';
import { categories } from '../../data/mockData';
import './CategoryFilter.css';

const categoryIcons = {
  all: Gamepad2,
  news: Newspaper,
  reviews: Star,
  guides: BookOpen,
  esports: Trophy,
  videos: Clapperboard,
  upcoming: Rocket,
};

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <div className="category-filter__scroll">
        {categories.map((cat) => {
          const CategoryIcon = categoryIcons[cat.id] || Newspaper;

          return (
            <button
              key={cat.id}
              className={`category-filter__btn ${activeCategory === cat.id ? 'category-filter__btn--active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <CategoryIcon className="category-filter__icon" aria-hidden="true" />
              <span className="category-filter__label">{cat.name}</span>
              {activeCategory === cat.id && (
                <motion.div
                  className="category-filter__indicator"
                  layoutId="categoryIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
