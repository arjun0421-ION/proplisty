import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { LOCALITIES } from "@/lib/constants";
import type { Listing } from "@/lib/types/database";

// Demo data for initial scaffold — replaced by Supabase queries once connected
const DEMO_LISTINGS: Listing[] = [
  {
    id: "1",
    user_id: "demo",
    title: "Spacious 2 BHK in Baner",
    description: "Well-maintained apartment with modern amenities",
    property_type: "apartment",
    listing_type: "sale",
    price: 7500000,
    area_sqft: 950,
    bedrooms: 2,
    bathrooms: 2,
    locality: "Baner",
    address: "Baner Road",
    city: "Pune",
    photos: [],
    status: "active",
    furnishing: "Semi-Furnished",
    floor_number: 4,
    total_floors: 12,
    amenities: ["Parking", "Gym", "Swimming Pool"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "demo",
    title: "3 BHK Villa in Wakad",
    description: "Independent villa with garden",
    property_type: "villa",
    listing_type: "sale",
    price: 18500000,
    area_sqft: 2200,
    bedrooms: 3,
    bathrooms: 3,
    locality: "Wakad",
    address: null,
    city: "Pune",
    photos: [],
    status: "active",
    furnishing: "Unfurnished",
    floor_number: null,
    total_floors: 2,
    amenities: ["Garden", "Parking"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "demo",
    title: "1 BHK for Rent in Hinjewadi",
    description: "Ideal for IT professionals",
    property_type: "apartment",
    listing_type: "rent",
    price: 15000,
    area_sqft: 550,
    bedrooms: 1,
    bathrooms: 1,
    locality: "Hinjewadi",
    address: null,
    city: "Pune",
    photos: [],
    status: "active",
    furnishing: "Fully Furnished",
    floor_number: 7,
    total_floors: 20,
    amenities: ["Parking", "Security"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Find Your Perfect Property in{" "}
          <span className="text-amber-700">Pune</span>
        </h1>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Browse listings from trusted brokers and builders across Pune &amp; PCMC
        </p>

        {/* Quick search */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {LOCALITIES.slice(0, 6).map((loc) => (
            <Link
              key={loc}
              href={`/search?locality=${loc}`}
              className="px-4 py-2 bg-white border border-amber-200 rounded-full text-sm text-amber-800 hover:bg-amber-50 transition-colors"
            >
              {loc}
            </Link>
          ))}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_LISTINGS.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
