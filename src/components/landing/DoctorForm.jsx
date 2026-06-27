import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Heart, Brain, Phone, Baby, Activity, MoreHorizontal } from 'lucide-react';

const DOCTOR_IMG = 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/7b69baeed_image.png';

const skillOptions = [
  { value: 'Chronic disease care', key: 'skill.chronic', icon: Heart },
  { value: 'Mental health / Psychosocial support', key: 'skill.mental', icon: Brain },
  { value: 'Triage / Teleconsultation', key: 'skill.triage', icon: Phone },
  { value: 'Pediatrics', key: 'skill.pediatrics', icon: Baby },
  { value: 'General medicine', key: 'skill.general', icon: Activity },
  { value: 'Other', key: 'skill.other', icon: MoreHorizontal },
];

const langOptions = [
  { value: 'Spanish', key: 'lang.spanish' },
  { value: 'English', key: 'lang.english' },
  { value: 'Portuguese', key: 'lang.portuguese' },
  { value: 'Other', key: 'lang.other' },
];

const areas = ['doctors.area1', 'doctors.area2', 'doctors.area3', 'doctors.area4'];

const initialForm = {
  full_name: '',
  email: '',
  profession: '',
  medical_skills: [],
  languages_spoken: [],
  license_number: '',
  license_country: '',
  weekly_hours: '',
  availability_text: '',
  preferred_start_date: '',
  note: '',
  gdpr_consent: false,
};

export default function DoctorForm() {
  const { lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleMulti = (field, value) => {
    setForm((f) => {
      const arr = f[field];
      return {
        ...f,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.DoctorRegistration.create({
      ...form,
      weekly_hours: Number(form.weekly_hours) || 0,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="medicos" className="py-16 md:py-24 bg-[#C48F00]/5" aria-labelledby="doctors-heading">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-[#1565C0]" />
          </div>
          <h2 id="doctors-heading" className="text-2xl font-bold text-[#121212] mb-3">
            {t('doctors.success_title', lang)}
          </h2>
          <p className="text-[#121212]/70 mb-8">{t('doctors.success_text', lang)}</p>
          <button
            onClick={() => { setSubmitted(false); setForm(initialForm); }}
            className="px-6 py-3 border-2 border-[#1565C0] text-[#1565C0] font-semibold rounded-lg hover:bg-[#1565C0]/5 transition-colors min-h-[48px]"
          >
            {t('doctors.success_back', lang)}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="medicos" className="py-16 md:py-24 bg-gray-50" aria-labelledby="doctors-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 id="doctors-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            {t('doctors.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto mb-6">
            {t('doctors.subtitle', lang)}
          </p>

          {/* Area chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {areas.map((key) => (
              <span
                key={key}
                className="px-3 py-1.5 text-sm rounded-full bg-[#1565C0]/10 text-[#1565C0] font-medium"
              >
                {t(key, lang)}
              </span>
            ))}
          </div>

          {/* Image */}
          <div className="mb-10 rounded-xl overflow-hidden">
            <img
              src={DOCTOR_IMG}
              alt={lang === 'es' ? 'Telemedicina' : 'Telemedicine'}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#C48F00]/30 shadow-sm p-6 md:p-8 space-y-5"
        >
          <h3 className="text-lg font-semibold text-[#121212] mb-2">{t('doctors.form_title', lang)}</h3>

          {/* Pre-coordination notice */}
          <div className="rounded-lg bg-[#1565C0]/5 border border-[#1565C0]/20 px-4 py-3">
            <p className="text-sm text-[#121212]/70 leading-relaxed">
              <span className="font-semibold text-[#1565C0]">
                {lang === 'es' ? 'Pre-coordinación:' : 'Pre-coordination:'}
              </span>{' '}
              {t('doctors.pre_coordination_note', lang)}
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.full_name', lang)} *</label>
            <input
              type="text"
              required
              value={form.full_name}
              onChange={(e) => set('full_name', e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.email', lang)} *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
            />
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.profession', lang)} *</label>
            <input
              type="text"
              required
              value={form.profession}
              onChange={(e) => set('profession', e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
            />
          </div>

          {/* Medical Skills (multi-select tags) */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-2">{t('doctors.skills', lang)} *</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((opt) => {
                const selected = form.medical_skills.includes(opt.value);
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMulti('medical_skills', opt.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors border min-h-[40px] ${
                      selected
                        ? 'bg-[#1565C0] text-white border-[#1565C0]'
                        : 'bg-white text-[#121212]/70 border-gray-300 hover:border-[#1565C0]/50'
                    }`}
                    aria-pressed={selected}
                  >
                    <Icon size={16} />
                    {t(opt.key, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Languages (multi-select tags) */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-2">{t('doctors.languages', lang)} *</label>
            <div className="flex flex-wrap gap-2">
              {langOptions.map((opt) => {
                const selected = form.languages_spoken.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMulti('languages_spoken', opt.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border min-h-[40px] ${
                      selected
                        ? 'bg-[#1565C0] text-white border-[#1565C0]'
                        : 'bg-white text-[#121212]/70 border-gray-300 hover:border-[#1565C0]/50'
                    }`}
                    aria-pressed={selected}
                  >
                    {t(opt.key, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* License Number + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.license', lang)} *</label>
              <input
                type="text"
                required
                value={form.license_number}
                onChange={(e) => set('license_number', e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.license_country', lang)} *</label>
              <input
                type="text"
                required
                value={form.license_country}
                onChange={(e) => set('license_country', e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
              />
            </div>
          </div>

          {/* Weekly Hours */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.weekly_hours', lang)} *</label>
            <input
              type="number"
              required
              min="1"
              value={form.weekly_hours}
              onChange={(e) => set('weekly_hours', e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
            />
          </div>

          {/* Availability text */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.availability', lang)}</label>
            <textarea
              value={form.availability_text}
              onChange={(e) => set('availability_text', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base resize-none"
            />
          </div>

          {/* Preferred Start Date */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.start_date', lang)}</label>
            <input
              type="date"
              value={form.preferred_start_date}
              onChange={(e) => set('preferred_start_date', e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.note', lang)}</label>
            <textarea
              value={form.note}
              onChange={(e) => set('note', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base resize-none"
            />
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="doctor-consent"
              required
              checked={form.gdpr_consent}
              onChange={(e) => set('gdpr_consent', e.target.checked)}
              className="mt-0.5 w-6 h-6 rounded border-gray-300 text-[#1565C0] focus:ring-[#1565C0] shrink-0 cursor-pointer"
            />
            <label htmlFor="doctor-consent" className="text-sm text-[#121212]/80 leading-snug cursor-pointer">
              {t('doctors.consent', lang)} *
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !form.gdpr_consent || form.medical_skills.length === 0 || form.languages_spoken.length === 0}
            className="w-full h-14 bg-[#1565C0] text-white font-semibold text-base rounded-lg hover:bg-[#1255A0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? t('doctors.submitting', lang) : t('doctors.submit', lang)}
          </button>
        </form>

        {/* Footer note */}
        <p className="max-w-2xl mx-auto mt-6 text-center text-sm text-[#121212]/60 leading-relaxed">
          {t('doctors.footer_note', lang)}
        </p>
      </div>
    </section>
  );
}