import { BadgeCheck, FileText, Globe, ShieldAlert } from 'lucide-react';
import Logo from '../components/common/Logo';

const POINTS = [
  { icon: Globe, text: 'Wholesale listings from suppliers across multiple countries' },
  { icon: FileText, text: 'Request quotations with quantity, specification and target price' },
  { icon: BadgeCheck, text: 'Supplier document reviews shown honestly on every profile' },
];

/** Split-screen frame shared by the sign-in, register and password pages. */
export default function AuthShell({ title, subtitle, children, wide = false, above = null }) {
  return (
    <div className="bg-ivory">
      <div className="ts-container py-8 sm:py-14">
        <div className={`mx-auto grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-navy-900/[0.06] lg:grid-cols-[1fr_1.2fr] ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>
          <aside className="ts-navy-texture relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex">
            <img src="/images/hero-trade.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -right-48 -top-28 w-[44rem] max-w-none opacity-[0.12]" />
            <Logo light />
            <div className="relative">
              <p className="font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Source globally.<br /><span className="ts-serif font-normal text-brand-500">Trade confidently.</span></p>
              <ul className="mt-8 space-y-4">
                {POINTS.map((point) => (
                  <li key={point.text} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-400"><point.icon className="size-4" aria-hidden="true" /></span>
                    <span className="pt-1.5">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative flex gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/60">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
              Prototype sign-in: accounts are stored in this browser only and are not protected by a server.
            </p>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-6 lg:hidden"><Logo /></div>
            {above}
            <h1 className="text-[1.9rem] font-extrabold tracking-[-0.03em] sm:text-[2.2rem]">{title}</h1>
            {subtitle ? <p className="mb-7 mt-2 text-muted">{subtitle}</p> : <div className="mb-7" />}
            {children}
            <p className="mt-7 flex gap-2 rounded-xl bg-ivory p-3 text-xs text-muted lg:hidden">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
              Prototype sign-in: accounts are stored in this browser only and are not protected by a server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
