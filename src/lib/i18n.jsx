import React, { createContext, useContext, useState } from 'react';

const translations = {
  // Header & Nav
  'nav.mission': { es: 'Misión', en: 'Mission' },
  'nav.doctors': { es: 'Médicos', en: 'Doctors' },
  'nav.notify': { es: 'Recibir aviso', en: 'Get Notified' },
  'nav.help': { es: 'Cómo ayudar de verdad', en: 'How real help works' },
  'nav.help_short': { es: 'Cómo ayudar', en: 'How to help' },
  'nav.menu': { es: 'Menú', en: 'Menu' },
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.medicos': { es: 'Médicos', en: 'Doctors' },
  'nav.join': { es: 'Súmate', en: 'Join' },

  // Cómo ayudar dropdown
  'menu.help_situacion': { es: 'La situación', en: 'The situation' },
  'menu.help_dinero': { es: 'Dinero vs. especie', en: 'Money vs. goods' },
  'menu.help_fases': { es: 'Las fases', en: 'The phases' },
  'menu.help_funciona': { es: 'Qué funciona', en: 'What works' },
  'menu.help_canarias': { es: 'Factor Canarias', en: 'Canary Islands factor' },
  'menu.help_actuar': { es: 'Cómo actuar', en: 'How to act' },
  'menu.help_cooperacion': { es: 'Cooperación institucional', en: 'Institutional cooperation' },

  // Contactos dropdown
  'menu.ct_emergencias': { es: 'Teléfonos de emergencia', en: 'Emergency phones' },
  'menu.ct_entidades': { es: 'Entidades en la zona', en: 'Entities in the area' },
  'menu.ct_donar': { es: 'Canales de donación', en: 'Donation channels' },

  // Respuesta digital dropdown
  'menu.dr_ecosistema': { es: 'Ecosistema', en: 'Ecosystem' },
  'menu.dr_grietas': { es: 'Las grietas', en: 'The gaps' },
  'menu.dr_ia': { es: 'IA agéntica', en: 'Agentic AI' },
  'menu.dr_toolbox': { es: 'Nuestra toolbox', en: 'Our toolbox' },
  'nav.getinvolved': { es: 'Súmate a la red', en: 'Join the network' },
  'nav.partners': { es: 'Aliados', en: 'Partners' },
  'nav.share': { es: 'Comparte', en: 'Share' },

  // Mega menu groups
  'menu.group_main': { es: 'Páginas', en: 'Pages' },
  'menu.group_main_desc': { es: 'Navega entre las secciones principales del sitio.', en: 'Move between the main parts of the site.' },
  'menu.group_participate': { es: 'Participa', en: 'Get involved' },
  'menu.group_participate_desc': { es: 'Regístrate, recibe avisos y comparte.', en: 'Register, get notified and share.' },
  'menu.group_resources': { es: 'Recursos', en: 'Resources' },
  'menu.group_resources_desc': { es: 'Informes y guías detalladas.', en: 'Detailed reports and guides.' },
  'menu.home_desc': { es: 'Vuelve a la página principal', en: 'Back to the main page' },
  'menu.mission_desc': { es: 'Cómo ayudamos', en: 'How we help' },
  'menu.digital_desc': { es: 'La respuesta digital al terremoto', en: 'The digital response to the earthquake' },
  'menu.help_desc': { es: 'Guía de ayuda eficaz', en: 'Guide to effective help' },
  'menu.doctors_desc': { es: 'Médicos, empresas y particulares', en: 'Doctors, companies and individuals' },
  'menu.notify_desc': { es: 'Recibe un aviso cuando esté listo', en: 'Get notified when ready' },
  'menu.partners_desc': { es: 'Organizaciones que nos apoyan', en: 'Organizations supporting us' },
  'menu.share_desc': { es: 'Difunde esta página', en: 'Spread the word' },

  // Hero
  'hero.headline': {
    es: 'Canarias por Venezuela',
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
  'hero.cta_professional': { es: 'Soy profesional (no médico)', en: "I'm a professional (non-medical)" },
  'hero.cta_individual': { es: 'Soy particular', en: "I'm a private individual" },
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
  'notify.benefit1_title': { es: 'Por email', en: 'By email' },
  'notify.benefit1_text': {
    es: 'Recibe notificaciones importantes directamente en tu correo.',
    en: 'Get important notifications straight to your inbox.',
  },
  'notify.benefit2_title': { es: 'Por WhatsApp', en: 'By WhatsApp' },
  'notify.benefit2_text': {
    es: 'Avisos rápidos y actualizaciones en tu móvil.',
    en: 'Quick alerts and updates on your phone.',
  },
  'notify.benefit3_title': { es: 'Información verificada', en: 'Verified information' },
  'notify.benefit3_text': {
    es: 'Solo te escribiremos cuando todo esté listo y verificado.',
    en: 'We only reach out when everything is ready and verified.',
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

  // Citizen digital solutions
  'cds.title': { es: 'Soluciones digitales ciudadanas', en: 'Citizen digital solutions' },
  'cds.intro': {
    es: 'Solo recopilamos información pública que hemos encontrado. No son plataformas nuestras ni las hemos verificado; comprueba siempre antes de usarlas. Tu voto nos ayuda a destacar las más útiles.',
    en: 'We only collect public information we have found. These are not our platforms and we have not verified them; always check before using them. Your vote helps us highlight the most useful ones.',
  },
  'cds.open': { es: 'Abrir', en: 'Open' },
  'cds.app1_desc': {
    es: 'Mapa interactivo por zonas con estado, reporte de necesidades, directorio verificado de teléfonos de emergencia por estado y guía para donar.',
    en: 'Interactive zone-status map, needs reporting, a verified directory of emergency phones by state, and a donation guide.',
  },
  'cds.app2_desc': {
    es: 'Mapa en vivo, directorio público de personas, centros de acopio, API abierta y estadísticas.',
    en: 'Live map, public person directory, collection points, open API and statistics.',
  },
  'cds.app3_desc': {
    es: 'Plataforma ultraligera optimizada para 2G/3G y equipos antiguos. Búsqueda de personas, donaciones y refugios.',
    en: 'Ultra-light platform optimized for 2G/3G and old devices. Person search, donations and shelters.',
  },
  'cds.app4_desc': {
    es: 'Hospitales, centros de acopio, donación de sangre, apoyo psicológico y teléfonos de emergencia por estado.',
    en: 'Hospitals, collection points, blood donation, psychological support and emergency phones by state.',
  },
  'cds.app5_desc': {
    es: 'Buscar personas ingresadas en hospitales; digitaliza con IA listas de pacientes escritas a mano.',
    en: 'Search for people admitted to hospitals; AI digitizes handwritten patient lists.',
  },

  // Toolbox section
  'toolbox.title': { es: 'Nuestra toolbox: cerrar la brecha', en: 'Our toolbox: closing the gap' },
  'toolbox.note': {
    es: 'Propuestas en formación (Alpha) que conectan herramientas existentes en lugar de reinventarlas.',
    en: 'Proposals in formation (Alpha) that connect existing tools instead of reinventing them.',
  },
  'toolbox.closes_label': { es: 'cierra', en: 'closes' },
  'toolbox.hub_title': { es: 'Cerrar la brecha', en: 'Close the gap' },
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
  'toolbox.status_telemedicina': { es: 'Listo en 48 h', en: 'Ready in 48 h' },
  'toolbox.status_coordinacion': {
    es: 'Actualmente coordinando entre diferentes voluntarios',
    en: 'Currently coordinating among different volunteers',
  },

  // Nav: Digital Response
  'nav.digital': { es: 'Respuesta digital', en: 'Digital response' },
  'nav.novedades': { es: 'Novedades', en: 'News' },
  'nav.guias': { es: 'Guías', en: 'Guides' },
  'nav.contactos': { es: 'Contactos', en: 'Contacts' },

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
    es: 'Versión Beta. Iniciativa ciudadana privada en formación, sin garantía legal. Bienvenidas organizaciones y colaboraciones.',
    en: 'Beta version. Private citizen initiative in formation, with no legal guarantee yet. Organizations and partnerships welcome.',
  },
  'footer.transparency_title': { es: 'Aviso de transparencia', en: 'Transparency Notice' },
  'footer.transparency': {
    es: 'Esta es actualmente una iniciativa ciudadana privada, no una asociación registrada. Estamos buscando una entidad jurídica o asociación que actúe como soporte legal. La plataforma no recoge donaciones directamente y solo enlaza a organizaciones verificadas. Próximamente publicaremos una guía sobre ayuda eficaz.',
    en: 'This is currently a private citizen initiative, not a registered association. We are looking for a legal entity or association to act as the carrier. The platform does not collect donations itself and only links to verified organizations. A guide on effective help will follow soon.',
  },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.contact_email_placeholder': { es: 'contacto@canporven.org', en: 'contact@canporven.org' },
  'footer.rights': { es: '© 2026 CANPORVEN.ORG — Todos los derechos reservados', en: '© 2026 CANPORVEN.ORG — All rights reserved' },

  // Mega footer
  'mfooter.brand_desc': {
    es: 'Organizamos información y conexión desde Canarias para Venezuela. Dinero, no cosas. No recaudamos ni gestionamos donaciones: solo informamos y enlazamos a canales verificados.',
    en: 'We organize information and connection from the Canary Islands to Venezuela. Money, not goods. We do not collect or manage donations: we only inform and link to verified channels.',
  },
  'mfooter.domains': { es: 'canariasporvenezuela.org · canporven.org', en: 'canariasporvenezuela.org · canporven.org' },
  'mfooter.transparency': {
    es: 'Esta es una iniciativa ciudadana privada, no una asociación registrada. Buscamos una entidad jurídica o asociación que actúe como soporte legal.',
    en: 'This is a private citizen initiative, not a registered association. We are looking for a legal entity or association to act as the legal carrier.',
  },
  'mfooter.col_help': { es: 'Cómo ayudar', en: 'How to help' },
  'mfooter.col_help_1': { es: 'Cómo ayudar de verdad', en: 'How real help works' },
  'mfooter.col_help_2': { es: 'Dinero, no cosas', en: 'Money, not goods' },
  'mfooter.col_help_3': { es: 'Las fases', en: 'The phases' },
  'mfooter.col_help_4': { es: 'Cómo actuar', en: 'How to act' },
  'mfooter.col_help_5': { es: 'Cooperación institucional', en: 'Institutional cooperation' },
  'mfooter.col_digital': { es: 'Respuesta digital', en: 'Digital response' },
  'mfooter.col_digital_1': { es: 'Ecosistema', en: 'Ecosystem' },
  'mfooter.col_digital_2': { es: 'Las grietas', en: 'The gaps' },
  'mfooter.col_digital_3': { es: 'IA agéntica', en: 'Agentic AI' },
  'mfooter.col_digital_4': { es: 'Nuestra toolbox', en: 'Our toolbox' },
  'mfooter.col_contacts': { es: 'Contactos', en: 'Contacts' },
  'mfooter.col_contacts_1': { es: 'Teléfonos de emergencia', en: 'Emergency phones' },
  'mfooter.col_contacts_2': { es: 'Entidades en la zona', en: 'Entities in the area' },
  'mfooter.col_contacts_3': { es: 'Canales de donación', en: 'Donation channels' },
  'mfooter.col_initiative': { es: 'La iniciativa', en: 'The initiative' },
  'mfooter.col_initiative_1': { es: 'Novedades', en: 'News' },
  'mfooter.col_initiative_guias': { es: 'Guías', en: 'Guides' },
  'mfooter.col_initiative_2': { es: 'Médicos voluntarios', en: 'Volunteer doctors' },
  'mfooter.col_initiative_3': { es: 'Súmate', en: 'Join' },
  'mfooter.col_initiative_4': { es: 'Contacto: contacto@canporven.org', en: 'Contact: contacto@canporven.org' },
  'mfooter.bottom_bold': { es: 'canporven.org no recauda ni gestiona donaciones.', en: 'canporven.org does not collect or manage donations.' },
  'mfooter.bottom_note': { es: 'Iniciativa ciudadana privada en formación, sin garantía legal.', en: 'Private citizen initiative in formation, with no legal guarantee.' },
  'mfooter.bottom_copy': { es: '© 2026 Canarias por Venezuela', en: '© 2026 Canarias por Venezuela' },

  // Venezuela live CTA
  'vzla.badge': { es: '🔴 En vivo', en: '🔴 Live' },
  'vzla.cta_title': { es: 'Terremoto de Venezuela', en: 'Venezuela earthquake' },
  'vzla.cta_desc': {
    es: 'Mapa de reportes, personas desaparecidas y noticias actualizadas. Datos de iniciativas ciudadanas.',
    en: 'Map of reports, missing persons and updated news. Data from citizen initiatives.',
  },
  'vzla.cta_button': { es: 'Ver la situación en vivo', en: 'See the live situation' },
  'vzla.cta_missing': { es: 'Buscar o reportar desaparecidos', en: 'Search or report missing people' },
  'vzla.cta_missing_note': {
    es: 'Herramienta ciudadana externa para reconectar familias tras el sismo. No gestiona dinero ni donaciones.',
    en: 'External citizen tool to reconnect families after the earthquake. It does not handle money or donations.',
  },

  // Subpage: Cómo ayudar
  'help.intro': {
    es: 'Una guía práctica para que tu ayuda llegue de verdad: qué funciona, qué no, y cómo actuar desde Canarias.',
    en: 'A practical guide so your help truly lands: what works, what does not, and how to act from the Canary Islands.',
  },
  'help.situacion_body': {
    es: 'Tras los terremotos de junio de 2026, las zonas afectadas necesitan coordinación, no improvisación. La prioridad son las personas atrapadas, la atención médica y el agua potable.',
    en: 'After the June 2026 earthquakes, the affected areas need coordination, not improvisation. The priority is trapped people, medical care and drinking water.',
  },
  'help.dinero_body': {
    es: 'El dinero a organizaciones verificadas es casi siempre más útil que el envío de objetos: llega antes, se adapta a la necesidad real y sostiene la economía local. Los envíos en especie no solicitados suelen colapsar la logística.',
    en: 'Money to verified organizations is almost always more useful than sending goods: it arrives faster, adapts to real needs and supports the local economy. Unsolicited in-kind shipments tend to clog logistics.',
  },
  'help.fases_body': {
    es: 'Emergencia (días), estabilización (semanas) y reconstrucción (meses). Cada fase necesita cosas distintas; ayudar bien significa ayudar en el momento adecuado.',
    en: 'Emergency (days), stabilization (weeks) and reconstruction (months). Each phase needs different things; helping well means helping at the right time.',
  },
  'help.funciona_body': {
    es: 'Funcionan los canales verificados, la telemedicina para crónicos y salud mental, y la coordinación entre voluntarios. No funcionan los envíos sin coordinar ni la información sin verificar.',
    en: 'What works: verified channels, telemedicine for chronic and mental health care, and coordination among volunteers. What does not: uncoordinated shipments and unverified information.',
  },
  'help.canarias_body': {
    es: 'Canarias tiene un vínculo histórico y humano con Venezuela. Eso nos da redes, idioma común y credibilidad para canalizar ayuda de forma responsable.',
    en: 'The Canary Islands have a historical and human bond with Venezuela. That gives us networks, a shared language and credibility to channel help responsibly.',
  },
  'help.actuar_body': {
    es: 'Dona a canales verificados, regístrate como voluntario si tienes competencias útiles, y difunde información contrastada. Evita reenviar rumores.',
    en: 'Donate to verified channels, register as a volunteer if you have useful skills, and share verified information. Avoid forwarding rumors.',
  },
  'help.cooperacion_body': {
    es: 'Buscamos cooperación con instituciones, ONG y empresas que puedan aportar logística, financiación o servicios. Si representas a una organización, escríbenos.',
    en: 'We seek cooperation with institutions, NGOs and companies that can provide logistics, funding or services. If you represent an organization, get in touch.',
  },

  // Subpage: Respuesta digital
  'dr.ecosistema_body': {
    es: 'Alertas móviles, satélites, IA que mapea daños y plataformas ciudadanas forman un ecosistema digital que opera en paralelo al rescate físico.',
    en: 'Mobile alerts, satellites, AI mapping damage and citizen platforms form a digital ecosystem operating in parallel with the physical rescue.',
  },
  'dr.grietas_body': {
    es: 'Las grietas: información fragmentada y duplicada, exclusión lingüística, rumores, cortes de red y falta de continuidad sanitaria.',
    en: 'The gaps: fragmented and duplicated information, linguistic exclusion, rumors, network outages and lack of healthcare continuity.',
  },
  'dr.ia_body': {
    es: 'La IA agéntica puede unir identidades dispersas, traducir en tiempo real, verificar fuentes y derivar casos sin duplicar el trabajo de los voluntarios.',
    en: 'Agentic AI can unify scattered identities, translate in real time, verify sources and route cases without duplicating volunteers\' work.',
  },

  // Subpage: Novedades
  'news.intro': {
    es: 'Actualizaciones sobre la iniciativa, los médicos voluntarios y la respuesta digital.',
    en: 'Updates about the initiative, volunteer doctors and the digital response.',
  },
  'news.item1_title': { es: 'Lanzamos el mapa en vivo de Venezuela', en: 'We launched the live Venezuela map' },
  'news.item1_body': {
    es: 'Ya puedes consultar reportes, personas desaparecidas y noticias actualizadas desde la página de situación en vivo.',
    en: 'You can now check reports, missing persons and updated news from the live situation page.',
  },
  'news.item2_title': { es: 'Pre-registro de médicos voluntarios abierto', en: 'Volunteer doctor pre-registration open' },
  'news.item2_body': {
    es: 'Los profesionales sanitarios cualificados pueden pre-coordinarse para teleconsulta, salud mental y crónicos.',
    en: 'Qualified health professionals can pre-coordinate for teleconsultation, mental health and chronic care.',
  },
  'news.item3_title': { es: 'Buscamos aliados y soporte legal', en: 'We are looking for partners and legal support' },
  'news.item3_body': {
    es: 'Iniciativa ciudadana en formación: damos la bienvenida a organizaciones y a una entidad jurídica que actúe como soporte.',
    en: 'Citizen initiative in formation: we welcome organizations and a legal entity to act as carrier.',
  },

  // Subpage: Contactos
  'contactos.intro': {
    es: 'Teléfonos de emergencia, entidades en la zona y canales de donación verificados.',
    en: 'Emergency phones, entities in the area and verified donation channels.',
  },
  'contactos.solo_vzla': { es: '(solo desde Venezuela)', en: '(from Venezuela only)' },
  'contactos.em_911': { es: 'Emergencias generales', en: 'General emergencies' },
  'contactos.em_171': { es: 'Emergencias / Protección Civil', en: 'Emergencies / Civil Protection' },
  'contactos.em_sismo': { es: 'Línea de atención sísmica', en: 'Earthquake support line' },

  // Venezuela dashboard
  'dash.title': { es: '🇻🇪 Terremoto de Venezuela', en: '🇻🇪 Venezuela Earthquake' },
  'dash.subtitle_prefix': { es: 'Resumen de la situación · 24 de junio de 2026 · Datos de', en: 'Situation summary · 24 June 2026 · Data from' },
  'dash.last_update': { es: 'Última actualización:', en: 'Last update:' },
  'dash.more_resources': { es: 'Más recursos:', en: 'More resources:' },
  'dash.missing_title': { es: 'Buscar o reportar personas desaparecidas', en: 'Search or report missing people' },
  'dash.missing_desc': {
    es: 'Plataforma ciudadana externa e independiente · desaparecidosterremotovenezuela.com — no gestiona dinero ni donaciones.',
    en: 'External, independent citizen platform · desaparecidosterremotovenezuela.com — it does not handle money or donations.',
  },
  'dash.open': { es: 'Abrir', en: 'Open' },
  'dash.source': { es: 'Fuente de datos:', en: 'Data source:' },
  'dash.source_note': {
    es: 'Datos de SOS Venezuela 2026, Apoyo Venezuela y ApoyoVzla — iniciativas ciudadanas sin afiliación política.',
    en: 'Data from SOS Venezuela 2026, Apoyo Venezuela and ApoyoVzla — citizen initiatives with no political affiliation.',
  },
  'dash.verify_note': {
    es: 'Los datos son reportados por la comunidad. Por favor, verifica antes de actuar. En caso de peligro vital: 911.',
    en: 'Data is community-reported. Please verify before acting. In case of life-threatening danger: 911.',
  },

  // Stats cards
  'stats.missing': { es: 'Desaparecidos', en: 'Missing' },
  'stats.found': { es: 'Encontrados', en: 'Found' },
  'stats.reports': { es: 'Reportes', en: 'Reports' },
  'stats.critical': { es: 'Críticos', en: 'Critical' },

  // News feed
  'news.recent': { es: 'Noticias recientes', en: 'Recent news' },
  'news.loading': { es: 'Cargando noticias…', en: 'Loading news…' },

  // Person search
  'persons.title': { es: 'Buscar personas', en: 'Search people' },
  'persons.placeholder': { es: 'Escribe un nombre (mín. 2 caracteres)…', en: 'Type a name (min. 2 characters)…' },
  'persons.all_states': { es: 'Todos los estados', en: 'All states' },
  'persons.missing': { es: 'Desaparecido', en: 'Missing' },
  'persons.found': { es: 'Encontrado', en: 'Found' },
  'persons.searching': { es: 'Buscando…', en: 'Searching…' },
  'persons.no_results': { es: 'Sin resultados para', en: 'No results for' },

  // Damage validation
  'damage.title': { es: 'Validación de daños estructurales', en: 'Structural damage validation' },
  'damage.loading': { es: 'Cargando datos…', en: 'Loading data…' },
  'damage.habitable': { es: 'Habitable:', en: 'Habitable:' },
  'damage.inhabitable': { es: 'No habitable:', en: 'Uninhabitable:' },
  'damage.validations': { es: 'Validaciones:', en: 'Validations:' },
  'damage.photos': { es: 'foto(s)', en: 'photo(s)' },

  // Reports list
  'reports.recent': { es: 'Reportes recientes', en: 'Recent reports' },
  'reports.category': { es: 'Categoría', en: 'Category' },
  'reports.all_categories': { es: 'Todas las categorías', en: 'All categories' },
  'reports.severity': { es: 'Gravedad', en: 'Severity' },
  'reports.all': { es: 'Todas', en: 'All' },
  'reports.loading': { es: 'Cargando reportes…', en: 'Loading reports…' },
  'reports.verification': { es: 'Verificación:', en: 'Verification:' },
  'reports.more': { es: 'reportes más', en: 'more reports' },

  // Categories
  'cat.collapsed_building': { es: 'Derrumbado', en: 'Collapsed' },
  'cat.damaged_building': { es: 'Dañado', en: 'Damaged' },
  'cat.gas_leak': { es: 'Fuga de gas', en: 'Gas leak' },
  'cat.blocked_road': { es: 'Vía bloqueada', en: 'Blocked road' },
  'cat.trapped_person': { es: 'Persona atrapada', en: 'Trapped person' },
  'cat.collection_center': { es: 'Centro de acopio', en: 'Collection center' },

  // Severities
  'sev.rojo': { es: 'Crítico', en: 'Critical' },
  'sev.naranja': { es: 'Alto', en: 'High' },
  'sev.amarillo': { es: 'Medio', en: 'Medium' },
  'sev.verde': { es: 'Bajo', en: 'Low' },

  // Map
  'map.error': { es: 'No se pudo cargar el mapa', en: 'The map could not be loaded' },
  'map.open_source': { es: 'Abrir fuente', en: 'Open source' },
  'map.src_sos': { es: 'Reportes · SOS Venezuela 2026', en: 'Reports · SOS Venezuela 2026' },
  'map.src_apoyo': { es: 'Daño estructural · Apoyo Venezuela', en: 'Structural damage · Apoyo Venezuela' },

  // News widget
  'news.title': { es: 'Últimas noticias', en: 'Latest news' },
  'news.subtitle': { es: 'Prensa local sobre el terremoto', en: 'Local press on the earthquake' },
  'news.empty': { es: 'No hay noticias por ahora.', en: 'No news right now.' },
  'news.disclaimer': { es: 'Noticias de prensa externa. Verifica antes de difundir.', en: 'External press news. Verify before sharing.' },
  'news.more': { es: 'Ver más noticias', en: 'See more news' },

  // Apoyo Venezuela tab
  'tabs.overview': { es: 'Resumen general', en: 'Overview' },
  'tabs.zones': { es: 'Zonas afectadas', en: 'Affected zones' },
  'tabs.activity': { es: 'Actividad reciente', en: 'Recent activity' },

  // Unified feed timeline
  'feed.loading': { es: 'Cargando actividad…', en: 'Loading activity…' },
  'feed.empty': { es: 'No hay actividad reciente todavía.', en: 'No recent activity yet.' },
  'feed.open': { es: 'Ver fuente', en: 'View source' },
  'feed.type.reporte': { es: 'Reporte', en: 'Report' },
  'feed.type.zona': { es: 'Zona', en: 'Zone' },
  'feed.type.pedido': { es: 'Pedido', en: 'Request' },
  'apoyo.credit': { es: 'Datos de Apoyo Venezuela', en: 'Data from Apoyo Venezuela' },
  'apoyo.summary_title': { es: 'Resumen de zonas afectadas', en: 'Affected zones summary' },
  'apoyo.total_zonas': { es: 'Zonas registradas', en: 'Registered zones' },
  'apoyo.pedidos_abiertos': { es: 'Pedidos abiertos', en: 'Open requests' },
  'apoyo.pedidos_totales': { es: 'Pedidos totales', en: 'Total requests' },
  'apoyo.by_status': { es: 'Por estado estructural', en: 'By structural status' },
  'apoyo.by_category': { es: 'Pedidos por categoría', en: 'Requests by category' },
  'apoyo.by_urgency': { es: 'Pedidos por urgencia', en: 'Requests by urgency' },
  'apoyo.loading': { es: 'Cargando datos…', en: 'Loading data…' },
  'apoyo.error': { es: 'No se pudieron cargar los datos de Apoyo Venezuela.', en: 'Could not load Apoyo Venezuela data.' },
  'apoyo.zones_list': { es: 'Listado de zonas', en: 'Zones list' },
  'apoyo.no_zones': { es: 'No hay zonas que coincidan con los filtros.', en: 'No zones match the filters.' },
  'apoyo.load_more': { es: 'Cargar más', en: 'Load more' },
  'apoyo.loading_more': { es: 'Cargando…', en: 'Loading…' },
  'apoyo.trapped_yes': { es: 'Personas atrapadas', en: 'People trapped' },
  'apoyo.trapped_unknown': { es: 'Atrapados: se desconoce', en: 'Trapped: unknown' },
  'apoyo.pending': { es: 'pendientes', en: 'pending' },
  'apoyo.urgent': { es: 'urgentes', en: 'urgent' },
  'apoyo.requests': { es: 'Pedidos', en: 'Requests' },
  'apoyo.filter_estado': { es: 'Estado', en: 'State' },
  'apoyo.filter_status': { es: 'Daño estructural', en: 'Structural status' },
  'apoyo.filter_categoria': { es: 'Categoría', en: 'Category' },
  'apoyo.filter_urgencia': { es: 'Urgencia', en: 'Urgency' },
  'apoyo.filter_all': { es: 'Todos', en: 'All' },
  'apoyo.solo_pedidos': { es: 'Solo con pedidos', en: 'With requests only' },
  'apoyo.map_title': { es: 'Mapa de zonas afectadas', en: 'Affected zones map' },
  'apoyo.map_error': { es: 'No se pudo cargar el mapa', en: 'The map could not be loaded' },

  // Apoyo status labels
  'apoyo.status.derrumbe': { es: 'Derrumbe', en: 'Collapse' },
  'apoyo.status.dano_grave': { es: 'Daño grave', en: 'Severe damage' },
  'apoyo.status.dano_parcial': { es: 'Daño parcial', en: 'Partial damage' },
  'apoyo.status.desconocido': { es: 'Desconocido', en: 'Unknown' },
  'apoyo.status.estable': { es: 'Estable', en: 'Stable' },

  // Apoyo category labels
  'apoyo.cat.rescate': { es: 'Rescate', en: 'Rescue' },
  'apoyo.cat.agua': { es: 'Agua', en: 'Water' },
  'apoyo.cat.alimentos': { es: 'Alimentos', en: 'Food' },
  'apoyo.cat.medicinas': { es: 'Medicinas', en: 'Medicine' },
  'apoyo.cat.refugio': { es: 'Refugio', en: 'Shelter' },
  'apoyo.cat.ropa': { es: 'Ropa', en: 'Clothing' },
  'apoyo.cat.higiene': { es: 'Higiene', en: 'Hygiene' },
  'apoyo.cat.energia': { es: 'Energía', en: 'Energy' },
  'apoyo.cat.herramientas': { es: 'Herramientas', en: 'Tools' },
  'apoyo.cat.transporte': { es: 'Transporte', en: 'Transport' },
  'apoyo.cat.comunicacion': { es: 'Comunicación', en: 'Communication' },
  'apoyo.cat.otro': { es: 'Otro', en: 'Other' },

  // Apoyo urgency labels
  'apoyo.urg.alta': { es: 'Alta', en: 'High' },
  'apoyo.urg.media': { es: 'Media', en: 'Medium' },
  'apoyo.urg.baja': { es: 'Baja', en: 'Low' },

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
  const ctx = useContext(LangContext);
  // Fallback when called outside a LangProvider (e.g. page component above the provider)
  return ctx || { lang: 'es', setLang: () => {} };
}

export function t(key, lang) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.es || key;
}