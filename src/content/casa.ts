import type { Language } from './site';

type Plan = { name: string; price: string; features: string[]; unit?: string };
type PriceGroup = { title: string; items: { name: string; price: string; unit?: string }[] };
type CasaContent = {
  lead: string;
  focusTitle: string;
  focus: string;
  extras: string[];
  brandsLabel: string;
  brands: string;
  contactTitle: string;
  contactLead: string;
  whatsappLabel: string;
  emailLabel: string;
  instagramLabel: string;
  plansTitle: string;
  bridalTitle: string;
  eventsTitle: string;
  bridalPlans: Plan[];
  eventPlans: Plan[];
  servicesTitle: string;
  priceGroups: PriceGroup[];
  validity: string;
  notesTitle: string;
  notesLead: string;
  notesButton: string;
  closeNotes: string;
  notes: string[];
};

export const casaContent: Record<Language, CasaContent> = {
  es: {
    lead: 'ArteVital ofrece servicios de estética y belleza para bodas y eventos sociales. Nuestro equipo profesional reúne experiencia en estética, maquillaje y peluquería para atender celebraciones de cualquier tamaño.',
    focusTitle: 'Tu momento, tu estilo',
    focus: 'Nuestro enfoque principal es el estilismo para novias: maquillaje a tu gusto, sutil y duradero, para que te sientas cómoda, única y empoderada en tu gran día.',
    extras: ['Maquillaje social para fiestas y quince años', 'Bronceado corporal y maquillaje artístico', 'Spiritual Paint y animación de eventos'],
    brandsLabel: 'Calidad profesional',
    brands: 'Trabajamos con productos de MAC, Anastasia, Laura Mercier, Fenty, NARS, Too Faced, KVD, Tarte, Huda y Natasha Denona, entre otras marcas profesionales.',
    contactTitle: 'Hablemos de tu celebración',
    contactLead: 'Cuéntanos qué imaginas para tu boda o evento y diseñaremos una experiencia a tu medida.',
    whatsappLabel: 'Escribir por WhatsApp',
    emailLabel: 'Correo electrónico',
    instagramLabel: 'Instagram',
    plansTitle: 'Planes para cada ocasión',
    bridalTitle: 'Planes de boda',
    eventsTitle: 'Otras celebraciones',
    bridalPlans: [
      { name: 'Celebrity', price: 'US$413', features: ['Prueba de maquillaje y peinado', 'Maquillaje y peinado el día de la boda', 'Un retoque después de la ceremonia'] },
      { name: 'VIP Splendor', price: 'US$531', features: ['Prueba de maquillaje y peinado', 'Maquillaje y peinado el día de la boda', 'Dos retoques después de la ceremonia', 'Airbrush'] },
    ],
    eventPlans: [
      { name: 'Dorado', price: 'US$295', features: ['Prueba de maquillaje', 'Maquillaje para el evento', 'Un retoque'] },
      { name: 'Platino', price: 'US$413', features: ['Prueba de maquillaje y peinado', 'Maquillaje y peinado para el evento', 'Un retoque'] },
      { name: 'Exclusivo', price: 'US$295', unit: 'por hora, cada servicio', features: ['Glitter Bar', 'Spiritual Paint'] },
    ],
    servicesTitle: 'Tarifas de servicios',
    priceGroups: [
      { title: 'Maquillaje', items: [
        { name: 'Prueba de maquillaje', price: 'US$94' },
        { name: 'Maquillaje para novia', price: 'US$94' },
        { name: 'Maquillaje para damas', price: 'US$94' },
        { name: 'Maquillaje airbrush', price: 'US$212' },
        { name: 'Bronceado airbrush', price: 'US$212' },
      ] },
      { title: 'Peinados', items: [
        { name: 'Blower Express', price: 'US$59' },
        { name: 'Prueba de peinado', price: 'US$94' },
        { name: 'Peinado para novia', price: 'US$94' },
        { name: 'Peinado para damas', price: 'US$94' },
      ] },
      { title: 'Retoques tras la ceremonia', items: [
        { name: 'Retoque de novia', price: 'US$59' },
        { name: 'Novia y damas (máx. 7 personas)', price: 'US$236' },
        { name: 'Retoque adicional', price: 'US$35', unit: 'por persona' },
      ] },
      { title: 'Servicios especiales', items: [
        { name: 'Body Paint', price: 'US$177', unit: 'por hora' },
        { name: 'Cobertura de tatuajes', price: 'US$35' },
        { name: 'Cobertura de cicatrices', price: 'US$35' },
      ] },
    ],
    validity: 'Precios válidos solo en República Dominicana.',
    notesTitle: 'Notas y condiciones',
    notesLead: 'Información importante para organizar tu cita o celebración.',
    notesButton: 'Notas',
    closeNotes: 'Cerrar notas',
    notes: [
      'Para reservar la fecha se requiere el pago del 50 % del total de la factura. En caso de cancelación, este pago no es reembolsable.',
      'Si eliges uno de nuestros planes, el importe debe estar saldado en su totalidad al realizar la prueba de maquillaje. Así queda reservada la fecha de la boda.',
      'Aceptamos pagos en pesos dominicanos o dólares, en efectivo o mediante transferencia.',
      'Para servicios fuera de la ciudad de La Romana, los gastos de viaje y hospedaje se añaden a la factura.',
      'Te pedimos puntualidad para tu cita.',
      'La wedding planner debe proporcionarnos el horario establecido del evento.',
      'El cabello debe estar limpio y seco. El servicio no incluye lavado.',
      'Informa a tus damas y familiares de que cualquier servicio adicional de peinado o maquillaje tiene un costo extra.',
    ],
  },
  en: {
    lead: 'ArteVital provides beauty and aesthetics services for weddings and social events. Our professional team brings together expertise in aesthetics, makeup and hairstyling for celebrations of every size.',
    focusTitle: 'Your moment, your style',
    focus: 'Bridal styling is our specialty: subtle, long-lasting makeup tailored to you, so you feel comfortable, unique and empowered on your special day.',
    extras: ['Social makeup for parties and quinceañeras', 'Body tanning and artistic makeup', 'Spiritual Paint and event entertainment'],
    brandsLabel: 'Professional quality',
    brands: 'We work with products from MAC, Anastasia, Laura Mercier, Fenty, NARS, Too Faced, KVD, Tarte, Huda and Natasha Denona, among other professional brands.',
    contactTitle: 'Let’s talk about your celebration',
    contactLead: 'Tell us what you envision for your wedding or event, and we will create an experience tailored to you.',
    whatsappLabel: 'Message us on WhatsApp',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    plansTitle: 'Plans for every occasion',
    bridalTitle: 'Wedding plans',
    eventsTitle: 'Other celebrations',
    bridalPlans: [
      { name: 'Celebrity', price: 'US$413', features: ['Makeup and hairstyling trial', 'Wedding-day makeup and hairstyling', 'One touch-up after the ceremony'] },
      { name: 'VIP Splendor', price: 'US$531', features: ['Makeup and hairstyling trial', 'Wedding-day makeup and hairstyling', 'Two touch-ups after the ceremony', 'Airbrush'] },
    ],
    eventPlans: [
      { name: 'Dorado', price: 'US$295', features: ['Makeup trial', 'Event makeup', 'One touch-up'] },
      { name: 'Platino', price: 'US$413', features: ['Makeup and hairstyling trial', 'Event makeup and hairstyling', 'One touch-up'] },
      { name: 'Exclusivo', price: 'US$295', unit: 'per hour, each service', features: ['Glitter Bar', 'Spiritual Paint'] },
    ],
    servicesTitle: 'Service prices',
    priceGroups: [
      { title: 'Makeup', items: [
        { name: 'Makeup trial', price: 'US$94' },
        { name: 'Bridal makeup', price: 'US$94' },
        { name: 'Bridesmaid makeup', price: 'US$94' },
        { name: 'Airbrush makeup', price: 'US$212' },
        { name: 'Airbrush tanning', price: 'US$212' },
      ] },
      { title: 'Hairstyling', items: [
        { name: 'Blower Express', price: 'US$59' },
        { name: 'Hairstyling trial', price: 'US$94' },
        { name: 'Bridal hairstyle', price: 'US$94' },
        { name: 'Bridesmaid hairstyle', price: 'US$94' },
      ] },
      { title: 'Post-ceremony touch-ups', items: [
        { name: 'Bride touch-up', price: 'US$59' },
        { name: 'Bride and bridesmaids (max. 7 people)', price: 'US$236' },
        { name: 'Additional touch-up', price: 'US$35', unit: 'per person' },
      ] },
      { title: 'Special services', items: [
        { name: 'Body Paint', price: 'US$177', unit: 'per hour' },
        { name: 'Tattoo coverage', price: 'US$35' },
        { name: 'Scar coverage', price: 'US$35' },
      ] },
    ],
    validity: 'Prices valid only in the Dominican Republic.',
    notesTitle: 'Notes and conditions',
    notesLead: 'Important information for planning your appointment or celebration.',
    notesButton: 'Notes',
    closeNotes: 'Close notes',
    notes: [
      'A deposit of 50% of the total invoice is required to reserve your date. This deposit is non-refundable if you cancel.',
      'If you choose one of our plans, the full balance must be paid when you attend the makeup trial. Your wedding date is then reserved.',
      'Payment is accepted in Dominican pesos or US dollars, in cash or by bank transfer.',
      'For services outside La Romana, travel and accommodation expenses are added to your invoice.',
      'Please arrive on time for your appointment.',
      'The wedding planner should provide us with the established event schedule.',
      'Hair must be clean and dry. Washing is not included.',
      'Please let your bridesmaids and family know that any additional hairstyling or makeup service has an extra charge.',
    ],
  },
};
