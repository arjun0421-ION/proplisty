"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PROPERTY_TYPES, LISTING_TYPES } from "@/lib/constants";

export default function NewListingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login");
      } else {
        setUserId(user.id);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) return;
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const val = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("listings")
      .insert({
        user_id: userId,
        title: val("title"),
        description: val("description") || null,
        listing_type: val("listing_type") as "sale" | "rent",
        property_type: val("property_type") as "apartment" | "villa" | "plot" | "commercial" | "office" | "shop",
        price: Number(val("price")),
        area_sqft: Number(val("area_sqft")),
        bedrooms: Number(val("bedrooms")) || null,
        bathrooms: Number(val("bathrooms")) || null,
        locality: val("locality"),
        city: val("city"),
        address: val("address") || null,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
      setSubmitting(false);
    } else {
      router.push(`/listings/${data.id}`);
    }
  }

  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Post a New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            required
            placeholder="e.g. Spacious 2 BHK near Metro"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              name="city"
              required
              placeholder="e.g. Mumbai, Pune, Bangalore"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Locality / Area</label>
            <input
              name="locality"
              required
              placeholder="e.g. Baner, Koramangala"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address <span className="text-gray-400 font-normal">(optional)</span></label>
          <input name="address" placeholder="Street / building name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-gray-400 font-normal">(optional)</span></label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the property — amenities, nearby landmarks, condition..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
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
