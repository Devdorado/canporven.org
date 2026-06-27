import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { Bell, CheckCircle, Mail, MessageCircle, Globe } from 'lucide-react';

const ILLUSTRATION = 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/257f125c2_generated_image.png';

const benefits = [
  { icon: Mail, titleKey: 'notify.benefit1_title', textKey: 'notify.benefit1_text' },
  { icon: MessageCircle, titleKey: 'notify.benefit2_title', textKey: 'notify.benefit2_text' },
  { icon: Globe, titleKey: 'notify.benefit3_title', textKey: 'notify.benefit3_text' },
];

export default function NotifySection() {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [prefLang, setPrefLang] = useState('ES');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.NotificationSignup.create({
      email,
      preferred_language: prefLang,
      gdpr_consent: consent,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="aviso" className="py-16 md:py-24 bg-white overflow-hidden" aria-labelledby="notify-heading">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left: heading, benefits, form */}
        <div>
          <div className="w-14 h-14 rounded-full bg-[#1565C0]/10 flex items-center justify-center mb-6">
            <Bell size={28} className="text-[#1565C0]" />
          </div>
          <h2 id="notify-heading" className="text-3xl md:text-4xl font-bold text-[#121212] mb-3">
            {t('notify.title', lang)}
          </h2>
          <p className="text-[#121212]/70 mb-8 max-w-md">{t('notify.subtitle', lang)}</p>

          {/* Benefit list */}
          <ul className="space-y-5 mb-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.titleKey} className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#1565C0]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#1565C0]" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#121212] leading-tight">{t(b.titleKey, lang)}</p>
                    <p className="text-sm text-[#121212]/70 leading-snug">{t(b.textKey, lang)}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {submitted ? (
            <div className="bg-[#1565C0]/5 rounded-xl p-8">
              <CheckCircle size={40} className="text-[#1565C0] mb-4" />
              <h3 className="text-xl font-semibold text-[#121212] mb-2">{t('notify.success_title', lang)}</h3>
              <p className="text-[#121212]/70">{t('notify.success_text', lang)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('notify.email', lang)} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('notify.language', lang)}</label>
                <div className="flex gap-3">
                  {['ES', 'EN'].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPrefLang(l)}
                      className={`flex-1 h-12 rounded-lg text-sm font-semibold border transition-colors ${
                        prefLang === l
                          ? 'bg-[#1565C0] text-white border-[#1565C0]'
                          : 'bg-white text-[#121212]/70 border-gray-300 hover:border-[#1565C0]/50'
                      }`}
                    >
                      {l === 'ES' ? 'Español' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="notify-consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-6 h-6 rounded border-gray-300 text-[#1565C0] focus:ring-[#1565C0] shrink-0 cursor-pointer"
                />
                <label htmlFor="notify-consent" className="text-sm text-[#121212]/80 leading-snug cursor-pointer">
                  {t('notify.consent', lang)} *
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !consent}
                className="w-full h-14 bg-[#1565C0] text-white font-semibold text-base rounded-lg hover:bg-[#1255A0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? t('notify.submitting', lang) : t('notify.submit', lang)}
              </button>
            </form>
          )}
        </div>

        {/* Right: illustration */}
        <div className="order-first lg:order-last">
          <img
            src={ILLUSTRATION}
            alt=""
            className="w-full max-w-lg mx-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}