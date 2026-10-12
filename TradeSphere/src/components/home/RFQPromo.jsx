import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, FileText } from 'lucide-react';
import Reveal from '../common/Reveal';

const POINTS = ['Describe the product, specification and packaging once', 'Set a target unit price and delivery window', 'Track the status and supplier quotes in your dashboard'];

/** Request for Quotation promotion with a working quick-start form. */
export default function RFQPromo() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) return setError('Tell us what you want to source.');
    if (quantity && (!Number.isInteger(Number(quantity)) || Number(quantity) < 1)) return setError('Quantity must be a whole number above zero.');
    const params = new URLSearchParams({ name: name.trim() });
    if (quantity) params.set('qty', quantity);
    return navigate(`/rfq?${params.toString()}`);
  };

  return (
    <section aria-labelledby="rfq-promo-title" className="bg-white py-16 sm:py-24">
      <div className="ts-container">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-ivory ring-1 ring-navy-900/[0.06] lg:grid-cols-2">
          <Reveal className="p-8 sm:p-12 lg:p-14">
            <p className="ts-eyebrow">Request for quotation</p>
            <h2 id="rfq-promo-title" className="ts-section-title mt-3">One request. <span className="ts-serif text-brand-600">Many quotes.</span></h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-muted">Can’t find the exact product? Post a buying request and let suppliers respond with pricing, lead time and sample terms.</p>
            <ul className="mt-7 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-brand-400"><Check className="size-3.5" aria-hidden="true" /></span>{point}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="relative flex items-center bg-navy-900 p-8 sm:p-12 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgb(201_166_107/0.25),transparent_60%)]" aria-hidden="true" />
            <Reveal delay={120} className="relative w-full">
              <form onSubmit={submit} noValidate className="rounded-[1.5rem] bg-white p-6 shadow-pop sm:p-8">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-navy-900"><FileText className="size-5 text-brand-600" aria-hidden="true" />Start a buying request</p>
                <label htmlFor="rfq-quick-name" className="ts-label mt-5">What are you looking for?</label>
                <input id="rfq-quick-name" className="ts-input" value={name} onChange={(event) => { setName(event.target.value); setError(''); }} placeholder="e.g. 500 ml stainless steel bottles" aria-invalid={error && !name.trim() ? 'true' : undefined} />
                <label htmlFor="rfq-quick-qty" className="ts-label mt-4">Quantity</label>
                <input id="rfq-quick-qty" className="ts-input" type="number" min="1" inputMode="numeric" value={quantity} onChange={(event) => { setQuantity(event.target.value); setError(''); }} placeholder="e.g. 2000" />
                {error ? <p role="alert" className="mt-2 text-[0.8125rem] font-medium text-danger">{error}</p> : null}
                <button type="submit" className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-navy-900 shadow-[var(--shadow-gold)] transition-all hover:-translate-y-px hover:bg-brand-400">
                  Continue to full request <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
