import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/login/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              FT
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-gray-900">
                Admin Panel
              </p>
              <p className="text-xs text-gray-500">Fardalin Trans</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/orders/new"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
              Order Baru
            </Link>
          </nav>

          {/* User */}
          <div className="border-t border-gray-200 p-4">
            <div className="mb-2 truncate text-xs text-gray-500">
              {user.email}
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            FT
          </div>
          <span className="text-sm font-bold text-gray-900">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5" />
          </Link>
          <Link
            href="/admin/orders/new"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full pt-14 lg:ml-64 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
