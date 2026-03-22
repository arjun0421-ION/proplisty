import { formatPrice } from "@/lib/constants";

interface ListingPageProps {
  params: { id: string };
}

export default function ListingPage({ params }: ListingPageProps) {
  // TODO: Fetch listing from Supabase using params.id
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Photo gallery placeholder */}
      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        Property photos for listing {params.id}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {/* Details */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Property Title</h1>
          <p className="text-2xl font-bold text-amber-800">{formatPrice(7500000)}</p>
          <p className="text-gray-500">Locality, Pune</p>

          <div className="flex gap-4 text-sm text-gray-600">
            <span>2 BHK</span>
            <span>950 sqft</span>
            <span>Apartment</span>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 text-sm">
              Property description will appear here once connected to Supabase.
            </p>
          </div>
        </div>

        {/* Contact card */}
        <div className="bg-white border border-amber-100 rounded-xl p-4 h-fit">
          <h3 className="font-semibold text-gray-800 mb-3">Contact Broker</h3>
          <p className="text-sm text-gray-500 mb-4">
            Login to send an inquiry to the broker directly through Proplisty.
          </p>
          <a
            href="/auth/login"
            className="block w-full text-center bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Login to Inquire
          </a>
        </div>
      </div>
    </div>
  );
}
