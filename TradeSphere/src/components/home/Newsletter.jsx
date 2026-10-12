import { useState } from 'react';
import { CircleCheck, Mail } from 'lucide-react';
import Button from '../common/Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/constants';
import { isEmail } from '../../utils/validators';

/** Newsletter sign-up. The address is saved in this browser only: no email is sent. */
export default function Newsletter() {
  const [subscribers, setSubscribers] = useLocalStorage(STORAGE_KEYS.newsletter, []);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    setDone('');
    if (!value) return setError('Enter your email address.');
    if (!isEmail(value)) return setError('Enter a valid email address, for example name@company.com.');
    if (subscribers.includes(value)) return setError('This email is already subscribed.');
    setSubscribers((previous) => [...previous, value]);
    setError('');
    setEmail('');
    return setDone(value);
  };

  return (
    <section aria-labelledby="newsletter-title" className="border-t border-navy-900/[0.06] bg-white py-14">
      <div className="ts-container grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        <div>
          <p className="ts-eyebrow">Newsletter</p>
          <h2 id="newsletter-title" className="ts-section-title mt-3">Sourcing insights, <span className="ts-serif text-brand-600">monthly.</span></h2>
          <p className="mt-2 max-w-lg text-muted">Get sourcing updates and new supplier listings. Email sending is not connected yet, so your address is stored in this browser for now.</p>
        </div>
        <form onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className="ts-label">Work email</label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative shrink-0 sm:flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="newsletter-email" type="email" autoComplete="email" placeholder="name@company.com" value={email}
                onChange={(event) => { setEmail(event.target.value); if (error) setError(''); }}
                aria-invalid={error ? 'true' : undefined} aria-describedby="newsletter-message" className="ts-input pl-9"
              />
            </div>
            <Button type="submit" variant="navy">Subscribe</Button>
          </div>
          <p id="newsletter-message" aria-live="polite" className="mt-2 min-h-5 text-[0.8125rem]">
            {error ? <span className="font-medium text-danger">{error}</span> : null}
            {done ? <span className="inline-flex items-center gap-1.5 font-medium text-success"><CircleCheck className="size-4" aria-hidden="true" />{done} is subscribed.</span> : null}
          </p>
        </form>
      </div>
    </section>
  );
}
