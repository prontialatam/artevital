import type { Language, SectionId } from './site';

type ServiceText = { eyebrow: string; title: string; accent: string; body: string; alt: string; action: string };
type Dictionary = {
  nav: Record<SectionId, string>;
  menu: string;
  closeMenu: string;
  skip: string;
  booking: string;
  bookingMessage: string;
  hero: { eyebrow: string; first: string; firstAccent: string; second: string; secondAccent: string; body: string; imageAlt: string; imageNote: string };
  services: Record<'peinados' | 'maquillaje' | 'faciales', ServiceText>;
  casa: { eyebrow: string; title: string; accent: string; body: string; note: string; imageAlt: string };
  about: { eyebrow: string; title: string; titleAccent: string; body: string; storyToggle: string; storyTitle: string; storyParagraphs: string[]; instagramAction: string; closeStory: string };
  reviews: { eyebrow: string; title: string; accent: string; body: string; action: string };
  contact: { eyebrow: string; title: string; accent: string; body: string; location: string; findUs: string; phoneLabel: string; hoursLabel: string; directions: string; note: string; action: string; instagram: string };
  footer: { tagline: string; explore: string; follow: string; rights: string; provisional: string };
};

export const translations: Record<Language, Dictionary> = {
  es: {
    nav: { inicio: 'Inicio', peinados: 'Peinados', maquillaje: 'Maquillaje', faciales: 'Faciales', 'casa-de-campo': 'Casa de Campo', nosotros: 'Sobre mí', opiniones: 'Opiniones', contacto: 'Contacto' },
    menu: 'Abrir menú', closeMenu: 'Cerrar menú', skip: 'Saltar al contenido', booking: 'Reservar cita', bookingMessage: 'Hola, me gustaría reservar una cita en ArteVital.',
    hero: {
      eyebrow: 'Belleza · Armonía · Bienestar', first: 'Tu belleza,', firstAccent: 'belleza', second: 'nuestra inspiración', secondAccent: 'inspiración',
      body: 'Experiencias de belleza personalizadas para realzar tu estilo y hacerte sentir increíble, cada día.',
      imageAlt: 'Retrato editorial de belleza usado como imagen provisional',
      imageNote: 'Un espacio para dedicarte tiempo',
    },
    services: {
      peinados: { eyebrow: 'Peinados', title: 'Estilo que realza tu esencia', accent: 'tu esencia', body: 'Peinados pensados para acompañarte en cada ocasión, con atención al detalle y un acabado elegante.', alt: 'Imagen editorial provisional de un peinado recogido', action: 'Consultar peinados' },
      maquillaje: { eyebrow: 'Maquillaje', title: 'Realza tu belleza natural', accent: 'belleza natural', body: 'Maquillaje pensado para expresar tu personalidad y acompañar tus momentos especiales.', alt: 'Imagen editorial provisional de aplicación de maquillaje', action: 'Consultar maquillaje' },
      faciales: { eyebrow: 'Faciales', title: 'Una piel luminosa, un cuidado especial', accent: 'piel luminosa', body: 'Descubre nuestras opciones de cuidado facial y encuentra la experiencia adecuada para ti.', alt: 'Imagen editorial provisional de una experiencia facial', action: 'Consultar faciales' },
    },
    casa: { eyebrow: 'La Romana · República Dominicana', title: 'Casa de Campo', accent: 'Campo', body: 'Un rincón extraordinario de La Romana que inspira momentos de belleza, calma y celebración.', note: 'Inspiración boho chic · sección en preparación', imageAlt: 'Terraza boho chic frente al mar con palmeras al atardecer' },
    about: { eyebrow: 'Sobre mí', title: 'Soy Jina Morales', titleAccent: 'Jina Morales', body: 'Detrás de ArteVital hay una visión de la belleza que combina arte, estética y atención personalizada.', storyToggle: 'Leer mi presentación', storyTitle: 'La belleza es mi inspiración', storyParagraphs: [
      'Detrás de ArteVital Studio and Esthetic hay una visión de la belleza que combina arte, estética y atención personalizada.',
      'Soy Jina Morales, el nombre detrás de ArteVital, un espacio de belleza y estética en La Romana, República Dominicana, donde el maquillaje profesional, los peinados y los cuidados estéticos se encuentran para crear experiencias pensadas para cada persona.',
      'En ArteVital creemos que la verdadera belleza comienza cuando te sientes bien contigo misma. Por eso, nuestra propuesta va más allá de un tratamiento o un cambio de imagen: buscamos ofrecer una experiencia en la que cada detalle contribuya a realzar tu belleza natural.',
      'Nuestra filosofía se inspira en tres pilares: belleza, armonía y bienestar. Desde un maquillaje para una ocasión especial hasta un peinado o un tratamiento estético, queremos que cada visita sea un momento dedicado exclusivamente a ti.',
      'ArteVital nace de una identidad que entiende la estética como una forma de expresión personal, donde cada rostro, cada estilo y cada ocasión merecen una atención especial.',
      'Te invito a descubrir ArteVital, un espacio creado para que disfrutes del cuidado personal y encuentres nuevas formas de expresar tu belleza.',
      'Jina Morales · ArteVital Studio and Esthetic · La Romana, República Dominicana. Tu belleza, nuestra inspiración.',
    ], instagramAction: 'Instagram de Jina', closeStory: 'Cerrar presentación' },
    reviews: { eyebrow: 'Opiniones', title: 'Lo que dicen nuestras clientas', accent: 'nuestras clientas', body: 'Consulta las opiniones públicas de ArteVital en su perfil de Google.', action: 'Visitar Perfil Google' },
    contact: { eyebrow: 'Contacto', title: 'Estamos aquí para ti', accent: 'para ti', body: 'Reserva tu cita o escríbenos para conocer las opciones disponibles.', location: 'La Romana, República Dominicana', findUs: 'Encuéntranos en', phoneLabel: 'Teléfono', hoursLabel: 'Horario', directions: 'Cómo llegar', note: 'Escríbenos por WhatsApp para coordinar tu cita.', action: 'Contactar por WhatsApp', instagram: 'Escribir por Instagram' },
    footer: { tagline: 'Belleza, armonía y bienestar en La Romana.', explore: 'Explorar', follow: 'Síguenos', rights: 'Todos los derechos reservados.', provisional: 'Fotografías editoriales de servicios en revisión.' },
  },
  en: {
    nav: { inicio: 'Home', peinados: 'Hairstyling', maquillaje: 'Makeup', faciales: 'Facials', 'casa-de-campo': 'Casa de Campo', nosotros: 'About me', opiniones: 'Reviews', contacto: 'Contact' },
    menu: 'Open menu', closeMenu: 'Close menu', skip: 'Skip to content', booking: 'Book appointment', bookingMessage: 'Hello, I would like to book an appointment at ArteVital.',
    hero: {
      eyebrow: 'Beauty · Harmony · Wellness', first: 'Your beauty,', firstAccent: 'beauty', second: 'our inspiration', secondAccent: 'inspiration',
      body: 'Personalized beauty experiences to enhance your style and help you feel your best, every day.',
      imageAlt: 'Editorial beauty portrait used as a temporary image',
      imageNote: 'A space to make time for yourself',
    },
    services: {
      peinados: { eyebrow: 'Hairstyling', title: 'Style that brings out your essence', accent: 'your essence', body: 'Hairstyles designed for every occasion, with thoughtful details and an elegant finish.', alt: 'Temporary editorial image of an updo hairstyle', action: 'Ask about hairstyling' },
      maquillaje: { eyebrow: 'Makeup', title: 'Enhance your natural beauty', accent: 'natural beauty', body: 'Makeup designed to express your personality and complement your special moments.', alt: 'Temporary editorial image of makeup application', action: 'Ask about makeup' },
      faciales: { eyebrow: 'Facials', title: 'Radiant skin, thoughtful care', accent: 'Radiant skin', body: 'Discover our facial care options and find the experience that suits you.', alt: 'Temporary editorial image of a facial experience', action: 'Ask about facials' },
    },
    casa: { eyebrow: 'La Romana · Dominican Republic', title: 'Casa de Campo', accent: 'Campo', body: 'An extraordinary corner of La Romana that inspires beauty, calm and celebration.', note: 'Boho chic inspiration · section in progress', imageAlt: 'Boho chic seaside terrace with palm trees at sunset' },
    about: { eyebrow: 'About me', title: "I'm Jina Morales", titleAccent: 'Jina Morales', body: 'Behind ArteVital is a vision of beauty that brings together artistry, aesthetics and personal attention.', storyToggle: 'Read my story', storyTitle: 'Beauty is my inspiration', storyParagraphs: [
      'Behind ArteVital Studio and Esthetic is a vision of beauty that brings together artistry, aesthetics and personal attention.',
      'I am Jina Morales, the person behind ArteVital, a beauty and aesthetics studio in La Romana, Dominican Republic, where professional makeup, hairstyling and aesthetic care come together in experiences designed for each person.',
      'At ArteVital, we believe true beauty begins when you feel good about yourself. Our approach goes beyond a treatment or a new look: we want every detail of your experience to bring out your natural beauty.',
      'Our philosophy is inspired by three pillars: beauty, harmony and wellness. From makeup for a special occasion to a hairstyle or an aesthetic treatment, we want every visit to be a moment dedicated entirely to you.',
      'ArteVital was born from an identity that sees aesthetics as a form of personal expression, where every face, style and occasion deserves thoughtful attention.',
      'I invite you to discover ArteVital, a space created for you to enjoy personal care and find new ways to express your beauty.',
      'Jina Morales · ArteVital Studio and Esthetic · La Romana, Dominican Republic. Your beauty, our inspiration.',
    ], instagramAction: "Jina's Instagram", closeStory: 'Close story' },
    reviews: { eyebrow: 'Reviews', title: 'What our clients say', accent: 'our clients', body: 'Read public reviews of ArteVital on its Google profile.', action: 'Visit Google profile' },
    contact: { eyebrow: 'Contact', title: "We're here for you", accent: 'for you', body: 'Book an appointment or message us to learn about the available options.', location: 'La Romana, Dominican Republic', findUs: 'Find us in', phoneLabel: 'Phone', hoursLabel: 'Hours', directions: 'Get directions', note: 'Message us on WhatsApp to arrange your appointment.', action: 'Message us on WhatsApp', instagram: 'Message us on Instagram' },
    footer: { tagline: 'Beauty, harmony and wellness in La Romana.', explore: 'Explore', follow: 'Follow us', rights: 'All rights reserved.', provisional: 'Editorial service photography under review.' },
  },
};
