// Admin account configuration, kept apart from buyer and supplier registration.
//
// The admin password is NOT in the source code. Generate a hash of it with
//   npm run admin:hash
// and put the printed line in a `.env.local` file (see .env.example). Only that salted
// hash is bundled into the site.
//
// Front-end-only limitation: the hash ships to every visitor's browser and the admin
// session lives in browser storage, so this protects against accidental access only.
// It cannot keep a determined person out. Real admin protection needs a server.

export const ADMIN_EMAIL = 'hello.techvunex@gmail.com';
export const ADMIN_PASSWORD_HASH = (import.meta.env.VITE_ADMIN_PASSWORD_HASH ?? '').trim();
export const isAdminConfigured = ADMIN_PASSWORD_HASH.startsWith('pbkdf2$');

export const ADMIN_PROFILE = {
  id: 'TS-ADMIN',
  name: 'TradeSphere Admin',
  email: ADMIN_EMAIL,
  role: 'admin',
  company: 'TradeSphere',
  companyId: null,
  status: 'Active',
  notificationPrefs: { orders: true, quotes: true, messages: true },
};
