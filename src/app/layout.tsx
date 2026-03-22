import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Proplisty — Find Your Perfect Property",
  description: "Browse and post property listings from trusted brokers across India",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar user={user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
