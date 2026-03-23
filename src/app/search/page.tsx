import { Suspense } from "react";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Search Properties — Proplisty",
};

interface SearchPageProps {
  searchParams: { type?: string; locality?: string; property?: string; budget?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const supabase = createClient();

  let query = supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(50);

  if (searchParams.type) {
    query = query.eq("listing_type", searchParams.type);
  }
  if (searchParams.locality) {
    query = query.eq("locality", searchParams.locality);
  }
  if (searchParams.property) {
    query = query.eq("property_type", searchParams.property);
  }
  if (searchParams.budget) {
    const [min, max] = searchParams.budget.split("-").map(Number);
    query = query.gte("price", min);
    if (!isNaN(max) && isFinite(max)) {
      query = query.lte("price", max);
    }
  }

  const { data: listings } = await query;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Search Properties</h1>

      <Suspense fallback={<div className="h-10" />}>
        <SearchFilters />
      </Suspense>

      <div className="mt-6">
        {!listings || listings.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <p className="text-lg">No properties found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{listings.length} properties found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
