import { motion } from 'framer-motion';
import { Calendar, Monitor, Zap } from 'lucide-react';
import './GameCard.css';
// comment
export default function GameCard({ game, index = 0 }) {
  const getHypeColor = (hype) => {
    if (hype >= 95) return '#E10000';
    if (hype >= 90) return '#F97316';
    if (hype >= 80) return '#FFD700';
    return '#10B981';
  };

  return (
    <motion.div
      className="game-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="game-card__image-wrapper">
        <img src={game.image} alt={game.title} className="game-card__image" loading="lazy" />
        <div className="game-card__image-overlay" />
        <div className="game-card__hype" style={{ '--hype-color': getHypeColor(game.hype) }}>
          <Zap size={12} />
          <span>{game.hype}%</span>
        </div>
      </div>

      <div className="game-card__body">
        <h4 className="game-card__title">{game.title}</h4>
        <p className="game-card__developer">{game.developer}</p>

        <div className="game-card__info">
          <div className="game-card__info-item">
            <Calendar size={13} />
            <span>{game.releaseDate}</span>
          </div>
          <div className="game-card__info-item">
            <Monitor size={13} />
            <span>{game.platforms.join(', ')}</span>
          </div>
        </div>

        <div className="game-card__hype-bar">
          <div className="game-card__hype-label">
            <span>Hype Level</span>
            <span style={{ color: getHypeColor(game.hype) }}>{game.hype}%</span>
          </div>
          <div className="game-card__hype-track">
            <motion.div
              className="game-card__hype-fill"
              initial={{ width: 0 }}
              animate={{ width: `${game.hype}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              style={{ background: getHypeColor(game.hype) }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
