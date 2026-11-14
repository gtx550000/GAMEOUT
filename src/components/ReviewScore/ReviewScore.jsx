import './ReviewScore.css';

export default function ReviewScore({ score, size = 'medium' }) {
  const getScoreLabel = (s) => {
    if (s >= 9) return 'ยอดเยี่ยม';
    if (s >= 8) return 'ดีมาก';
    if (s >= 7) return 'ดี';
    if (s >= 6) return 'พอใช้';
    if (s >= 5) return 'ปานกลาง';
    return 'แย่';
  };

  const getScoreColor = (s) => {
    if (s >= 9) return '#10B981';
    if (s >= 8) return '#3B82F6';
    if (s >= 7) return '#F59E0B';
    if (s >= 5) return '#F97316';
    return '#EF4444';
  };

  const circumference = 2 * Math.PI * 45;
  const progress = (score / 10) * circumference;

  return (
    <div className={`review-score review-score--${size}`}>
      <svg className="review-score__ring" viewBox="0 0 100 100">
        <circle
          className="review-score__ring-bg"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
        />
        <circle
          className="review-score__ring-fill"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ stroke: getScoreColor(score) }}
        />
      </svg>
      <div className="review-score__content">
        <span className="review-score__value" style={{ color: getScoreColor(score) }}>
          {score}
        </span>
        <span className="review-score__label">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
}
