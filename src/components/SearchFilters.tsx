"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LOCALITIES, PROPERTY_TYPES, LISTING_TYPES, BUDGET_RANGES } from "@/lib/constants";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Listing type (Buy / Rent) */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        value={searchParams.get("type") ?? ""}
        onChange={(e) => updateFilter("type", e.target.value)}
      >
        <option value="">Buy / Rent</option>
        {LISTING_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Locality */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        value={searchParams.get("locality") ?? ""}
        onChange={(e) => updateFilter("locality", e.target.value)}
      >
        <option value="">All Localities</option>
        {LOCALITIES.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Property type */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        value={searchParams.get("property") ?? ""}
        onChange={(e) => updateFilter("property", e.target.value)}
      >
        <option value="">All Types</option>
        {PROPERTY_TYPES.map((pt) => (
          <option key={pt.value} value={pt.value}>
            {pt.label}
          </option>
        ))}
      </select>

      {/* Budget */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        value={searchParams.get("budget") ?? ""}
        onChange={(e) => updateFilter("budget", e.target.value)}
      >
        <option value="">Any Budget</option>
        {BUDGET_RANGES.map((b, i) => (
          <option key={i} value={`${b.min}-${b.max}`}>
            {b.label}
          </option>
        ))}
      </select>
    </div>
  );
}
