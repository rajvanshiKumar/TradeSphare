import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Globe,
  LayoutGrid,
} from "lucide-react";
import Button from "../common/Button";
import Image from "../common/Image";
import Skeleton from "../common/Skeleton";
import SearchForm from "../forms/SearchForm";
import useProducts from "../../hooks/useProducts";
import useCurrency from "../../hooks/useCurrency";
import { getPriceRange } from "../../utils/calculateTotals";
import { quantityLabel } from "../../utils/units";

/**
 * Decorative leaf sprig drawn in SVG (no image request). Used in corners of homepage
 * sections. `className` positions and sizes it; it is hidden from assistive technology.
 */
export function BotanicalAccent({ className = "", opacity = 0.18 }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`ts-botanical ${className}`}
      style={{ opacity }}
    >
      <path
        d="M112 252C108 186 104 120 120 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[
        [
          "M112 210C80 204 52 184 40 150c34 2 62 22 72 60Z",
          "M114 196c30-10 56-32 64-66-32 6-58 30-64 66Z",
        ],
        [
          "M110 150C82 140 62 116 58 84c30 6 52 32 52 66Z",
          "M114 136c26-12 46-36 50-66-28 8-48 34-50 66Z",
        ],
        [
          "M112 92c-22-12-36-34-36-60 24 8 38 32 36 60Z",
          "M116 80c18-12 30-32 30-56-20 8-30 30-30 56Z",
        ],
      ]
        .flat()
        .map((d) => (
          <path key={d} d={d} fill="currentColor" />
        ))}
    </svg>
  );
}

/** Figures counted from the live catalogue, so nothing here is invented. */
export function useCatalogueFigures() {
  const { products, companies, categories, loading } = useProducts();
  return useMemo(() => {
    const active = companies.filter(
      (company) => company.status !== "Suspended",
    );
    return {
      loading,
      items: [
        {
          icon: Boxes,
          value: products.filter((product) => product.status === "Active")
            .length,
          label: "Wholesale listings",
        },
        { icon: Building2, value: active.length, label: "Supplier companies" },
        {
          icon: Globe,
          value: new Set(active.map((company) => company.country)).size,
          label: "Sourcing countries",
        },
        {
          icon: LayoutGrid,
          value: categories.length,
          label: "Product categories",
        },
      ],
    };
  }, [products, companies, categories, loading]);
}

/**
 * Homepage hero on a sage background: editorial copy and search on the left, and on the
 * right three image panels arranged like an art-directed spread (category, category and a
 * real featured product), echoing a three-panel composition at desktop width.
 */
