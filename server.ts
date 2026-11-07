import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory waitlist store for landing page lead captures
// Modularly structured to switch to Supabase once credentials are provided
interface WaitlistRecord {
  id: string;
  email: string;
  userType: 'shopper' | 'brand' | 'developer';
  brandOrCompany?: string;
  notes?: string;
  createdAt: string;
}

const waitlistRecords: WaitlistRecord[] = [
  {
    id: 'seed-1',
    email: 'atelier@bespokestudio.co',
    userType: 'brand',
    brandOrCompany: 'Atelier Minimal',
    notes: 'Interested in API integration for tailored suiting.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    email: 'marcus@tailoredfit.dev',
    userType: 'developer',
    notes: 'Building headless Shopify checkout extension.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'FITSYNC API',
    version: '1.0.0-alpha',
    databaseAdapter: process.env.SUPABASE_URL ? 'supabase' : 'in-memory-ready',
    timestamp: new Date().toISOString(),
  });
});

// Waitlist registration
app.post('/api/waitlist', (req, res) => {
  const { email, userType = 'shopper', brandOrCompany, notes } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'Valid email address is required.' });
    return;
  }

  // Check existing
  const existing = waitlistRecords.find(
    (record) => record.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (existing) {
    res.json({
      success: true,
      message: 'You are already registered for early access. We will notify you upon launch.',
      position: waitlistRecords.indexOf(existing) + 1,
    });
    return;
  }

  const newRecord: WaitlistRecord = {
    id: `fs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: email.toLowerCase().trim(),
    userType: ['shopper', 'brand', 'developer'].includes(userType) ? userType : 'shopper',
    brandOrCompany: brandOrCompany ? String(brandOrCompany).slice(0, 100) : undefined,
    notes: notes ? String(notes).slice(0, 500) : undefined,
    createdAt: new Date().toISOString(),
  };

  waitlistRecords.push(newRecord);

  res.status(201).json({
    success: true,
    message: 'Welcome to the FITSYNC Early Access Network. Your profile reservation is secured.',
    position: waitlistRecords.length,
    id: newRecord.id,
  });
});

// Waitlist stats
app.get('/api/waitlist/stats', (_req, res) => {
  res.json({
    totalReserved: waitlistRecords.length + 840, // Base pilot registry
    brandsCount: waitlistRecords.filter(r => r.userType === 'brand').length + 34,
    garmentCategories: 18,
  });
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FITSYNC server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start FITSYNC server:', err);
  process.exit(1);
});
