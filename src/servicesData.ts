import { ServicePackage, MaintenanceService } from './types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'landing',
    name: 'Vizitka / Jednostránkový web',
    price: 4900,
    subtitle: 'Ideální pro start, živnostníky a jednoduché prezentace',
    description: 'Moderní jednostránkový web (Landing Page), který rychle představí vás nebo vaši službu a přivede zákazníky.',
    suitability: 'Freelanceři, řemeslníci, osobní profily, prezentace jednoho produktu či služby, restaurace.',
    includes: [
      'Moderní jednostránkový design na míru',
      'Plná optimalizace pro mobily a tablety (responzivita)',
      'Přehledný kontakt s mapkou a odkazy na sociální sítě',
      'Základní optimalizace pro vyhledávače (SEO)',
      'Nasazení na superrychlé Netlify hosting s SSL certifikátem (web běží zdarma a bezpečně)',
      '2x zapracování připomínek k grafickému návrhu v ceně'
    ]
  },
  {
    id: 'standard',
    name: 'Standardní firemní web',
    price: 9900,
    subtitle: 'Plnohodnotná prezentace vaší firmy s více podstránkami',
    description: 'Strukturovaný více-stránkový web pro kompletní představení vašich služeb, referencí a ceníků.',
    suitability: 'Menší a střední firmy, lékařské ordinace, advokátní kanceláře, stavební firmy, penziony.',
    includes: [
      'Strukturovaný web o rozsahu až 5 podstránek (např. Úvod, Služby, Ceník, Reference, Kontakt)',
      'Interaktivní kontaktní nebo poptávkový formulář',
      'Přehledná fotogalerie vašich prací, produktů nebo týmu',
      'Základní nastavení stránek (titulky a popisky pro vyhledávače)',
      'Vložení kódu pro měření návštěvnosti (pokud máte vlastní kód)',
      'Nasazení na Netlify s doživotním SSL certifikátem zdarma',
      '2x zapracování připomínek k návrhu v ceně'
    ]
  },
  {
    id: 'advanced',
    name: 'Pokročilý web s katalogem či blogem',
    price: 14900,
    subtitle: 'Pro náročnější projekty vyžadující správu obsahu či katalog',
    description: 'Pokročilé řešení s dynamickým katalogem, blogem nebo komplexnější architekturou a designem.',
    suitability: 'Rostoucí firmy s širší nabídkou, realitní makléři, autoškoly, zájmové a informační portály.',
    includes: [
      'Neomezený počet podstránek dle potřeby',
      'Přehledný katalog služeb nebo produktů (bez přímého prodeje)',
      'Redakční systém pro správu blogu, novinek nebo článků',
      'Dynamické animace a prémiové vizuální efekty',
      'Napojení na doplňkové systémy (rezervace, newslettery, chatovací widgety)',
      'Základní registrace webu do vyhledávače Google',
      'Nasazení na Netlify s SSL certifikátem zdarma',
      '2x zapracování připomínek k návrhu v ceně'
    ]
  }
];

export const MAINTENANCE_SERVICES: MaintenanceService[] = [
  {
    id: 'hourly',
    name: 'Hodinová správa (Ad-hoc úpravy)',
    price: 600,
    billing: 'za hodinu práce',
    description: 'Pro nepravidelné úpravy, změny obsahu nebo konzultace pouze tehdy, když to potřebujete.',
    includes: [
      'Úpravy textů, aktualizace otevírací doby nebo cen',
      'Přidání nových fotek, projektů nebo referencí',
      'Technické konzultace a drobná vylepšení webu',
      'Fakturace po minutách (minimální účtovaná jednotka je 30 minut)'
    ]
  },
  {
    id: 'monthly',
    name: 'Měsíční péče a správa',
    price: 890,
    billing: 'za měsíc',
    description: 'Pravidelný dohled, bleskové úpravy a jistota, že váš web je stále bezpečný, aktuální a plně funkční.',
    includes: [
      'Až 2 hodiny práce na úpravách v ceně každý měsíc',
      'Pravidelný monitoring funkčnosti a dostupnosti webu',
      'E-mailová podpora pro vaše dotazy',
      'Pravidelné zálohování a kontrola zabezpečení'
    ]
  }
];

export interface AddonFeature {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const ADDON_FEATURES: AddonFeature[] = [
  { id: 'gallery', name: 'Rozšířená fotogalerie / Portfolio', price: 800, description: 'Interaktivní, kategorizovaná galerie pro vaše práce.' },
  { id: 'form', name: 'Komplexní poptávkový formulář na míru', price: 900, description: 'Vícekrokový formulář s větvením a výpočty.' },
  { id: 'blog', name: 'Blog / Sekce aktualit', price: 2500, description: 'Možnost psát články a novinky pro zlepšení SEO.' },
  { id: 'multilang', name: 'Vícejazyčnost (druhá jazyková mutace)', price: 3500, description: 'Kompletní překlad a technické nastavení pro další jazyk.' },
  { id: 'booking', name: 'Rezervační systém (např. Calendly)', price: 1800, description: 'Zákazníci si sami rezervují termíny schůzek přímo na webu.' },
  { id: 'newsletter', name: 'Propojení na e-mailing (Mailerlite/Integromat)', price: 1200, description: 'Sběr kontaktů do databáze a automatické uvítací e-maily.' }
];

export const PORTFOLIO_REFERENCES = [
  {
    title: 'Magnetic Memories',
    url: 'https://magneticmemories.cz/',
    description: 'E-shop s fotomagnety. Obsahuje interaktivní editor, kompletní objednávku a integrovaný výběr dopravce.',
    category: 'E-shop',
    tech: 'React, Editor, Objednávka, Dopravce'
  },
  {
    title: 'Zahrady LBC',
    url: 'https://zahrady-lbc.cz/',
    description: 'Firma realizuje údržbu zeleně. Navíc má web cenovou kalkulačku vyvinutou na míru.',
    category: 'Řemesla / Služby',
    tech: 'Low-code, Netlify, Poptávkový formulář'
  },
  {
    title: 'Kateřina Hrubá',
    url: 'https://katerinahruba.netlify.app/',
    description: 'Masážní salon. Jemný tematický design webu s integrovaným rezervačním systémem a přehlednou administrací pro správu termínů.',
    category: 'Salon / Rezervace',
    tech: 'Vite, Rezervační systém, Administrace'
  }
];
