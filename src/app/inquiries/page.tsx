export const metadata = {
  title: "Inquiries — Proplisty",
};

export default function InquiriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Your Inquiries</h1>

      <div className="text-center text-gray-400 py-16">
        <p className="text-lg">No inquiries yet</p>
        <p className="text-sm mt-1">
          When you contact a broker, your conversations will appear here
        </p>
      </div>
    </div>
  );
}
