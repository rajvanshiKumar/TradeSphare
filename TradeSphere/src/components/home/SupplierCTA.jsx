import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

/** Closing call to action for businesses to join TradeSphere. */
export default function SupplierCTA() {
  return (
    <section aria-labelledby="join-cta-title" className="bg-ivory py-16 sm:py-24">
      <div className="ts-container">
        <Reveal className="ts-navy-texture relative overflow-hidden rounded-[2rem] px-7 py-14 text-center text-white sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 ts-gold-rule" aria-hidden="true" />
          <p className="ts-eyebrow justify-center !text-brand-500">Join TradeSphere</p>
          <h2 id="join-cta-title" className="ts-section-title mx-auto mt-4 max-w-3xl !text-white">
            Your next supplier, or your next buyer, <span className="ts-serif text-brand-500">is one introduction away.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">Create a free business account as a buyer or a supplier. It takes about two minutes.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 xs:flex-row">
            <Button to="/register" size="lg" iconRight={ArrowRight}>Get Started</Button>
            <Button to="/register?role=supplier" size="lg" variant="glass">Become a Supplier</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
