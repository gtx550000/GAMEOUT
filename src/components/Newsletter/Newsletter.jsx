import { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles, UserRoundPlus} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__bg-effect" />
        <div className="newsletter__content">
          <div className="newsletter__icon">
            <UserRoundPlus size={32} />
          </div>
          <h2 className="newsletter__title">ไม่พลาดทุกข่าวเกม!</h2>
          <p className="newsletter__desc">
            สมัครรับข่าวสารเพื่อรับอัปเดตข่าวเกม รีวิว และดีลพิเศษก่อนใคร
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                className="newsletter__form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="newsletter__input-wrapper">
                  <Mail size={18} className="newsletter__input-icon" />
                  <input
                    type="email"
                    placeholder="กรอกอีเมลของคุณ..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter__input"
                    required
                  />
                  <button type="submit" className="newsletter__btn">
                    <span>สมัคร</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="newsletter__success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="newsletter__success-icon">
                  <Check size={24} />
                </div>
                <span>สมัครสำเร็จแล้ว! </span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="newsletter__privacy">
            เราจะไม่แชร์อีเมลของคุณกับบุคคลที่สาม
          </p>
        </div>
      </div>
    </section>
  );
}
