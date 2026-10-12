import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown } from 'lucide-react';
import Section from './Section';
import Image from '../common/Image';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import PriceTiers from '../products/PriceTiers';
import BuyNowButton from '../products/BuyNowButton';
import useProducts from '../../hooks/useProducts';
import { getPriceRange } from '../../utils/calculateTotals';
import { quantityLabel } from '../../utils/units';

const STEPS = [
  ['MOQ', 'The minimum order quantity. Every listing starts here.'],
  ['5 × MOQ', 'Around 8% lower unit price on most listings.'],
  ['20 × MOQ', 'Around 15% lower: the best published tier.'],
];

/** Bulk purchasing and MOQ highlights: how tiers work, with live deal listings. */
export default function WholesaleDeals() {
  const { products, loading } = useProducts();
  const deals = useMemo(() => products.filter((product) => product.status === 'Active' && product.deal).slice(0, 3), [products]);
  if (!loading && !deals.length) return null;

  return (
    <Section id="home-deals" tone="navy" eyebrow="Bulk purchasing" title="Order more," accent="pay less per unit." description="Prices fall in published steps as your quantity grows. All prices in INR, excluding shipping and duties." linkTo="/products?deal=1" linkLabel="All volume deals">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_2fr]">
        <ol className="space-y-3">
          {STEPS.map(([label, text], index) => (
            <li key={label} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <span className="font-serif text-3xl leading-none text-brand-500" aria-hidden="true">{index + 1}</span>
              <span><span className="block font-display text-lg font-bold text-white">{label}</span><span className="text-sm text-white/65">{text}</span></span>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {loading ? Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-80 w-full rounded-3xl opacity-20" />) : deals.map((product) => {
            const { min, max } = getPriceRange(product);
            const saving = max ? Math.round((1 - min / max) * 100) : 0;
            return (
              <article key={product.id} className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-pop">
                <Link to={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-ivory">
                  <Image photo={product.photo} illustration={product.illustration} width={480} height={360} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {saving ? <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-navy-900"><TrendingDown className="size-3.5" aria-hidden="true" />Up to {saving}% lower at volume</span> : null}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 font-display text-base font-bold leading-snug"><Link to={`/products/${product.slug}`} className="hover:text-brand-600">{product.name}</Link></h3>
                  <p className="mt-1 text-xs text-muted">MOQ {quantityLabel(product.moq, product.unit)} · price per {product.unit}</p>
                  <div className="mt-4"><PriceTiers product={product} compact /></div>
                  <div className="mt-auto flex gap-2 pt-5">
                    <BuyNowButton product={product} className="flex-1" />
                    <Button to={`/rfq?product=${product.id}`} variant="outline" size="sm" className="flex-1">Quote</Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
