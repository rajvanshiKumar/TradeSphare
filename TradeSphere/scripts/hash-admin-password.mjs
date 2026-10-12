// Creates the admin password hash for VITE_ADMIN_PASSWORD_HASH.
// Usage: npm run admin:hash   (you will be asked for the password; it is not echoed or saved)
// This is a one-off command-line helper, not a server. Same PBKDF2 settings as src/utils/passwords.js.
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import readline from 'node:readline';

const ITERATIONS = 210000;

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.stdoutMuted = true;
    rl._writeToOutput = (text) => { if (!rl.stdoutMuted || text.includes(question)) rl.output.write(text); };
    rl.question(question, (answer) => { rl.close(); process.stdout.write('\n'); resolve(answer); });
  });
}

const password = process.argv[2] ?? (await ask('Admin password: '));
if (!password || password.length < 10) {
  console.error('Use an admin password of at least 10 characters.');
  process.exit(1);
}
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
console.log('\nAdd this line to .env.local (do not commit it), then restart `npm run dev` or rebuild:\n');
console.log(`VITE_ADMIN_PASSWORD_HASH=pbkdf2$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`);
