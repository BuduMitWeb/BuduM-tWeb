import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { SERVICE_PACKAGES, ADDON_FEATURES } from './src/servicesData';
import { InquiryFormData, InquiryResult } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

const INQUIRIES_FILE = path.join(process.cwd(), 'inquiries.json');
const CONTACTS_FILE = path.join(process.cwd(), 'contacts.json');

// Helper to convert simple Markdown to clean HTML for email formatting
function markdownToHtml(md: string): string {
  if (!md) return '';
  
  // Basic escaping to keep HTML valid but avoid broken tags
  let escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headers
  escaped = escaped.replace(/^### (.*$)/gim, '<h4 style="font-family: sans-serif; color: #00B0FF; margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.1rem; border-bottom: 1px solid #eee; padding-bottom: 4px;">$1</h4>');
  escaped = escaped.replace(/^## (.*$)/gim, '<h3 style="font-family: sans-serif; color: #00B0FF; margin-top: 1.8rem; margin-bottom: 0.6rem; font-size: 1.3rem;">$1</h3>');
  escaped = escaped.replace(/^# (.*$)/gim, '<h2 style="font-family: sans-serif; color: #D400FF; margin-top: 2rem; margin-bottom: 0.8rem; font-size: 1.6rem;">$1</h2>');
  
  // Bold
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #111;">$1</strong>');
  
  // Bullet points
  escaped = escaped.replace(/^\s*-\s*(.*$)/gim, '<li style="margin-bottom: 6px; font-family: sans-serif; line-height: 1.5; color: #444;">$1</li>');
  
  // Wrap li elements in ul (simplified approach)
  escaped = escaped.replace(/(<li.*?>.*?<\/li>)/gim, '<ul style="margin-left: 1.5rem; padding-left: 0; margin-top: 0.5rem; margin-bottom: 0.5rem;">$1</ul>');
  escaped = escaped.replace(/<\/ul>\s*<ul.*?>/g, ''); // merge adjacent uls
  
  // Split into paragraphs
  const paras = escaped.split('\n\n');
  const formattedParas = paras.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li')) {
      return trimmed;
    }
    return `<p style="margin-bottom: 1rem; font-family: sans-serif; line-height: 1.6; color: #333;">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return formattedParas.join('\n');
}

// Lazy initialization of Nodemailer transporter
let mailTransporter: any = null;

async function sendEmail({ to, subject, html, text, replyTo }: { to: string; subject: string; html: string; text?: string; replyTo?: string }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || 'BUDU MÍT WEB <noreply@budumitweb.cz>';

  console.log(`[Email system] Attempting to send email to ${to} with subject "${subject}"`);

  if (!host || !user || !pass) {
    console.log('------------------------------------------------------------');
    console.log(`[SMTP SIMULATION] No SMTP credentials configured in .env.`);
    console.log(`To: ${to}`);
    console.log(`From: ${from}`);
    if (replyTo) console.log(`Reply-To: ${replyTo}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body (Text): ${text || 'N/A'}`);
    console.log(`Body (HTML length): ${html.length} chars`);
    console.log('------------------------------------------------------------');
    return { simulated: true, success: true };
  }

  try {
    if (!mailTransporter) {
      mailTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });
    }

    const info = await mailTransporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // strip tags for plain text if not provided
      html,
      replyTo,
    });

    console.log(`[Email system] Email sent successfully! MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email system] Error sending email:', error);
    throw error;
  }
}

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

    // Prepare HTML for the admin email notification
    const adminEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0F172A; font-size: 20px; font-weight: 800; margin-bottom: 20px; border-bottom: 2px solid #00B0FF; padding-bottom: 10px; margin-top: 0;">NOVÁ ZPRÁVA Z WEBU: BUDUMÍTWEB.CZ</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">👤 Jméno:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">✉️ E-mail:</td>
            <td style="padding: 8px 0; color: #00B0FF; font-weight: bold;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">🏷️ Předmět:</td>
            <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">📅 Odesláno:</td>
            <td style="padding: 8px 0; color: #475569;">${new Date().toLocaleString('cs-CZ')}</td>
          </tr>
        </table>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #D400FF; margin-top: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h4 style="margin: 0 0 10px 0; color: #0f172a;">Text dotazu:</h4>
          <p style="margin: 0; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="margin-top: 25px; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background-color: #00B0FF; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">Odpovědět e-mailem</a>
        </div>
      </div>
    `;

    // Prepare HTML for the client email confirmation
    const clientEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #0f172a; font-weight: 900; margin: 0; font-size: 24px; letter-spacing: -0.5px;">BUDU MÍT WEB</h1>
          <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Tvorba webových stránek na míru</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 25px;" />
        <h2 style="color: #0f172a; font-size: 18px; font-weight: 800; margin-top: 0; margin-bottom: 15px;">Dobrý den, pane/paní ${name},</h2>
        <p style="color: #334155; line-height: 1.6; margin-bottom: 15px;">Děkujeme za váš zájem a odeslání kontaktního formuláře na našem webu <a href="https://budumitweb.cz" style="color: #00B0FF; text-decoration: none;">budumitweb.cz</a>.</p>
        <p style="color: #334155; line-height: 1.6; margin-bottom: 20px;">Váš dotaz ohledně <strong>"${subject}"</strong> jsme úspěšně přijali a naši specialisté ho již zpracovávají. Odpovíme vám přímo na tento e-mail co nejdříve, nejpozději však do 24 hodin.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #00B0FF; margin-bottom: 25px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b; letter-spacing: 0.5px; margin-bottom: 5px;">Rekapitulace vaší zprávy:</p>
          <p style="margin: 0; font-style: italic; color: #475569; font-size: 13px;">"${message}"</p>
        </div>

        <p style="color: #334155; line-height: 1.6; margin-bottom: 20px;">Přejeme vám úspěšný den a těšíme se na případnou online spolupráci.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: left;">
          <p style="margin: 0; font-weight: bold; color: #0f172a; font-size: 14px;">Tým BUDU MÍT WEB</p>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;"><a href="mailto:budumitweb@gmail.com" style="color: #64748b; text-decoration: none;">budumitweb@gmail.com</a> | <a href="https://budumitweb.cz" style="color: #00B0FF; text-decoration: none;">www.budumitweb.cz</a></p>
        </div>
      </div>
    `;

    // Send the notification emails (catch errors internally so we don't break the response)
    const adminEmail = process.env.NOTIFICATION_EMAIL || 'budumitweb@gmail.com';
    try {
      await sendEmail({
        to: adminEmail,
        replyTo: email,
        subject: `[BuduMítWeb] Nový kontakt: ${name} - ${subject}`,
        html: adminEmailHtml
      });
    } catch (sendErr) {
      console.error('Failed to send admin contact email notification:', sendErr);
    }

    try {
      await sendEmail({
        to: email,
        subject: `Děkujeme za váš dotaz - BUDU MÍT WEB`,
        html: clientEmailHtml
      });
    } catch (sendErr) {
      console.error('Failed to send client contact confirmation email:', sendErr);
    }

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

    // Send emails
    const proposalHtml = markdownToHtml(proposalText);

    // Prepare complete HTML body for the client proposal
    const clientProposalEmailHtml = `
      <div style="font-family: sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #0f172a; font-weight: 900; margin: 0; font-size: 26px; letter-spacing: -0.5px;">BUDU MÍT WEB</h1>
          <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Projektová a cenová nabídka na míru</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 25px;" />
        
        <div style="color: #334155; font-size: 14px; line-height: 1.6;">
          ${proposalHtml}
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: left;">
          <p style="margin: 0; font-weight: bold; color: #0f172a; font-size: 14px;">Tým BUDU MÍT WEB</p>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;"><a href="mailto:budumitweb@gmail.com" style="color: #64748b; text-decoration: none;">budumitweb@gmail.com</a> | <a href="https://budumitweb.cz" style="color: #00B0FF; text-decoration: none;">www.budumitweb.cz</a></p>
        </div>
      </div>
    `;

    // Admin notification email html
    const adminProposalNotificationHtml = `
      <div style="font-family: sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0F172A; font-size: 20px; font-weight: 800; margin-bottom: 20px; border-bottom: 2px solid #D400FF; padding-bottom: 10px; margin-top: 0;">NÁVRH POPTÁVKY A CENY: ${formData.name}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 150px;">👤 Jméno:</td>
            <td style="padding: 6px 0; color: #0f172a;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">✉️ E-mail:</td>
            <td style="padding: 6px 0; color: #00B0FF; font-weight: bold;"><a href="mailto:${formData.email}">${formData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">📞 Telefon:</td>
            <td style="padding: 6px 0; color: #0f172a;">${formData.phone || 'neuveden'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">📦 Balíček:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${packageName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">🌐 Doména:</td>
            <td style="padding: 6px 0; color: #475569;">${domainStatusText}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">💡 Téma webu:</td>
            <td style="padding: 6px 0; color: #0f172a;">${formData.webTopic || 'Nespecifikováno'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">⚙️ Funkce:</td>
            <td style="padding: 6px 0; color: #0f172a;">${featureNames || 'Standardní balíček'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">💰 Kalkulovaná cena:</td>
            <td style="padding: 6px 0; color: #22c55e; font-weight: bold; font-size: 16px;">${calculatedPrice.toLocaleString('cs-CZ')} Kč</td>
          </tr>
        </table>
        
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-top: 4px solid #00E5FF; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #eee; padding-bottom: 8px;">Vygenerovaná AI nabídka odeslaná klientovi:</h3>
          <div style="color: #334155; font-size: 13px; line-height: 1.6;">
            ${proposalHtml}
          </div>
        </div>
      </div>
    `;

    const adminEmail = process.env.NOTIFICATION_EMAIL || 'budumitweb@gmail.com';
    try {
      await sendEmail({
        to: adminEmail,
        replyTo: formData.email,
        subject: `[BuduMítWeb Poptávka] ${formData.name} - ${packageName} (${calculatedPrice.toLocaleString('cs-CZ')} Kč)`,
        html: adminProposalNotificationHtml
      });
    } catch (sendErr) {
      console.error('Failed to send admin proposal email notification:', sendErr);
    }

    try {
      await sendEmail({
        to: formData.email,
        subject: `Projektová a cenová nabídka: ${formData.name} - BUDU MÍT WEB`,
        html: clientProposalEmailHtml
      });
    } catch (sendErr) {
      console.error('Failed to send client proposal email:', sendErr);
    }

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
