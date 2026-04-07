import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Truck, UserCog } from "lucide-react";
import { AddUserForm } from "./add-user-form";

const roleLabels: Record<string, string> = {
  admin: "Admin",
  operator: "Operator",
  driver: "Driver",
};

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Shield className="h-4 w-4" />,
  operator: <UserCog className="h-4 w-4" />,
  driver: <Truck className="h-4 w-4" />,
};

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const allProfiles = profiles || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kelola User</h1>
        <p className="text-sm text-gray-500">
          Admin, operator, dan driver yang memiliki akses ke admin panel
        </p>
      </div>

      {/* Role explanation */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-brand-600">
          <div className="flex items-center gap-2 text-brand-700">
            <Shield className="h-5 w-5" />
            <h3 className="font-semibold">Admin</h3>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Akses penuh: kelola order, blog, analytics, user
          </p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 text-blue-700">
            <UserCog className="h-5 w-5" />
            <h3 className="font-semibold">Operator</h3>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Kelola order: buat, edit, update status
          </p>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-2 text-yellow-700">
            <Truck className="h-5 w-5" />
            <h3 className="font-semibold">Driver</h3>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Update status pengiriman saja
          </p>
        </Card>
      </div>

      {/* Add User Form */}
      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Tambah User Baru
        </h2>
        <AddUserForm />
      </Card>

      {/* Users List */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Daftar User ({allProfiles.length})
          </h2>
        </div>

        {allProfiles.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-gray-500">Belum ada user.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {allProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    {roleIcons[profile.role] || (
                      <Users className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {profile.full_name}
                    </p>
                    <p className="text-xs text-gray-500">{profile.email}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    profile.role === "admin"
                      ? "default"
                      : profile.role === "operator"
                        ? "info"
                        : "warning"
                  }
                >
                  {roleLabels[profile.role] || profile.role}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
