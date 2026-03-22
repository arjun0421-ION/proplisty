import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Find Your Perfect{" "}
          <span className="text-amber-700">Property</span>
        </h1>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Browse listings from trusted brokers and builders across India
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/listings/new"
            className="px-6 py-2.5 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            Post a Listing
          </Link>
          <Link
            href="/search"
            className="px-6 py-2.5 bg-white border border-amber-200 text-amber-800 rounded-full text-sm hover:bg-amber-50 transition-colors"
          >
            Browse All
          </Link>
        </div>
      </section>

      {/* Feed */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Latest Properties</h2>
          <Link href="/search" className="text-sm text-amber-700 hover:underline">
            View all
          </Link>
        </div>

        {!listings || listings.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🏠</p>
            <p className="text-lg font-medium text-gray-600 mb-1">No listings yet</p>
            <p className="text-sm mb-6">Be the first broker to post a property</p>
            <Link
              href="/listings/new"
              className="px-6 py-2.5 bg-amber-600 text-white rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Post the first listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
