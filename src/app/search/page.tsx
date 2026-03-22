import { Suspense } from "react";
import SearchFilters from "@/components/SearchFilters";

export const metadata = {
  title: "Search Properties — Proplisty",
};

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Search Properties</h1>

      <Suspense fallback={<div className="h-10" />}>
        <SearchFilters />
      </Suspense>

      {/* Results placeholder — wired to Supabase later */}
      <div className="mt-8 text-center text-gray-400 py-16">
        <p className="text-lg">Search results will appear here</p>
        <p className="text-sm mt-1">Connect Supabase to fetch real listings</p>
      </div>
    </div>
  );
}
