import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { Stethoscope, CheckCircle } from 'lucide-react';

const langOptions = [
  { value: 'Spanish', key: 'lang.spanish' },
  { value: 'English', key: 'lang.english' },
  { value: 'Portuguese', key: 'lang.portuguese' },
  { value: 'Other', key: 'lang.other' },
];

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  profession: '',
  qualification_number: '',
  license_country: '',
  languages_spoken: [],
  weekly_hours: '',
  availability_text: '',
  message: '',
  gdpr_consent: false,
};

export default function DoctorGatedForm() {
  const { lang } = useLang();
  const [gatePassed, setGatePassed] = useState(false);
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
      <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-[#1565C0]/20 shadow-sm p-8">
        <div className="w-14 h-14 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={30} className="text-[#1565C0]" />
        </div>
        <h3 className="text-xl font-bold text-[#121212] mb-2">{t('getinvolved.success_title', lang)}</h3>
        <p className="text-[#121212]/70">{t('getinvolved.success_doctor', lang)}</p>
      </div>
    );
  }

  if (!gatePassed) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#1565C0]/20 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-5">
          <Stethoscope size={28} className="text-[#1565C0]" />
        </div>
        <p className="text-base text-[#121212] mb-6 leading-relaxed">
          {t('getinvolved.doctor_gate', lang)}
        </p>
        <button
          onClick={() => setGatePassed(true)}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#1565C0] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-[#1255A0] transition-colors min-h-[48px]"
        >
          {t('getinvolved.doctor_gate_btn', lang)}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.full_name', lang)} *</label>
        <input
          type="text"
          required
          value={form.full_name}
          onChange={(e) => set('full_name', e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.email', lang)} *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.phone', lang)} *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.profession', lang)}</label>
        <input
          type="text"
          required
          value={form.profession}
          onChange={(e) => set('profession', e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.qualification', lang)}</label>
          <input
            type="text"
            required
            value={form.qualification_number}
            onChange={(e) => set('qualification_number', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.license_country', lang)}</label>
          <input
            type="text"
            required
            value={form.license_country}
            onChange={(e) => set('license_country', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#121212] mb-2">{t('gi.languages', lang)}</label>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.weekly_hours', lang)}</label>
          <input
            type="number"
            required
            min="1"
            value={form.weekly_hours}
            onChange={(e) => set('weekly_hours', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('gi.availability', lang)}</label>
          <input
            type="text"
            value={form.availability_text}
            onChange={(e) => set('availability_text', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('doctors.note', lang)}</label>
        <textarea
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base resize-none"
        />
      </div>

      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          id="doctor-consent-gi"
          required
          checked={form.gdpr_consent}
          onChange={(e) => set('gdpr_consent', e.target.checked)}
          className="mt-0.5 w-6 h-6 rounded border-gray-300 text-[#1565C0] focus:ring-[#1565C0] shrink-0 cursor-pointer"
        />
        <label htmlFor="doctor-consent-gi" className="text-sm text-[#121212]/80 leading-snug cursor-pointer">
          {t('gi.consent', lang)} *
        </label>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 space-y-2">
        <p className="text-xs text-[#121212]/70 leading-relaxed">{t('gi.general_disclaimer', lang)}</p>
        <p className="text-xs text-[#121212]/70 leading-relaxed">{t('gi.doctor_disclaimer', lang)}</p>
      </div>

      <button
        type="submit"
        disabled={submitting || !form.gdpr_consent}
        className="w-full h-14 bg-[#1565C0] text-white font-semibold text-base rounded-lg hover:bg-[#1255A0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? t('gi.submitting', lang) : t('gi.submit', lang)}
      </button>
    </form>
  );
}