import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Globe,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import Button from "../common/Button";
import Skeleton from "../common/Skeleton";
import SearchForm from "../forms/SearchForm";
import useProducts from "../../hooks/useProducts";
import useCurrency from "../../hooks/useCurrency";
import { getPriceRange } from "../../utils/calculateTotals";

/* Decorative botanical accent */
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
        "M112 210C80 204 52 184 40 150c34 2 62 22 72 60Z",
        "M114 196c30-10 56-32 64-66-32 6-58 30-64 66Z",
        "M110 150C82 140 62 116 58 84c30 6 52 32 52 66Z",
        "M114 136c26-12 46-36 50-66-28 8-48 34-50 66Z",
        "M112 92c-22-12-36-34-36-60 24 8 38 32 36 60Z",
        "M116 80c18-12 30-32 30-56-20 8-30 30-30 56Z",
      ].map((path) => (
        <path key={path} d={path} fill="currentColor" />
      ))}
    </svg>
  );
}

/* Catalogue figures from actual application data */
export function useCatalogueFigures() {
  const { products, companies, categories, loading } = useProducts();

  return useMemo(() => {
    const activeCompanies = companies.filter(
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
        {
          icon: Building2,
          value: activeCompanies.length,
          label: "Supplier companies",
        },
        {
          icon: Globe,
          value: new Set(activeCompanies.map((company) => company.country))
            .size,
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

/* Eight example trading destinations */
const COUNTRIES = [
  { name: "India", flag: "🇮🇳", position: "india" },
  { name: "China", flag: "🇨🇳", position: "china" },
  { name: "USA", flag: "🇺🇸", position: "usa" },
  { name: "United Kingdom", flag: "🇬🇧", position: "uk" },
  { name: "Germany", flag: "🇩🇪", position: "germany" },
  { name: "Japan", flag: "🇯🇵", position: "japan" },
  { name: "UAE", flag: "🇦🇪", position: "uae" },
  { name: "Singapore", flag: "🇸🇬", position: "singapore" },
];

export default function HeroSection() {
  const { products, getCompany, loading } = useProducts();

  const { money } = useCurrency();
  const figures = useCatalogueFigures();

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
      {/* Background decoration */}
      <BotanicalAccent
        className="absolute -left-10 top-10 -z-10 hidden w-56 -rotate-12 lg:block"
        opacity={0.16}
      />

      <BotanicalAccent
        className="absolute -right-8 -bottom-12 -z-10 w-64 rotate-[18deg]"
        opacity={0.12}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 -z-10 size-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-[#d6b76b]/15 blur-3xl"
      />

      <div className="ts-container grid grid-cols-1 items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-24 xl:gap-14">
        {/* LEFT: Hero content */}
        <div className="ts-page-enter relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900 ring-1 ring-navy-900/10 backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
              <span className="relative size-2 rounded-full bg-emerald-600" />
            </span>
            International B2B Marketplace
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.75rem] font-extrabold !leading-[1.02] tracking-[-0.045em] sm:text-6xl xl:text-[4.5rem]"
          >
            Source Better.
            <br />
            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-[#b79549] bg-clip-text font-medium text-transparent">
              Trade Smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-900/75 sm:text-lg">
            Compare wholesale prices, minimum order quantities, and suppliers
            across international markets. Discover better opportunities, request
            quotes, and grow your business with confidence.
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
              className="!border-navy-900/25 !bg-white/60 backdrop-blur-xl hover:!bg-white"
            >
              Find Suppliers
            </Button>
          </div>

          <div className="mt-8 max-w-xl">
            <SearchForm variant="hero" idPrefix="hero-search" />
          </div>

          {/* Live catalogue figures */}
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {figures.items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/70 bg-white/45 px-3 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/75 sm:px-4"
                >
                  <Icon className="mb-3 size-4 text-emerald-700" />

                  <dd className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
                    {figures.loading ? (
                      <Skeleton className="h-7 w-10 opacity-40" />
                    ) : (
                      item.value
                    )}
                  </dd>

                  <dt className="mt-1 text-[11px] leading-snug text-navy-900/70 sm:text-xs">
                    {item.label}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>

        {/* RIGHT: Circular country orbit */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          {loading ? (
            <Skeleton className="aspect-square w-full rounded-[2.5rem] opacity-40" />
          ) : (
            <div className="ts-orbit-stage relative flex min-h-[450px] items-center justify-center px-1 pb-16 pt-14 sm:min-h-[570px] sm:px-5">
              {/* Top line */}
              <div className="absolute inset-x-3 top-5 flex items-center gap-3 sm:inset-x-8">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-700/50 to-emerald-700/10" />
                <span className="size-2 rounded-full bg-[#c9a85c]" />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-700/50 to-emerald-700/10" />
              </div>

              {/* Bottom line */}
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 sm:inset-x-8 sm:gap-3">
                <span className="size-2 shrink-0 rounded-full bg-[#c9a85c]" />
                <span className="h-px flex-1 bg-gradient-to-r from-[#c9a85c]/50 via-emerald-700/30 to-transparent" />

                <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.16em] text-navy-900/65 sm:text-[10px] sm:tracking-[0.2em]">
                  Trade Without Borders
                </span>

                <span className="h-px flex-1 bg-gradient-to-l from-[#c9a85c]/50 via-emerald-700/30 to-transparent" />
                <span className="size-2 shrink-0 rounded-full bg-emerald-600" />
              </div>

              {/* Glass panel background */}
              <div className="absolute inset-x-2 inset-y-10 rounded-[2rem] border border-white/70 bg-white/15 shadow-2xl backdrop-blur-sm sm:inset-x-5 sm:rounded-[2.75rem]" />

              {/* Soft glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 size-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl sm:size-[420px]"
              />

              {/* Circular ring */}
              <div className="ts-orbit-circle relative z-10 flex size-[270px] shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/35 p-3 shadow-[0_20px_80px_rgba(18,68,49,0.12)] backdrop-blur-xl sm:size-[390px] sm:p-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-full border border-emerald-800/10"
                />

                {/* Emerald, champagne, orange and coral ring */}
                <div
                  aria-hidden="true"
                  className="ts-trade-ring absolute inset-3 rounded-full p-[10px] sm:inset-4 sm:p-[13px]"
                  style={{
                    background:
                      "conic-gradient(from -45deg, #16a765 0deg, #16a765 65deg, #d6b76b 65deg, #d6b76b 145deg, #f19a55 145deg, #f19a55 205deg, #ef6464 205deg, #ef6464 295deg, #16a765 295deg, #16a765 330deg, transparent 330deg, transparent 360deg)",
                  }}
                >
                  <div className="h-full w-full rounded-full border border-white/70 bg-[#f7f9f6]" />
                </div>

                {/* Country badges */}
                <div
                  className="ts-country-orbit"
                  aria-label="Example global trading destinations"
                >
                  {COUNTRIES.map((country, index) => (
                    <div
                      key={country.name}
                      className={`ts-country-badge ts-country-${country.position}`}
                      style={{
                        "--country-delay": `${index * 0.6}s`,
                      }}
                      title={country.name}
                    >
                      <span className="ts-country-flag" aria-hidden="true">
                        {country.flag}
                      </span>
                      <span className="ts-country-name">{country.name}</span>
                    </div>
                  ))}
                </div>

                {/* Centre branding */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 sm:size-14">
                    <Globe className="size-6 sm:size-8" />
                  </div>

                  <p className="font-display text-xl font-extrabold tracking-tight text-emerald-700 sm:text-3xl">
                    GLOBAL
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-navy-700 sm:text-xs">
                    Sourcing Network
                  </p>

                  <div className="mt-4 h-1 w-16 overflow-hidden rounded-full bg-slate-200 sm:w-24">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-600 via-[#c9a85c] to-emerald-600" />
                  </div>

                  <p className="mt-3 text-[9px] font-medium text-navy-700/60 sm:text-xs">
                    One network. Endless opportunities.
                  </p>
                </div>
              </div>

              {/* Secure sourcing floating card */}
              <div className="absolute left-0 top-[19%] z-30 flex max-w-[195px] items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 p-2.5 shadow-[0_12px_35px_rgba(20,50,40,0.12)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 sm:left-0 sm:top-[21%] sm:max-w-[245px] sm:gap-3 sm:rounded-3xl sm:p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#eee8d8] text-[#9b7b32] sm:size-12 sm:rounded-2xl">
                  <ShieldCheck className="size-5 sm:size-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-[10px] sm:tracking-[0.18em]">
                    Secure sourcing
                  </p>

                  <p className="mt-1 text-[10px] font-bold leading-snug text-navy-900 sm:text-sm">
                    Explore suppliers
                  </p>
                </div>
              </div>

              {/* Featured product floating card */}
              {spotlight && (
                <Link
                  to={`/products/${spotlight.slug}`}
                  className="absolute -right-1 top-[55%] z-30 flex max-w-[205px] items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 p-2.5 shadow-[0_12px_35px_rgba(20,50,40,0.13)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:-right-1 sm:max-w-[260px] sm:gap-3 sm:rounded-3xl sm:p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:size-12 sm:rounded-2xl">
                    <TrendingUp className="size-5 sm:size-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-[10px] sm:tracking-[0.18em]">
                      Featured listing
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold text-navy-900 sm:text-sm">
                      {spotlight.name}
                    </p>

                    <p className="mt-1 text-xs font-extrabold text-emerald-600 sm:text-sm">
                      {money(getPriceRange(spotlight).min)}
                    </p>

                    {spotlightCompany && (
                      <p className="mt-1 truncate text-[9px] text-navy-700/60 sm:text-[10px]">
                        {spotlightCompany.country}
                      </p>
                    )}
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 text-navy-700 sm:size-5" />
                </Link>
              )}

              {/* Catalogue summary cards */}
              <div className="absolute inset-x-2 bottom-12 z-20 grid grid-cols-3 gap-2 sm:inset-x-5 sm:bottom-12 sm:gap-3">
                {[
                  {
                    label: "Listings",
                    value: figures.items[0].value,
                  },
                  {
                    label: "Suppliers",
                    value: figures.items[1].value,
                  },
                  {
                    label: "Countries",
                    value: figures.items[2].value,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/90 bg-white/85 px-1.5 py-3 text-center shadow-sm backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:rounded-2xl sm:px-3 sm:py-4"
                  >
                    <p className="truncate text-[8px] font-bold uppercase tracking-wider text-navy-700/65 sm:text-[10px]">
                      {item.label}
                    </p>

                    <p className="mt-1 font-display text-lg font-extrabold text-emerald-600 sm:text-2xl">
                      {figures.loading ? "—" : item.value}
                    </p>

                    <div className="mx-auto mt-2 h-1 max-w-20 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Curved transition into next section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2rem] bg-ivory sm:h-12 sm:rounded-t-[2.5rem]"
      />
    </section>
  );
}
