export type Language = 'es' | 'en';
export type SectionId = 'inicio' | 'peinados' | 'maquillaje' | 'faciales' | 'casa-de-campo' | 'nosotros' | 'opiniones' | 'contacto';

export const business = {
  name: 'ArteVital — Studio and Esthetic by Jina Morales',
  city: 'La Romana',
  country: 'República Dominicana',
  instagram: 'https://www.instagram.com/artevitallr/',
  jinaInstagram: 'https://www.instagram.com/jinamoralesmakeupartist/',
  whatsapp: '829-669-1575' as string | null,
  phoneE164: '+18296691575',
  address: 'Plaza Buena Vista, Calle Los Robles, La Romana 22000' as string | null,
  hours: null as string | null,
  email: null as string | null,
  mapsUrl: 'https://www.google.com/maps/place/Artevital/@18.4256254,-68.959113,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaf55ac23f8b7ab:0x2e37523c20843a66!8m2!3d18.4256254!4d-68.9565381!16s%2Fg%2F11y3t4mgtj?authuser=0&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D' as string | null,
  googleReviews: 'https://www.google.com/maps/place/Artevital/@18.4256254,-68.959113,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaf55ac23f8b7ab:0x2e37523c20843a66!8m2!3d18.4256254!4d-68.9565381!16s%2Fg%2F11y3t4mgtj?authuser=0&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
};

export const sections: SectionId[] = ['inicio', 'peinados', 'maquillaje', 'faciales', 'casa-de-campo', 'nosotros', 'opiniones', 'contacto'];

export const serviceImages: Record<'peinados' | 'maquillaje' | 'faciales', { src: string; width: number; height: number }[]> = {
  peinados: [
    { src: '/images/hairstyles-editorial.webp', width: 421, height: 221 },
    { src: '/images/hairstyles-chignon.jpg', width: 1448, height: 1086 },
    { src: '/images/hairstyles-waves.jpg', width: 1448, height: 1086 },
  ],
  maquillaje: [
    { src: '/images/makeup-editorial.webp', width: 406, height: 221 },
    { src: '/images/makeup-bridal.jpg', width: 1448, height: 1086 },
    { src: '/images/makeup-evening.jpg', width: 1448, height: 1086 },
  ],
  faciales: [
    { src: '/images/facials-editorial.webp', width: 421, height: 215 },
    { src: '/images/facials-mask.jpg', width: 1448, height: 1086 },
    { src: '/images/facials-glow.jpg', width: 1448, height: 1086 },
  ],
};
