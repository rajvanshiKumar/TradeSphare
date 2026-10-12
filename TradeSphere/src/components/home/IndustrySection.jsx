import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import Image from '../common/Image';
import useProducts from '../../hooks/useProducts';

// Industries highlighted on the homepage, mapped to existing catalogue categories.
const INDUSTRIES = [
  { name: 'Textiles & Apparel', category: 'fashion-apparel' },
  { name: 'Electronics', category: 'electronics' },
  { name: 'Industrial Machinery', category: 'machinery' },
  { name: 'Packaging', category: 'packaging' },
  { name: 'Home Goods', category: 'home-kitchen' },
  { name: 'Beauty Products', category: 'beauty-personal-care' },
];

/** Industry categories as horizontal image banners. */
export default function IndustrySection() {
  const { categories, products, loading } = useProducts();
  const industries = useMemo(() => INDUSTRIES.map((industry) => {
    const category = categories.find((item) => item.slug === industry.category);
    return category ? { ...industry, category, count: products.filter((product) => product.category === category.slug && product.status === 'Active').length } : null;
  }).filter(Boolean), [categories, products]);

  if (loading || !industries.length) return null;
  return (
    <Section id="home-industries" tone="white" eyebrow="Industries" title="Built for every" accent="supply chain." description="Jump straight into the industries international buyers source from most.">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name}>
            <Link to={`/categories/${industry.category.slug}`} className="group flex items-center gap-4 rounded-[1.25rem] bg-ivory p-3 pr-5 ring-1 ring-navy-900/[0.06] transition-all hover:bg-white hover:shadow-lift">
              <span className="size-20 shrink-0 overflow-hidden rounded-2xl bg-navy-900">
                <Image photo={industry.category.photo} illustration={industry.category.illustration} width={160} height={160} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold text-navy-900">{industry.name}</span>
                <span className="text-sm text-muted">{industry.count} wholesale {industry.count === 1 ? 'listing' : 'listings'}</span>
              </span>
              <ArrowUpRight className="size-5 shrink-0 text-navy-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
