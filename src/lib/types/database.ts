export type UserRole = "buyer" | "broker" | "builder";
export type ListingType = "sale" | "rent";
export type PropertyType = "apartment" | "villa" | "plot" | "commercial" | "office" | "shop";
export type ListingStatus = "active" | "sold" | "rented" | "inactive";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          phone_verified: boolean;
          role: UserRole;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string | null;
          bio: string | null;
          rera_number: string | null;
          experience_years: number | null;
          localities_served: string[];
          logo_url: string | null;
          response_rate: number;
          total_listings: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at" | "response_rate" | "total_listings">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          property_type: PropertyType;
          listing_type: ListingType;
          price: number;
          area_sqft: number;
          bedrooms: number | null;
          bathrooms: number | null;
          locality: string;
          address: string | null;
          city: string;
          photos: string[];
          status: ListingStatus;
          furnishing: string | null;
          floor_number: number | null;
          total_floors: number | null;
          amenities: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["listings"]["Row"], "id" | "created_at" | "updated_at" | "status"> & { status?: ListingStatus };
        Update: Partial<Database["public"]["Tables"]["listings"]["Insert"]>;
      };
      inquiries: {
        Row: {
          id: string;
          listing_id: string;
          sender_id: string;
          receiver_id: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["inquiries"]["Row"], "id" | "created_at" | "is_read">;
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
      };
      saved_listings: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["saved_listings"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["saved_listings"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          builder_id: string;
          name: string;
          description: string | null;
          locality: string;
          city: string;
          price_range_min: number;
          price_range_max: number;
          property_types: PropertyType[];
          brochure_url: string | null;
          floor_plan_urls: string[];
          photos: string[];
          launch_date: string | null;
          possession_date: string | null;
          rera_id: string | null;
          status: "upcoming" | "ongoing" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      listing_type: ListingType;
      property_type: PropertyType;
      listing_status: ListingStatus;
    };
  };
}

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type SavedListing = Database["public"]["Tables"]["saved_listings"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
