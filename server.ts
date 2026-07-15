import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { SERVICE_PACKAGES, ADDON_FEATURES } from './src/servicesData';
import { InquiryFormData, InquiryResult } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

const INQUIRIES_FILE = path.join(process.cwd(), 'inquiries.json');
const CONTACTS_FILE = path.join(process.cwd(), 'contacts.json');

// Helper to load inquiries
async function loadInquiries(): Promise<InquiryResult[]> {
  try {
    const data = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to save inquiries
async function saveInquiries(inquiries: InquiryResult[]): Promise<void> {
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

// Helper to load contacts
async function loadContacts(): Promise<any[]> {
  try {
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to save contacts
async function saveContacts(contacts: any[]): Promise<void> {
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
}

// API: Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Jméno, e-mail a dotaz jsou povinné údaje.' });
    }

    const newContact = {
      id: Math.random().toString(36).substring(2, 11),
      submittedAt: new Date().toISOString(),
      name,
      email,
      subject: subject || 'Dotaz z kontaktního formuláře',
      message,
      status: 'new'
    };

    const currentContacts = await loadContacts();
    currentContacts.unshift(newContact);
    await saveContacts(currentContacts);

    res.status(201).json({ success: true, contact: newContact });
  } catch (err: any) {
    console.error('Contact submission error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing. Please add it in the Secrets / Settings panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Helper to calculate exact indicative price server-side for integrity
function calculatePrice(formData: InquiryFormData): number {
  const selectedPkg = SERVICE_PACKAGES.find(p => p.id === formData.serviceId);
  let price = selectedPkg ? selectedPkg.price : 0;

  // Addons
  formData.selectedFeatures.forEach(featureId => {
    const addon = ADDON_FEATURES.find(f => f.id === featureId);
    if (addon) {
      price += addon.price;
    }
  });

  return price;
}

// API: Get previous inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const list = await loadInquiries();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// API: Submit inquiry + Generate AI proposal
app.post('/api/inquire', async (req, res) => {
  try {
    const formData = req.body as InquiryFormData;
    if (!formData || !formData.name || !formData.email || !formData.serviceId) {
      return res.status(400).json({ error: 'Jméno, e-mail a výběr balíčku jsou povinné údaje.' });
    }

    const calculatedPrice = calculatePrice(formData);
    const selectedPkg = SERVICE_PACKAGES.find(p => p.id === formData.serviceId);
    const packageName = selectedPkg ? selectedPkg.name : 'Vlastní řešení';

    // Prepare feature details for the AI prompt
    const featureNames = formData.selectedFeatures
      .map(fid => ADDON_FEATURES.find(f => f.id === fid)?.name || fid)
      .join(', ');

    const domainStatusText = 
      formData.hasDomain === 'yes' ? 'Má vlastní doménu' :
      formData.hasDomain === 'no' ? 'Nemá doménu (bude potřebovat registrovat)' :
      'Potřebuje pomoci s výběrem domény';

    // Generate custom proposal via Gemini
    let proposalText = '';
    try {
      const ai = getGeminiClient();
      
      const prompt = `Jsi vstřícný, profesionální a technicky zdatný projektový konzultant pro webové studio "BuduMítWeb" (https://budumitweb.cz).
Studio se specializuje na zakázkovou low-code tvorbu moderních, optimalizovaných webů pomocí technologií Vite, React a Tailwind a jejich nasazení na Netlify. Díky tomu weby běží bleskově, bezpečně a hosting je pro klienta zcela zdarma.
Všechny projekty, schválení, smlouvy i platby záloh řešíme výhradně ONLINE (žádné osobní schůzky nejsou potřeba).
Standardně si klient zaregistruje zdarma sám účet Netlify a dále doménu dle vlastního výběru (s nastavením mu samozřejmě zdarma online pomůžeme).
Nikdy nepiš ani neslibuj klientovi, že si bude moci sám cokoliv upravovat na webu (web je dodán kompletní a o veškeré změny se postaráme v rámci údržby za 600 Kč/hod nebo měsíční správy za 890 Kč/měsíc).
Vždy zdůrazňujeme, že v ceně každé naší služby je **2x zapracování připomínek k návrhu**.

Vytvoř detailní, personalizovanou, strukturovanou cenovou a projektovou nabídku pro klienta na základě těchto údajů:
- Jméno klienta: ${formData.name}
- Vybraný balíček: ${packageName} (základní cena: ${selectedPkg?.price || 0} Kč)
- Stav domény: ${domainStatusText}
- Téma / zaměření webu: ${formData.webTopic || 'Nespecifikováno'}
- Představa o designu a stylu: ${formData.designIdea || 'Nespecifikováno (navrhneme nejlepší moderní vzhled)'}
- Požadované doplňkové funkce a položky (Další požadované funkce): ${featureNames || 'Žádné doplňkové funkce (standardní rozsah balíčku)'}
- Vlastní poznámka/detail: ${formData.customNote || 'Žádná další poznámka'}
- Jak se o nás dozvěděl/a: ${formData.referral || 'Nespecifikováno'}
- Celková orientační kalkulovaná cena: **${calculatedPrice.toLocaleString('cs-CZ')} Kč**

Napiš nabídku přímo tomuto klientovi. Měla by obsahovat:
1. **Osobní poděkování a přivítání** od týmu BuduMítWeb.
2. **Rekapitulaci poptávky**: Stručný rozbor toho, co poptává, jaký design si představuje, a jakým způsobem to vyřešíme (vyzdvihni výhody bleskového načítání z Netlify a nulové poplatky za hosting). Připomeň, že klient si sám zakládá Netlify a kupuje doménu dle našeho návodu, což mu zajistí 100% nezávislost.
3. **Konkrétní návrh řešení**:
   - Jak pojmeme styl/design podle jeho představy.
   - Návrh struktury podstránek (např. u ${formData.serviceId === 'landing' ? 'jednostránkového webu' : 'standardního 5stránkového webu'}).
   - Jak implementujeme vybrané funkce s ohledem na rychlost a efektivitu.
   - Pokud klient nemá doménu, navrhni 2-3 zajímavé a volné nápady na název domény podle jeho jména či oboru. Pokud doménu má, popiš, že ji jednoduše nasměrujeme na Netlify.
4. **Harmonogram a další kroky**:
   - Spuštění návrhu grafiky a funkcí do 2 týdnů od podpisu online smlouvy o dílo a úhrady zálohy (50 %).
   - Připomenutí, že v ceně jsou 2 kola kompletního zapracování připomínek.
   - Jak budeme postupovat (1. Vstupní online upřesnění, 2. Návrh struktury do 2 týdnů, 3. Samotná tvorba a design, 4. Spuštění na Netlify).
5. **Cenové shrnutí**: Přehledná tabulka položek (Základní balíček + doplňkové funkce) s celkovou cenou **${calculatedPrice.toLocaleString('cs-CZ')} Kč**. Zmiň možnost spolehlivé údržby (Hodinová správa za 600 Kč/hod nebo Měsíční péče za 890 Kč/měs.).
6. **Jasná výzva k akci (CTA)**: Co má klient udělat, pokud s nabídkou souhlasí (odpovědět na e-mail a zahájíme podpis Smlouvy o dílo online).

Nabídku napiš v krásném a přehledném Markdown formátu. Buď profesionální, lidský, optimistický a srozumitelný. Celá nabídka musí být v češtině.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt
      });

      proposalText = response.text || 'Nepodařilo se vygenerovat nabídku.';
    } catch (aiErr: any) {
      console.error('AI generation failed:', aiErr);
      proposalText = `### Děkujeme za vaši poptávku, ${formData.name}!

Omlouváme se, ale náš systém pro okamžitý výpočet podrobné nabídky je momentálně přetížen. Vaši poptávku jsme však úspěšně zaregistrovali v našem systému.

**Zde je rekapitulace vaší kalkulace:**
- **Služba:** ${packageName}
- **Doména:** ${domainStatusText}
- **Jak jste se o nás dozvěděl/a:** ${formData.referral || 'Nespecifikováno'}
- **Celková orientační cena:** **${calculatedPrice.toLocaleString('cs-CZ')} Kč**

Ozveme se vám online na e-mail **${formData.email}** nebo telefon **${formData.phone || 'neuveden'}** do 24 hodin s kompletním návrhem a detailním rozpisem.

*Tým BuduMítWeb*`;
    }

    const newInquiry: InquiryResult = {
      id: Math.random().toString(36).substring(2, 11),
      submittedAt: new Date().toISOString(),
      formData,
      calculatedPrice,
      proposalText,
      status: 'new'
    };

    const currentInquiries = await loadInquiries();
    currentInquiries.unshift(newInquiry);
    await saveInquiries(currentInquiries);

    res.status(201).json(newInquiry);
  } catch (err: any) {
    console.error('Inquiry submission error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Setup Vite or serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BuduMítWeb backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
