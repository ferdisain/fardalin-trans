import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Fardalin Trans",
    template: "%s | Admin Fardalin Trans",
  },
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
