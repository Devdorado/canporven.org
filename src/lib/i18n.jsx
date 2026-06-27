import React, { createContext, useContext, useState } from 'react';

const translations = {
  // Header & Nav
  'nav.mission': { es: 'Misión', en: 'Mission' },
  'nav.doctors': { es: 'Médicos', en: 'Doctors' },
  'nav.notify': { es: 'Recibir aviso', en: 'Get Notified' },
  'nav.help': { es: 'Cómo ayudar de verdad', en: 'How real help works' },

  // Hero
  'hero.headline': {
    es: 'Canarias con Venezuela',
    en: 'Canary Islands for Venezuela',
  },
  'hero.subheadline': {
    es: 'Respuesta civil desde las Islas Canarias ante los terremotos de junio de 2026 en Venezuela.',
    en: 'A civil-society response from the Canary Islands to the June 2026 Venezuela earthquakes.',
  },
  'hero.mission_statement': {
    es: 'Canalizamos la ayuda hacia lo que realmente funciona y conectamos médicos voluntarios con quienes los necesitan.',
    en: 'We channel help into what actually works and connect volunteer doctors with those who need them.',
  },
  'hero.cta_doctor': { es: 'Soy médico, quiero ayudar', en: "I'm a doctor, I want to help" },
  'hero.cta_notify': { es: 'Avísame cuando esté listo', en: 'Notify me when ready' },

  // Mission
  'mission.title': { es: 'Cómo ayudamos', en: 'How We Help' },
  'mission.card1_title': { es: 'Ayuda eficaz', en: 'Effective Help' },
  'mission.card1_text': {
    es: 'El dinero y los canales verificados funcionan mejor que los envíos no solicitados. Publicaremos pronto una guía detallada sobre cómo ayudar de forma eficaz.',
    en: 'Money and verified channels work better than unsolicited goods. A detailed guide on how to help effectively will follow soon.',
  },
  'mission.card1_badge': { es: 'Guía próximamente', en: 'Guide coming soon' },
  'mission.card2_title': { es: 'Médicos voluntarios', en: 'Volunteer Doctors' },
  'mission.card2_text': {
    es: 'A través de Canarymedic.es, conectamos profesionales sanitarios con comunidades afectadas para teleconsulta, salud mental y atención de enfermedades crónicas.',
    en: 'Through Canarymedic.es, we connect healthcare professionals with affected communities for teleconsultation, mental health, and chronic disease care.',
  },
  'mission.card3_title': { es: 'Un puente duradero', en: 'A Lasting Bridge' },
  'mission.card3_text': {
    es: 'No solo emergencia: construimos un vínculo permanente entre Canarias y Venezuela que perdure más allá de la crisis inmediata.',
    en: 'Not just emergency relief: we build a permanent link between the Canary Islands and Venezuela that endures beyond the immediate crisis.',
  },

  // Doctors section
  'doctors.title': { es: 'Canarymedic.es — Registro de médicos voluntarios', en: 'Canarymedic.es — Volunteer Doctor Registration' },
  'doctors.subtitle': {
    es: 'Los médicos voluntarios pueden registrarse ahora para ayudar de forma remota en las siguientes áreas:',
    en: 'Volunteer doctors can register now to help remotely in the following areas:',
  },
  'doctors.area1': { es: 'Atención a enfermedades crónicas', en: 'Chronic disease care' },
  'doctors.area2': { es: 'Salud mental y apoyo psicosocial', en: 'Mental health & psychosocial support' },
  'doctors.area3': { es: 'Triaje y teleconsulta', en: 'Triage & teleconsultation' },
  'doctors.area4': { es: 'Segunda opinión médica', en: 'Second medical opinion' },
  'doctors.form_title': { es: 'Formulario de registro', en: 'Registration Form' },
  'doctors.full_name': { es: 'Nombre completo', en: 'Full name' },
  'doctors.email': { es: 'Correo electrónico', en: 'Email' },
  'doctors.profession': { es: 'Profesión o especialidad', en: 'Profession or specialty' },
  'doctors.skills': { es: 'Habilidades médicas', en: 'Medical skills' },
  'doctors.languages': { es: 'Idiomas', en: 'Languages spoken' },
  'doctors.license': { es: 'Número de licencia médica', en: 'Medical license number' },
  'doctors.license_country': { es: 'País de licencia', en: 'Country of license' },
  'doctors.weekly_hours': { es: 'Disponibilidad semanal (horas)', en: 'Weekly availability (hours)' },
  'doctors.availability': { es: 'Disponibilidad general (días y horarios preferidos)', en: 'General availability (preferred days and times)' },
  'doctors.start_date': { es: 'Fecha de inicio preferida', en: 'Preferred start date' },
  'doctors.note': { es: 'Nota breve (opcional)', en: 'Short note (optional)' },
  'doctors.consent': {
    es: 'Consiento el almacenamiento de mis datos con fines de coordinación de voluntariado (RGPD)',
    en: 'I consent to the storage of my data for the purpose of volunteer coordination (GDPR)',
  },
  'doctors.submit': { es: 'Enviar registro', en: 'Submit registration' },
  'doctors.submitting': { es: 'Enviando...', en: 'Submitting...' },
  'doctors.success_title': { es: '¡Registro recibido!', en: 'Registration received!' },
  'doctors.success_text': {
    es: 'Gracias por ofrecerte como voluntario. Verificaremos tu licencia y nos pondremos en contacto contigo pronto.',
    en: 'Thank you for volunteering. We will verify your license and get in touch with you soon.',
  },
  'doctors.success_back': { es: 'Registrar otro médico', en: 'Register another doctor' },
  'doctors.footer_note': {
    es: 'Las licencias serán verificadas. Los costes propios de los médicos voluntarios podrán cubrirse mediante patrocinio.',
    en: 'Licenses will be verified. Volunteer doctors\' own costs may be covered through sponsoring.',
  },

  // Skills options
  'skill.chronic': { es: 'Enfermedades crónicas', en: 'Chronic disease care' },
  'skill.mental': { es: 'Salud mental / Apoyo psicosocial', en: 'Mental health / Psychosocial support' },
  'skill.triage': { es: 'Triaje / Teleconsulta', en: 'Triage / Teleconsultation' },
  'skill.pediatrics': { es: 'Pediatría', en: 'Pediatrics' },
  'skill.general': { es: 'Medicina general', en: 'General medicine' },
  'skill.other': { es: 'Otro', en: 'Other' },

  // Language options
  'lang.spanish': { es: 'Español', en: 'Spanish' },
  'lang.english': { es: 'Inglés', en: 'English' },
  'lang.portuguese': { es: 'Portugués', en: 'Portuguese' },
  'lang.other': { es: 'Otro', en: 'Other' },

  // Notify section
  'notify.title': { es: 'Recibir aviso', en: 'Get Notified' },
  'notify.subtitle': {
    es: 'Déjanos tu correo y te avisaremos cuando los perfiles públicos y los canales verificados de donación estén activos.',
    en: 'Leave your email and we\'ll notify you when public profiles and verified donation channels go live.',
  },
  'notify.email': { es: 'Correo electrónico', en: 'Email' },
  'notify.language': { es: 'Idioma preferido', en: 'Preferred language' },
  'notify.consent': {
    es: 'Consiento recibir el correo de notificación (RGPD)',
    en: 'I consent to receiving the notification email (GDPR)',
  },
  'notify.submit': { es: 'Suscribirme', en: 'Subscribe' },
  'notify.submitting': { es: 'Enviando...', en: 'Submitting...' },
  'notify.success_title': { es: '¡Apuntado!', en: 'Signed up!' },
  'notify.success_text': {
    es: 'Te avisaremos en cuanto estemos listos. Gracias por tu interés.',
    en: 'We\'ll notify you as soon as we\'re ready. Thank you for your interest.',
  },

  // Share
  'share.title': { es: 'Comparte esta página', en: 'Share This Page' },
  'share.subtitle': {
    es: 'Ayúdanos a llegar a más personas compartiendo esta página.',
    en: 'Help us reach more people by sharing this page.',
  },
  'share.copied': { es: '¡Enlace copiado!', en: 'Link copied!' },
  'share.copy': { es: 'Copiar enlace', en: 'Copy link' },

  // Partners section
  'partners.title': { es: 'Organizaciones, empresas y personas que nos apoyan', en: 'Organizations, companies and people who support us' },
  'partners.subtitle': { es: 'Una alianza en construcción de tecnología, salud y voluntariado.', en: 'A growing alliance of technology, health and volunteers.' },
  'partners.placeholder': { es: 'Tu organización aquí', en: 'Your organization here' },
  'partners.cta_title': { es: 'Buscamos aliados activamente. Apóyanos tú también.', en: 'We are actively looking for partners. Support us too.' },
  'partners.cta_button': { es: 'Quiero apoyar', en: 'I want to support' },
  'partners.visit': { es: 'Visitar sitio web', en: 'Visit website' },
  'partners.no_link': { es: 'Sin enlace disponible', en: 'No link available' },
  'partners.close': { es: 'Cerrar', en: 'Close' },
  'partners.prev': { es: 'Anterior', en: 'Previous' },
  'partners.next': { es: 'Siguiente', en: 'Next' },

  // Footer
  'alpha.text': {
    es: 'En construcción. Canarias por Venezuela es, por ahora, una iniciativa ciudadana privada en fase de formación, sin personalidad jurídica ni garantía legal. Damos la bienvenida a ayuda profesional, a organizaciones y a la colaboración para construirla bien.',
    en: 'Work in progress. Canarias por Venezuela is, for now, a private citizen initiative in early formation, with no legal entity and no legal guarantee yet. Professional help, organizations and partnerships are warmly welcome.',
  },
  'footer.transparency_title': { es: 'Aviso de transparencia', en: 'Transparency Notice' },
  'footer.transparency': {
    es: 'Esta es actualmente una iniciativa ciudadana privada, no una asociación registrada. Estamos buscando una entidad jurídica o asociación que actúe como soporte legal. La plataforma no recoge donaciones directamente y solo enlaza a organizaciones verificadas. Próximamente publicaremos una guía sobre ayuda eficaz.',
    en: 'This is currently a private citizen initiative, not a registered association. We are looking for a legal entity or association to act as the carrier. The platform does not collect donations itself and only links to verified organizations. A guide on effective help will follow soon.',
  },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.contact_email_placeholder': { es: 'contacto@canporven.org', en: 'contact@canporven.org' },
  'footer.rights': { es: '© 2026 CANPORVEN.ORG — Todos los derechos reservados', en: '© 2026 CANPORVEN.ORG — All rights reserved' },

  // Misc
  'required': { es: 'Obligatorio', en: 'Required' },
  'select_options': { es: 'Selecciona opciones', en: 'Select options' },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function t(key, lang) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.es || key;
}