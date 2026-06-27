import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { Building2, CheckCircle } from 'lucide-react';

const typeOptions = [
  { value: 'company', key: 'company.type_company' },
  { value: 'professional', key: 'company.type_professional' },
  { value: 'ngo', key: 'company.type_ngo' },
  { value: 'other', key: 'company.type_other' },
];

const helpOptions = [
  { value: 'donation_matching', key: 'company.help_donation' },
  { value: 'logistics', key: 'company.help_logistics' },
  { value: 'telecom', key: 'company.help_telecom' },
  { value: 'medical_services', key: 'company.help_medical' },
  { value: 'technology', key: 'company.help_technology' },
  { value: 'funding', key: 'company.help_funding' },
  { value: 'other', key: 'company.help_other' },
];

const initialForm = {
  contact_name: '',
  organization_name: '',
  email: '',
  phone: '',
  org_type: 'company',
  help_ways: [],
  message: '',
  gdpr_consent: false,
};

export default function CompanyForm() {
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
    await base44.entities.CompanyRegistration.create(form);
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
        <p className="text-[#121212]/70">{t('getinvolved.success_company', lang)}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('company.contact_name', lang)}</label>
          <input
            type="text"
            required
            value={form.contact_name}
            onChange={(e) => set('contact_name', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('company.org_name', lang)}</label>
          <input
            type="text"
            value={form.organization_name}
            onChange={(e) => set('organization_name', e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base"
          />
        </div>
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
        <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('company.type', lang)}</label>
        <select
          value={form.org_type}
          onChange={(e) => set('org_type', e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20 outline-none text-base bg-white"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{t(opt.key, lang)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#121212] mb-2">{t('company.how_help', lang)}</label>
        <div className="flex flex-wrap gap-2">
          {helpOptions.map((opt) => {
            const selected = form.help_ways.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleMulti('help_ways', opt.value)}
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

      <div>
        <label className="block text-sm font-medium text-[#121212] mb-1.5">{t('company.message', lang)}</label>
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
          id="company-consent-gi"
          required
          checked={form.gdpr_consent}
          onChange={(e) => set('gdpr_consent', e.target.checked)}
          className="mt-0.5 w-6 h-6 rounded border-gray-300 text-[#1565C0] focus:ring-[#1565C0] shrink-0 cursor-pointer"
        />
        <label htmlFor="company-consent-gi" className="text-sm text-[#121212]/80 leading-snug cursor-pointer">
          {t('gi.consent', lang)} *
        </label>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3">
        <p className="text-xs text-[#121212]/70 leading-relaxed">{t('gi.general_disclaimer', lang)}</p>
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