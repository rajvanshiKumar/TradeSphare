import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Building2, Globe, LayoutGrid } from 'lucide-react';
import Button from '../common/Button';
import Image from '../common/Image';
import Skeleton from '../common/Skeleton';
import SearchForm from '../forms/SearchForm';
import useProducts from '../../hooks/useProducts';
import useCurrency from '../../hooks/useCurrency';
import { getPriceRange } from '../../utils/calculateTotals';
import { quantityLabel } from '../../utils/units';

/** Figures counted from the live catalogue, so nothing here is invented. */
export function useCatalogueFigures() {
  const { products, companies, categories, loading } = useProducts();
  return useMemo(() => {
    const active = companies.filter((company) => company.status !== 'Suspended');
    return {
      loading,
      items: [
        { icon: Boxes, value: products.filter((product) => product.status === 'Active').length, label: 'Wholesale listings' },
        { icon: Building2, value: active.length, label: 'Supplier companies' },
        { icon: Globe, value: new Set(active.map((company) => company.country)).size, label: 'Sourcing countries' },
        { icon: LayoutGrid, value: categories.length, label: 'Product categories' },
      ],
    };
  }, [products, companies, categories, loading]);
}

export default function HeroSection() {
  const { products, categories, getCompany } = useProducts();
  const { money } = useCurrency();
  const figures = useCatalogueFigures();
  const tiles = categories.filter((category) => category.photo).slice(0, 3);
  const spotlight = products.find((product) => product.status === 'Active' && product.deal && product.photo) ?? products[0];
  const spotlightCompany = spotlight ? getCompany(spotlight.companyId) : null;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_10%,rgb(201_166_107/0.22),transparent_60%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgb(43_54_80/0.9),transparent_70%)]" aria-hidden="true" />
      <img src="/images/hero-trade.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 -z-10 hidden h-[140%] max-w-none -translate-y-1/2 opacity-[0.12] lg:block" />

      <div className="ts-container grid grid-cols-1 items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="ts-page-enter">
          <p className="ts-eyebrow !text-brand-500">International B2B Marketplace</p>
          <h1 id="hero-title" className="mt-5 text-[2.6rem] font-extrabold !leading-[1.02] tracking-[-0.04em] !text-white sm:text-6xl xl:text-[4.6rem]">
            Source Globally.<br />
            <span className="ts-serif font-normal text-brand-500">Trade Confidently.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Connect with manufacturers, verified suppliers, and wholesale buyers across international markets.
          </p>
          <p className="mt-2 max-w-xl text-xs text-white/45">Suppliers show a “Documents reviewed” badge only after a TradeSphere admin has reviewed their business documents.</p>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Button to="/products" size="lg" iconRight={ArrowRight}>Explore Wholesale Products</Button>
            <Button to="/suppliers" size="lg" variant="glass">Find Trusted Suppliers</Button>
          </div>

          <div className="mt-8 max-w-xl"><SearchForm variant="hero" idPrefix="hero-search" /></div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
            {figures.items.map((item) => (
              <div key={item.label}>
                <dd className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white">{figures.loading ? <Skeleton className="h-8 w-12 opacity-20" /> : item.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-white/55">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Editorial image collage built from the catalogue's own category photography */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4" style={{ aspectRatio: '1 / 1.02' }}>
            {tiles.map((category, index) => (
              <Link
                key={category.id} to={`/categories/${category.slug}`}
                className={`group relative overflow-hidden rounded-[1.5rem] bg-navy-800 ring-1 ring-white/10 ${index === 0 ? 'col-span-3 row-span-6' : 'col-span-2 row-span-3'}`}
              >
                <Image photo={category.photo} illustration={category.illustration} width={index === 0 ? 720 : 480} height={index === 0 ? 1000 : 480} eager alt={`${category.name} category`} className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-4 pt-10 text-sm font-semibold text-white">{category.name}</span>
              </Link>
            ))}
          </div>
          {spotlight ? (
            <Link to={`/products/${spotlight.slug}`} className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 text-ink shadow-pop ring-1 ring-black/5 backdrop-blur transition-transform hover:-translate-y-1 sm:left-auto sm:right-[-1rem] sm:w-80 motion-safe:[animation:ts-float_7s_ease-in-out_infinite]">
              <Image photo={spotlight.photo} illustration={spotlight.illustration} width={120} height={120} alt="" className="size-16 shrink-0 rounded-xl bg-ivory object-cover" />
              <span className="min-w-0">
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-600">Volume pricing</span>
                <span className="block truncate text-sm font-bold text-navy-900">{spotlight.name}</span>
                <span className="block text-xs text-muted">From {money(getPriceRange(spotlight).min)} · MOQ {quantityLabel(spotlight.moq, spotlight.unit)}{spotlightCompany ? ` · ${spotlightCompany.country}` : ''}</span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
