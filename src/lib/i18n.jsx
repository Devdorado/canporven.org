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
  'doctors.pre_coordination_note': {
    es: 'Este formulario es exclusivamente para la pre-coordinación de médicos voluntarios. No es un compromiso inmediato: nos pondremos en contacto contigo para verificar tu licencia y coordinar tu participación antes de cualquier actividad.',
    en: 'This form is exclusively for the pre-coordination of volunteer doctors. It is not an immediate commitment: we will contact you to verify your license and coordinate your participation before any activity.',
  },
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

  // Get Involved section
  'getinvolved.title': { es: 'Súmate a la red', en: 'Join the network' },
  'getinvolved.intro': {
    es: 'Elige tu perfil. Recogemos solo lo necesario para coordinar la ayuda.',
    en: 'Choose your profile. We only collect what we need to coordinate help.',
  },
  'getinvolved.tab_doctor': { es: 'Médicos y personal sanitario', en: 'Doctors and qualified health personnel' },
  'getinvolved.tab_doctor_desc': { es: 'Profesionales cualificados', en: 'Qualified professionals' },
  'getinvolved.tab_company': { es: 'Empresas y profesionales', en: 'Companies and professionals' },
  'getinvolved.tab_company_desc': { es: 'Organizaciones y empresas', en: 'Organizations and companies' },
  'getinvolved.tab_individual': { es: 'Particulares', en: 'Private individuals' },
  'getinvolved.tab_individual_desc': { es: 'Personas que quieren ayudar', en: 'People who want to help' },
  'getinvolved.doctor_gate': {
    es: 'Este formulario es solo para médicos y personal sanitario cualificado.',
    en: 'This form is only for doctors and qualified health personnel.',
  },
  'getinvolved.doctor_gate_btn': {
    es: 'Sí, soy médico o personal sanitario cualificado',
    en: 'Yes, I am a doctor or qualified health professional',
  },
  'getinvolved.success_title': { es: '¡Gracias!', en: 'Thank you!' },
  'getinvolved.success_doctor': {
    es: 'Hemos recibido tu registro. Verificaremos tu titulación y nos pondremos en contacto contigo.',
    en: 'We have received your registration. We will verify your qualification and get in touch with you.',
  },
  'getinvolved.success_company': {
    es: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.',
    en: 'We have received your request. We will get in touch with you soon.',
  },
  'getinvolved.success_individual': {
    es: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.',
    en: 'We have received your request. We will get in touch with you soon.',
  },

  // Shared form fields
  'gi.full_name': { es: 'Nombre completo', en: 'Full name' },
  'gi.email': { es: 'Correo electrónico', en: 'Email' },
  'gi.phone': { es: 'Teléfono', en: 'Phone' },
  'gi.profession': { es: 'Profesión o especialidad', en: 'Profession or specialty' },
  'gi.qualification': { es: 'Titulación / Nº de colegiación o licencia', en: 'Qualification / License or registration number' },
  'gi.license_country': { es: 'País de la licencia', en: 'Country of license' },
  'gi.languages': { es: 'Idiomas', en: 'Languages' },
  'gi.weekly_hours': { es: 'Disponibilidad semanal (horas)', en: 'Weekly availability (hours)' },
  'gi.availability': { es: 'Disponibilidad general', en: 'General availability' },
  'gi.consent': {
    es: 'Consiento el almacenamiento de mis datos para coordinar la ayuda (RGPD).',
    en: 'I consent to the storage of my data to coordinate help (GDPR).',
  },
  'gi.submit': { es: 'Enviar', en: 'Submit' },
  'gi.submitting': { es: 'Enviando...', en: 'Submitting...' },
  'gi.general_disclaimer': {
    es: 'Iniciativa ciudadana privada en formación, sin garantía legal. Tus datos se guardan temporalmente en esta plataforma solo para coordinar la ayuda; la gestión formal del consentimiento se hará vía Klaviyo. No compartimos tus datos con terceros sin tu permiso.',
    en: 'Private citizen initiative in formation, with no legal guarantee. Your data is stored temporarily on this platform only to coordinate help; formal consent management will be handled via Klaviyo. We do not share your data with third parties without your permission.',
  },
  'gi.doctor_disclaimer': {
    es: 'Verificaremos tu titulación o colegiación. Esto no constituye una relación laboral ni un servicio médico; la telemedicina se orienta a pacientes crónicos, salud mental y triaje.',
    en: 'We will verify your qualification or professional registration. This is not an employment relationship or a medical service; telemedicine focuses on chronic patients, mental health and triage.',
  },

  // Company form
  'company.contact_name': { es: 'Nombre de contacto', en: 'Contact name' },
  'company.org_name': { es: 'Organización o empresa', en: 'Organization / Company name' },
  'company.type': { es: 'Tipo', en: 'Type' },
  'company.type_company': { es: 'Empresa', en: 'Company' },
  'company.type_professional': { es: 'Profesional', en: 'Professional' },
  'company.type_ngo': { es: 'ONG', en: 'NGO' },
  'company.type_other': { es: 'Otro', en: 'Other' },
  'company.how_help': { es: '¿Cómo podéis ayudar?', en: 'How can you help?' },
  'company.help_donation': { es: 'Matching de donaciones', en: 'Donation matching' },
  'company.help_logistics': { es: 'Logística', en: 'Logistics' },
  'company.help_telecom': { es: 'Telecomunicaciones', en: 'Telecom' },
  'company.help_medical': { es: 'Servicios médicos', en: 'Medical services' },
  'company.help_technology': { es: 'Tecnología', en: 'Technology' },
  'company.help_funding': { es: 'Financiación', en: 'Funding' },
  'company.help_other': { es: 'Otro', en: 'Other' },
  'company.message': { es: 'Mensaje breve', en: 'Short message' },

  // Individual form
  'individual.name': { es: 'Nombre', en: 'Name' },
  'individual.how_help': { es: '¿Cómo quieres ayudar?', en: 'How do you want to help?' },
  'individual.help_donate': { es: 'Donar', en: 'Donate' },
  'individual.help_skills': { es: 'Voluntariado de habilidades', en: 'Skills volunteering' },
  'individual.help_spread': { es: 'Difundir', en: 'Spread the word' },
  'individual.help_other': { es: 'Otro', en: 'Other' },
  'individual.message': { es: 'Mensaje breve', en: 'Short message' },

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

  // Digital Response section
  'dr.title': { es: 'La respuesta digital al terremoto', en: 'The digital response to the earthquake' },
  'dr.abstract': {
    es: 'Junto al rescate físico ocurre otra respuesta: alertas en el móvil, satélites e IA que mapean daños, y plataformas ciudadanas que buscan a más de 50.000 desaparecidos. Hemos mapeado ese ecosistema digital, sus grietas y dónde encaja una iniciativa como la nuestra.',
    en: 'Alongside the physical rescue, another response is unfolding: phone alerts, satellites and AI mapping damage, and citizen platforms searching for 50,000+ missing people. We mapped that digital ecosystem, its gaps, and where an initiative like ours fits.',
  },
  'dr.cta_report': { es: 'Leer el informe completo', en: 'Read the full report' },
  'dr.cta_doctors': { es: 'Ver médicos y servicios', en: 'See doctors and services' },

  // Toolbox section
  'toolbox.title': { es: 'Nuestra toolbox: cerrar la brecha', en: 'Our toolbox: closing the gap' },
  'toolbox.note': {
    es: 'Propuestas en formación (Alpha) que conectan herramientas existentes en lugar de reinventarlas.',
    en: 'Proposals in formation (Alpha) that connect existing tools instead of reinventing them.',
  },
  'toolbox.closes_label': { es: 'cierra', en: 'closes' },
  'toolbox.card1_title': { es: 'Agregador y resolución de identidad', en: 'Aggregator and identity resolution' },
  'toolbox.card1_desc': { es: 'Unifica identidades dispersas y reduce duplicados.', en: 'Unifies scattered identities and reduces duplicates.' },
  'toolbox.card1_close': { es: 'fragmentación y falsos positivos', en: 'fragmentation and false positives' },
  'toolbox.card2_title': { es: 'Puente multilingüe y de voz', en: 'Multilingual and voice bridge' },
  'toolbox.card2_desc': { es: 'Traducción y acceso por voz para todos.', en: 'Translation and voice access for everyone.' },
  'toolbox.card2_close': { es: 'exclusión lingüística', en: 'linguistic exclusion' },
  'toolbox.card3_title': { es: 'Telemedicina (Canarymedic.es)', en: 'Telemedicine (Canarymedic.es)' },
  'toolbox.card3_desc': { es: 'Atención médica remota y continua.', en: 'Remote and continuous healthcare.' },
  'toolbox.card3_close': { es: 'continuidad sanitaria', en: 'healthcare continuity' },
  'toolbox.card4_title': { es: 'Verificación y anti-desinformación', en: 'Verification and anti-misinformation' },
  'toolbox.card4_desc': { es: 'Valida fuentes y frena rumores.', en: 'Validates sources and curbs rumors.' },
  'toolbox.card4_close': { es: 'rumores y falsos positivos', en: 'rumors and false positives' },
  'toolbox.card5_title': { es: 'Acceso resistente a cortes', en: 'Outage-resistant access' },
  'toolbox.card5_desc': { es: 'Funciona incluso con infraestructura débil.', en: 'Works even with weak infrastructure.' },
  'toolbox.card5_close': { es: 'censura e infraestructura', en: 'censorship and infrastructure' },
  'toolbox.card6_title': { es: 'Coordinación y derivación', en: 'Coordination and referral' },
  'toolbox.card6_desc': { es: 'Canaliza esfuerzos sin duplicar trabajo.', en: 'Channels efforts without duplicating work.' },
  'toolbox.card6_close': { es: 'duplicación de esfuerzos', en: 'duplicated effort' },
  'toolbox.cta_partner': { es: 'Conviértete en socio', en: 'Become a partner' },

  // Nav: Digital Response
  'nav.digital': { es: 'Respuesta digital', en: 'Digital response' },

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