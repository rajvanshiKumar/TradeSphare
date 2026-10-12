import { Link } from 'react-router-dom';
import { FileText, PackageCheck, Scale, Search } from 'lucide-react';
import Section from './Section';

const STEPS = [
  { icon: Search, title: 'Discover', text: 'Search products and suppliers, filter by MOQ, price, country and business type.', to: '/products', cta: 'Explore products' },
  { icon: Scale, title: 'Compare', text: 'Review company profiles, verification status, lead times and tiered prices side by side.', to: '/suppliers', cta: 'Find suppliers' },
  { icon: FileText, title: 'Request quotes', text: 'Send one detailed buying request with quantity, specification and target price.', to: '/rfq', cta: 'Post a request' },
  { icon: PackageCheck, title: 'Order in bulk', text: 'Buy Now or check out a multi-supplier cart with shipping and payment options.', to: '/cart', cta: 'View cart' },
];

/** The international sourcing process in four visual steps. */
export default function HowItWorks() {
  return (
    <Section id="home-how" tone="plain" eyebrow="How sourcing works" title="From first search to" accent="bulk order." align="center">
      <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <span className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent lg:block" aria-hidden="true" />
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative flex flex-col items-center rounded-[1.5rem] bg-white px-6 pb-7 pt-8 text-center shadow-card ring-1 ring-navy-900/[0.05]">
            <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-navy-900 text-brand-400 ring-8 ring-ivory">
              <step.icon className="size-6" aria-hidden="true" />
              <span className="absolute -right-1 -top-1 inline-flex size-6 items-center justify-center rounded-full bg-brand-500 font-display text-xs font-extrabold text-navy-900">{index + 1}</span>
            </span>
            <h3 className="mt-5 font-display text-xl font-bold"><span className="sr-only">Step {index + 1}: </span>{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            <Link to={step.to} className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700">{step.cta} →</Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
