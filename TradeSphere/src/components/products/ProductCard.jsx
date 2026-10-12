import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Heart, Layers, ShoppingCart, Zap } from 'lucide-react';
import Image from '../common/Image';
import Button from '../common/Button';
import Rating from '../common/Rating';
import VerificationBadge from '../common/VerificationBadge';
import BuyNowButton from './BuyNowButton';
import useCart from '../../hooks/useCart';
import { defaultVariant } from '../../hooks/useBuyNow';
import useProducts from '../../hooks/useProducts';
import useWishlist from '../../hooks/useWishlist';
import useCurrency from '../../hooks/useCurrency';
import { getPriceRange } from '../../utils/calculateTotals';
import { formatNumber } from '../../utils/formatCurrency';
import { quantityLabel } from '../../utils/units';

export function PriceRange({ product, className = '', size = 'md' }) {
  const { money } = useCurrency();
  const { min, max } = getPriceRange(product);
  return (
    <p className={className}>
      <span className={`font-display font-extrabold tracking-[-0.02em] text-navy-900 ${size === 'lg' ? 'text-2xl' : 'text-[1.15rem]'}`}>{min === max ? money(min) : `${money(min)} – ${money(max)}`}</span>
      <span className="text-[0.8125rem] text-muted"> / {product.unit}</span>
    </p>
  );
}

export function WishlistButton({ product, className = '' }) {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(product.id);
  return (
    <button
      type="button" onClick={() => toggleWishlist(product)} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from saved products` : `Save ${product.name}`}
      title={saved ? 'Remove from saved products' : 'Save product'}
      className={`inline-flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-navy-900/5 backdrop-blur transition-all hover:scale-105 hover:ring-brand-500 ${saved ? 'text-brand-600' : 'text-navy-900'} ${className}`}
    >
      <Heart className={`size-[1.05rem] ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
    </button>
  );
}

/** One status chip at most, so cards stay calm: ready-to-ship, then wholesale deal, then new. */
function StatusChip({ product }) {
  const chip = product.readyToShip
    ? { icon: Zap, label: 'Ready to ship', className: 'bg-navy-900/85 text-white' }
    : product.deal ? { icon: Layers, label: 'Volume pricing', className: 'bg-brand-500 text-navy-900' }
      : product.isNew ? { icon: null, label: 'New listing', className: 'bg-white/90 text-navy-900' } : null;
  if (!chip) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide backdrop-blur ${chip.className}`}>
      {chip.icon ? <chip.icon className="size-3" aria-hidden="true" /> : null}{chip.label}
    </span>
  );
}

/** Wholesale product tile used across the catalogue. `layout` is "grid" or "list". */
export default function ProductCard({ product, layout = 'grid' }) {
  const { getCompany } = useProducts();
  const { addToCart } = useCart();
  const { money } = useCurrency();
  const company = getCompany(product.companyId);
  const href = `/products/${product.slug}`;
  const isList = layout === 'list';
  const outOfStock = product.stock <= 0;
  const bestTier = [...(product.priceTiers ?? [])].sort((a, b) => b.minQty - a.minQty)[0];

  return (
    <article className={`group relative flex overflow-hidden rounded-[1.25rem] bg-white shadow-card ring-1 ring-navy-900/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-500/40 ${isList ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      <div className={`relative shrink-0 overflow-hidden bg-ivory ${isList ? 'sm:w-64' : ''}`}>
        <Link to={href} tabIndex={-1} aria-hidden="true" className="block">
          <Image
            photo={product.photo} illustration={product.illustration} width={560} height={560} alt=""
            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${isList ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-square'}`}
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950/45 to-transparent opacity-80" aria-hidden="true" />
        <div className="absolute left-3 top-3"><StatusChip product={product} /></div>
        <WishlistButton product={product} className="absolute right-3 top-3" />
        {company ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-navy-900 backdrop-blur">
            <span aria-hidden="true">{company.flag}</span><span className="sr-only">Origin: </span>{company.country}
          </span>
        ) : null}
        {outOfStock ? <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-navy-950/80 py-1.5 text-center text-xs font-semibold text-white">Out of stock</span> : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {company ? (
          <p className="flex min-w-0 items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
            <Link to={`/suppliers/${company.slug}`} className="truncate hover:text-brand-600">{company.name}</Link>
            <VerificationBadge company={company} iconOnly />
          </p>
        ) : null}
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.7em] font-display text-[1rem] font-bold leading-snug tracking-[-0.01em] text-navy-900">
          <Link to={href} className="transition-colors hover:text-brand-600">{product.name}</Link>
        </h3>
        {isList ? <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.summary}</p> : null}

        <PriceRange product={product} className="mt-3" />
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-ivory px-2.5 py-1 text-xs font-semibold text-navy-900 ring-1 ring-navy-900/[0.08]">MOQ {quantityLabel(product.moq, product.unit)}</span>
          {bestTier && bestTier.minQty > product.moq ? <span className="text-xs text-muted">{money(bestTier.price)} at {formatNumber(bestTier.minQty)}+</span> : null}
        </div>
        <Rating value={product.rating} count={product.reviewCount} className="mt-2.5" />

        <div className={`mt-auto pt-4 ${isList ? 'sm:max-w-md' : ''}`}>
          <div className="flex gap-2">
            <BuyNowButton product={product} className="min-w-0 flex-1 !px-3" />
            <Button variant="outline" size="sm" icon={ShoppingCart} disabled={outOfStock} onClick={() => addToCart(product, product.moq, defaultVariant(product))} aria-label={`Add ${product.name} to cart`} title="Add to cart" className="shrink-0 !px-3">
              <span className={isList ? '' : 'sr-only'}>Add to cart</span>
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-navy-900/[0.06] pt-3 text-[0.8125rem] font-semibold">
            <Link to={href} className="inline-flex items-center gap-1 text-navy-900 hover:text-brand-600">View product <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
            <Link to={`/rfq?product=${product.id}`} aria-label={`Request a quote for ${product.name}`} className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700"><FileText className="size-3.5" aria-hidden="true" />Request quote</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
