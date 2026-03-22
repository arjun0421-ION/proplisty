"use client";

import { useState } from "react";
import { LOCALITIES, PROPERTY_TYPES, LISTING_TYPES } from "@/lib/constants";

export default function NewListingPage() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Submit to Supabase
    alert("Listing creation will work once Supabase is connected.");
    setSubmitting(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Post a New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            required
            placeholder="e.g. Spacious 2 BHK in Baner"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Listing type & Property type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
            <select name="listing_type" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              {LISTING_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select name="property_type" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price & Area */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input name="price" type="number" required placeholder="e.g. 7500000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
            <input name="area_sqft" type="number" required placeholder="e.g. 950" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <input name="bedrooms" type="number" placeholder="e.g. 2" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input name="bathrooms" type="number" placeholder="e.g. 2" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Locality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
          <select name="locality" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="">Select locality</option>
            {LOCALITIES.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the property..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Photos placeholder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-sm">
            Photo upload will be available once Supabase Storage is connected
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Listing"}
        </button>
      </form>
    </div>
  );
}