export default function HeroSection() {
  const { products, categories, getCompany, loading } = useProducts();
  const { money } = useCurrency();
  const figures = useCatalogueFigures();
  const tiles = categories.filter((category) => category.photo).slice(0, 2);
  const spotlight =
    products.find(
      (product) => product.status === "Active" && product.deal && product.photo,
    ) ?? products.find((product) => product.status === "Active");
  const spotlightCompany = spotlight ? getCompany(spotlight.companyId) : null;

  return (
    <section
      aria-labelledby="hero-title"
      className="ts-sage relative isolate overflow-hidden text-navy-900"
    >
      <BotanicalAccent
        className="-left-10 top-10 -z-10 hidden w-56 -rotate-12 lg:block"
        opacity={0.16}
      />
      <BotanicalAccent
        className="-right-6 -bottom-16 -z-10 w-64 rotate-[18deg]"
        opacity={0.14}
      />

      <div className="ts-container grid grid-cols-1 items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pb-24 xl:gap-20">
        {/* Copy */}
        <div className="ts-page-enter">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900 ring-1 ring-navy-900/10 backdrop-blur">
            <span
              className="size-1.5 rounded-full bg-navy-900"
              aria-hidden="true"
            />
            International B2B Marketplace
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.75rem] font-extrabold !leading-[1.02] tracking-[-0.045em] sm:text-6xl xl:text-[4.75rem]"
          >
            Source Better.
            <br />
            <span className="font-medium text-navy-700">Trade Smarter.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-900/75">
            Compare wholesale prices, minimum orders and suppliers across
            international markets, then request quotes or order in bulk.
          </p>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Button
              to="/products"
              size="lg"
              variant="navy"
              iconRight={ArrowRight}
            >
              Explore Products
            </Button>
            <Button
              to="/suppliers"
              size="lg"
              variant="outline"
              className="!border-navy-900/25 !bg-white/60 backdrop-blur hover:!bg-white"
            >
              Find Suppliers
            </Button>
          </div>

          <div className="mt-8 max-w-xl">
            <SearchForm variant="hero" idPrefix="hero-search" />
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {figures.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/45 px-4 py-3 ring-1 ring-navy-900/10 backdrop-blur-sm"
              >
                <dd className="font-display text-2xl font-extrabold tracking-[-0.03em] text-navy-900">
                  {figures.loading ? (
                    <Skeleton className="h-7 w-10 opacity-40" />
                  ) : (
                    item.value
                  )}
                </dd>
                <dt className="mt-0.5 text-xs leading-snug text-navy-900/70">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Three-panel editorial composition */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          {loading ? (
            <Skeleton className="aspect-[5/4] w-full rounded-[2rem] opacity-40" />
          ) : (
            <div className="grid grid-cols-[1fr_1.15fr_1fr] items-start gap-3 sm:gap-5">
              {tiles[0] ? (
                <Link
                  to={`/categories/${tiles[0].slug}`}
                  className="group relative col-span-1 mt-10 block overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-black/5"
                >
                  <Image
                    photo={tiles[0].photo}
                    illustration={tiles[0].illustration}
                    width={420}
                    height={640}
                    eager
                    alt={`${tiles[0].name} category`}
                    className="aspect-[3/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 px-3 py-2 text-xs font-bold text-navy-900 backdrop-blur sm:text-sm">
                    {tiles[0].name}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {spotlight ? (
                <Link
                  to={`/products/${spotlight.slug}`}
                  className="group relative col-span-1 block overflow-hidden rounded-[1.75rem] bg-white p-2.5 shadow-pop ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 sm:p-3"
                >
                  <span className="block overflow-hidden rounded-[1.25rem] bg-[#e7efe0]">
                    <Image
                      photo={spotlight.photo}
                      illustration={spotlight.illustration}
                      width={480}
                      height={560}
                      eager
                      alt={spotlight.name}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </span>
                  <span className="block px-1.5 pb-1.5 pt-3">
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand-600 sm:text-[0.6875rem]">
                      Featured listing
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs font-bold leading-snug text-navy-900 sm:text-sm">
                      {spotlight.name}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center justify-between gap-1">
                      <span className="font-display text-sm font-extrabold text-navy-900 sm:text-base">
                        {money(getPriceRange(spotlight).min)}
                      </span>
                      <span
                        className="inline-flex size-8 items-center justify-center rounded-full bg-navy-900 text-white"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="size-4" />
                      </span>
                    </span>
                    <span className="mt-1 block text-[0.6875rem] text-muted">
                      MOQ {quantityLabel(spotlight.moq, spotlight.unit)}
                      {spotlightCompany ? ` · ${spotlightCompany.country}` : ""}
                    </span>
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {tiles[1] ? (
                <Link
                  to={`/categories/${tiles[1].slug}`}
                  className="group relative col-span-1 mt-20 block overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-black/5"
                >
                  <Image
                    photo={tiles[1].photo}
                    illustration={tiles[1].illustration}
                    width={420}
                    height={640}
                    eager
                    alt={`${tiles[1].name} category`}
                    className="aspect-[3/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 px-3 py-2 text-xs font-bold text-navy-900 backdrop-blur sm:text-sm">
                    {tiles[1].name}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Soft curve into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 rounded-t-[2.5rem] bg-ivory sm:h-12"
        aria-hidden="true"
      />
    </section>
  );
}
