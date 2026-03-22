export const LOCALITIES = [
  "Wakad",
  "Hinjewadi",
  "Baner",
  "Kothrud",
  "Viman Nagar",
  "Aundh",
  "Pimple Saudagar",
  "Nigdi",
  "Chinchwad",
] as const;

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
] as const;

export const LISTING_TYPES = [
  { value: "sale", label: "Buy" },
  { value: "rent", label: "Rent" },
] as const;

export const BUDGET_RANGES = [
  { label: "Under ₹25L", min: 0, max: 2500000 },
  { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
  { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
  { label: "₹1Cr - ₹2Cr", min: 10000000, max: 20000000 },
  { label: "Above ₹2Cr", min: 20000000, max: Infinity },
] as const;

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const crores = price / 10000000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)}Cr`;
  }
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}
