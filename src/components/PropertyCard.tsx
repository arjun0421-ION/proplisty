import Link from "next/link";
import type { Listing } from "@/lib/types/database";
import { formatPrice } from "@/lib/constants";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  const photoUrl = listing.photos?.[0] ?? "/placeholder-property.svg";

  return (
    <Link href={`/listings/${listing.id}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
            {listing.listing_type === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        {/* Details */}
        <div className="p-3">
          <p className="text-lg font-bold text-amber-800">
            {formatPrice(listing.price)}
            {listing.listing_type === "rent" && (
              <span className="text-sm font-normal text-gray-500">/mo</span>
            )}
          </p>
          <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-1">
            {listing.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {listing.locality}, {listing.city}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {listing.bedrooms !== null && (
              <span>{listing.bedrooms} BHK</span>
            )}
            <span>{listing.area_sqft} sqft</span>
            <span className="capitalize">{listing.property_type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
