-- Proplisty initial database schema

-- Enums
CREATE TYPE user_role AS ENUM ('buyer', 'broker', 'builder');
CREATE TYPE listing_type AS ENUM ('sale', 'rent');
CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'plot', 'commercial', 'office', 'shop');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'rented', 'inactive');
CREATE TYPE project_status AS ENUM ('upcoming', 'ongoing', 'completed');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  role user_role NOT NULL DEFAULT 'buyer',
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Broker / Builder profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT,
  bio TEXT,
  rera_number TEXT,
  experience_years INTEGER,
  localities_served TEXT[] DEFAULT '{}',
  logo_url TEXT,
  response_rate NUMERIC(5,2) DEFAULT 0,
  total_listings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property listings
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  property_type property_type NOT NULL,
  listing_type listing_type NOT NULL,
  price NUMERIC(15,2) NOT NULL,
  area_sqft INTEGER NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  locality TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL DEFAULT 'Pune',
  photos TEXT[] DEFAULT '{}',
  status listing_status DEFAULT 'active',
  furnishing TEXT,
  floor_number INTEGER,
  total_floors INTEGER,
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- In-app inquiries (direct messaging)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved / shortlisted listings
CREATE TABLE saved_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Upcoming builder projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  locality TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Pune',
  price_range_min NUMERIC(15,2) NOT NULL,
  price_range_max NUMERIC(15,2) NOT NULL,
  property_types property_type[] DEFAULT '{}',
  brochure_url TEXT,
  floor_plan_urls TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  launch_date DATE,
  possession_date DATE,
  rera_id TEXT,
  status project_status DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_listings_locality ON listings(locality);
CREATE INDEX idx_listings_type ON listings(listing_type);
CREATE INDEX idx_listings_property_type ON listings(property_type);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_user ON listings(user_id);
CREATE INDEX idx_inquiries_receiver ON inquiries(receiver_id);
CREATE INDEX idx_inquiries_sender ON inquiries(sender_id);
CREATE INDEX idx_saved_listings_user ON saved_listings(user_id);
CREATE INDEX idx_projects_builder ON projects(builder_id);
CREATE INDEX idx_projects_locality ON projects(locality);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users: anyone can read, only own row can be updated
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own record" ON users FOR UPDATE USING (auth.uid() = id);

-- Profiles: anyone can read, only own profile can be modified
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Listings: anyone can read active listings, brokers/builders can manage their own
CREATE POLICY "Active listings are viewable by everyone" ON listings FOR SELECT USING (status = 'active' OR auth.uid() = user_id);
CREATE POLICY "Authenticated users can create listings" ON listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON listings FOR DELETE USING (auth.uid() = user_id);

-- Inquiries: only sender and receiver can see
CREATE POLICY "Users can view own inquiries" ON inquiries FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Authenticated users can send inquiries" ON inquiries FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Receiver can mark as read" ON inquiries FOR UPDATE USING (auth.uid() = receiver_id);

-- Saved listings: only the user who saved can see/manage
CREATE POLICY "Users can view own saved listings" ON saved_listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save listings" ON saved_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave listings" ON saved_listings FOR DELETE USING (auth.uid() = user_id);

-- Projects: anyone can read, builders can manage their own
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Builders can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = builder_id);
CREATE POLICY "Builders can update own projects" ON projects FOR UPDATE USING (auth.uid() = builder_id);
CREATE POLICY "Builders can delete own projects" ON projects FOR DELETE USING (auth.uid() = builder_id);

-- Storage bucket for listing photos
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-photos', 'listing-photos', true);

-- Storage policy: anyone can view, authenticated users can upload
CREATE POLICY "Anyone can view listing photos" ON storage.objects FOR SELECT USING (bucket_id = 'listing-photos');
CREATE POLICY "Authenticated users can upload photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'listing-photos' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete own photos" ON storage.objects FOR DELETE USING (bucket_id = 'listing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
