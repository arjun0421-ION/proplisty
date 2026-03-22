export const metadata = {
  title: "Upcoming Projects — Proplisty",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Projects</h1>
      <p className="text-sm text-gray-500 mb-8">
        Discover new launches from builders across Pune &amp; PCMC
      </p>

      {/* Placeholder */}
      <div className="text-center text-gray-400 py-16">
        <p className="text-lg">Projects will appear here</p>
        <p className="text-sm mt-1">Connect Supabase to fetch builder projects</p>
      </div>
    </div>
  );
}
