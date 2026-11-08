export type Language = 'es' | 'en';
export type ServiceId = 'peinados' | 'maquillaje' | 'faciales' | 'novias';
export type SectionId = 'inicio' | 'peinados' | 'maquillaje' | 'faciales' | 'novias' | 'casa-de-campo' | 'nosotros' | 'opiniones' | 'contacto';

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

export const sections: SectionId[] = ['inicio', 'peinados', 'maquillaje', 'faciales', 'novias', 'casa-de-campo', 'nosotros', 'opiniones', 'contacto'];

export const serviceImages: Record<ServiceId, { src: string; width: number; height: number; position: string }[]> = {
  peinados: [
    { src: '/images/peinados-01.webp', width: 960, height: 1280, position: '50% 35%' },
    { src: '/images/peinados-02.webp', width: 960, height: 1280, position: '50% 25%' },
    { src: '/images/peinados-03.webp', width: 960, height: 1280, position: '50% 25%' },
    { src: '/images/peinados-04.webp', width: 960, height: 1280, position: '50% 45%' },
    { src: '/images/peinados-05.webp', width: 960, height: 1280, position: '50% 30%' },
  ],
  maquillaje: [
    { src: '/images/maquillaje-01.webp', width: 1124, height: 750, position: '50% 50%' },
    { src: '/images/maquillaje-02.webp', width: 1124, height: 804, position: '50% 48%' },
  ],
  faciales: [
    { src: '/images/faciales-01.webp', width: 1600, height: 1245, position: '50% 50%' },
    { src: '/images/faciales-02.webp', width: 1024, height: 858, position: '50% 50%' },
    { src: '/images/faciales-03.webp', width: 547, height: 365, position: '50% 50%' },
  ],
  novias: [
    { src: '/images/novias-01.webp', width: 960, height: 1280, position: '50% 22%' },
    { src: '/images/novias-02.webp', width: 960, height: 1280, position: '50% 22%' },
    { src: '/images/novias-03.webp', width: 590, height: 885, position: '50% 23%' },
    { src: '/images/novias-04.webp', width: 960, height: 1280, position: '50% 25%' },
    { src: '/images/novias-05.webp', width: 1242, height: 1251, position: '50% 15%' },
    { src: '/images/novias-06.webp', width: 1242, height: 1235, position: '50% 15%' },
  ],
};
