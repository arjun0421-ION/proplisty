interface ProfilePageProps {
  params: { id: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // TODO: Fetch profile from Supabase
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white border border-amber-100 rounded-xl p-6">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xl font-bold">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Broker Name</h1>
            <p className="text-sm text-gray-500">Broker in Pune</p>
            <p className="text-xs text-gray-400 mt-1">Profile ID: {params.id}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-warm-50 rounded-lg p-3">
            <p className="text-lg font-bold text-amber-800">0</p>
            <p className="text-xs text-gray-500">Listings</p>
          </div>
          <div className="bg-warm-50 rounded-lg p-3">
            <p className="text-lg font-bold text-amber-800">--%</p>
            <p className="text-xs text-gray-500">Response Rate</p>
          </div>
          <div className="bg-warm-50 rounded-lg p-3">
            <p className="text-lg font-bold text-amber-800">--</p>
            <p className="text-xs text-gray-500">Experience</p>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Listings</h2>
        <p className="text-gray-400 text-center py-12">
          Listings will appear here once connected to Supabase
        </p>
      </div>
    </div>
  );
}
