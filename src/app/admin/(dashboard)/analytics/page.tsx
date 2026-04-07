import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import {
  Package,
  Truck,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  const all = shipments || [];
  const active = all.filter((s) => s.status === "active");
  const delivered = all.filter((s) => s.status === "delivered");
  const cancelled = all.filter((s) => s.status === "cancelled");

  // Orders per month (last 6 months)
  const monthlyData: Record<string, number> = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("id-ID", {
      month: "short",
      year: "numeric",
    });
    monthlyData[key] = 0;
  }
  all.forEach((s) => {
    const d = new Date(s.created_at);
    const key = d.toLocaleDateString("id-ID", {
      month: "short",
      year: "numeric",
    });
    if (key in monthlyData) {
      monthlyData[key]++;
    }
  });

  const monthlyEntries = Object.entries(monthlyData);
  const maxMonthly = Math.max(...Object.values(monthlyData), 1);

  // Vehicle usage
  const vehicleCounts: Record<string, number> = {};
  all.forEach((s) => {
    const v = s.vehicle.charAt(0).toUpperCase() + s.vehicle.slice(1);
    vehicleCounts[v] = (vehicleCounts[v] || 0) + 1;
  });
  const vehicleEntries = Object.entries(vehicleCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const maxVehicle = Math.max(...Object.values(vehicleCounts), 1);

  // Top routes
  const routeCounts: Record<string, number> = {};
  all.forEach((s) => {
    const route = `${s.origin} → ${s.destination}`;
    routeCounts[route] = (routeCounts[route] || 0) + 1;
  });
  const topRoutes = Object.entries(routeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Recent orders (last 7 days)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentCount = all.filter(
    (s) => new Date(s.created_at) >= weekAgo
  ).length;

  const deliveryRate =
    all.length > 0
      ? Math.round((delivered.length / all.length) * 100)
      : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">
          Statistik pengiriman Fardalin Trans
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{all.length}</p>
            <p className="text-sm text-gray-500">Total Order</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{deliveryRate}%</p>
            <p className="text-sm text-gray-500">Tingkat Pengiriman</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{recentCount}</p>
            <p className="text-sm text-gray-500">7 Hari Terakhir</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{active.length}</p>
            <p className="text-sm text-gray-500">Sedang Dikirim</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Orders Bar Chart */}
        <Card>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Order Per Bulan
          </h2>
          <div className="space-y-3">
            {monthlyEntries.map(([month, count]) => (
              <div key={month} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-right text-xs text-gray-500">
                  {month}
                </span>
                <div className="flex-1">
                  <div className="h-7 rounded-lg bg-gray-100">
                    <div
                      className="flex h-7 items-center rounded-lg bg-brand-500 px-2 text-xs font-medium text-white transition-all"
                      style={{
                        width: `${Math.max((count / maxMonthly) * 100, count > 0 ? 8 : 0)}%`,
                      }}
                    >
                      {count > 0 ? count : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Vehicle Usage */}
        <Card>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Penggunaan Armada
          </h2>
          {vehicleEntries.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada data.</p>
          ) : (
            <div className="space-y-3">
              {vehicleEntries.map(([vehicle, count]) => (
                <div key={vehicle} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-right text-xs font-medium text-gray-700">
                    {vehicle}
                  </span>
                  <div className="flex-1">
                    <div className="h-7 rounded-lg bg-gray-100">
                      <div
                        className="flex h-7 items-center rounded-lg bg-gold-500 px-2 text-xs font-medium text-white transition-all"
                        style={{
                          width: `${Math.max((count / maxVehicle) * 100, 8)}%`,
                        }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Top Routes */}
        <Card>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Rute Terpopuler
          </h2>
          {topRoutes.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada data.</p>
          ) : (
            <div className="space-y-3">
              {topRoutes.map(([route, count], index) => (
                <div
                  key={route}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {route}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {count}x
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Status Breakdown */}
        <Card>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Status Order
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-gray-600">Aktif</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {active.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Terkirim</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {delivered.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <span className="text-sm text-gray-600">Dibatalkan</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {cancelled.length}
              </span>
            </div>

            {all.length > 0 && (
              <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-gray-100">
                {active.length > 0 && (
                  <div
                    className="bg-yellow-400"
                    style={{
                      width: `${(active.length / all.length) * 100}%`,
                    }}
                  />
                )}
                {delivered.length > 0 && (
                  <div
                    className="bg-green-500"
                    style={{
                      width: `${(delivered.length / all.length) * 100}%`,
                    }}
                  />
                )}
                {cancelled.length > 0 && (
                  <div
                    className="bg-red-400"
                    style={{
                      width: `${(cancelled.length / all.length) * 100}%`,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
