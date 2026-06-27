import React, { useState, useEffect } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { Stethoscope, Building2, User } from 'lucide-react';
import DoctorGatedForm from '@/components/landing/forms/DoctorGatedForm';
import CompanyForm from '@/components/landing/forms/CompanyForm';
import IndividualForm from '@/components/landing/forms/IndividualForm';

const tabs = [
  { id: 'doctor', icon: Stethoscope, titleKey: 'getinvolved.tab_doctor', descKey: 'getinvolved.tab_doctor_desc' },
  { id: 'company', icon: Building2, titleKey: 'getinvolved.tab_company', descKey: 'getinvolved.tab_company_desc' },
  { id: 'individual', icon: User, titleKey: 'getinvolved.tab_individual', descKey: 'getinvolved.tab_individual_desc' },
];

const validTabs = ['doctor', 'company', 'individual'];

export default function GetInvolvedSection() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('doctor');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <section id="sumate" className="py-16 md:py-24 bg-gray-50" aria-labelledby="getinvolved-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="getinvolved-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            {t('getinvolved.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto">{t('getinvolved.intro', lang)}</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all min-h-[100px] justify-center ${
                  active
                    ? 'border-[#1565C0] bg-white shadow-md'
                    : 'border-gray-200 bg-white/60 hover:border-[#1565C0]/30'
                }`}
              >
                <Icon size={28} className={active ? 'text-[#1565C0]' : 'text-[#121212]/40'} />
                <span className={`font-semibold text-sm mt-2 leading-tight ${active ? 'text-[#1565C0]' : 'text-[#121212]'}`}>
                  {t(tab.titleKey, lang)}
                </span>
                <span className="text-xs text-[#121212]/50 mt-0.5 leading-snug">{t(tab.descKey, lang)}</span>
              </button>
            );
          })}
        </div>

        {/* Active form */}
        {activeTab === 'doctor' && <DoctorGatedForm />}
        {activeTab === 'company' && <CompanyForm />}
        {activeTab === 'individual' && <IndividualForm />}
      </div>
    </section>
  );
}