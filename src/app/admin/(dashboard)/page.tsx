import { Plus, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { OrdersTable } from "./orders-table";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  const allShipments = shipments || [];
  const activeCount = allShipments.filter((s) => s.status === "active").length;
  const deliveredCount = allShipments.filter(
    (s) => s.status === "delivered"
  ).length;
  const cancelledCount = allShipments.filter(
    (s) => s.status === "cancelled"
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Kelola semua order pengiriman Fardalin Trans
          </p>
        </div>
        <ButtonLink href="/admin/orders/new" variant="primary" size="md">
          <Plus className="h-4 w-4" />
          Order Baru
        </ButtonLink>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {allShipments.length}
            </p>
            <p className="text-sm text-gray-500">Total Order</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-sm text-gray-500">Aktif</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {deliveredCount}
            </p>
            <p className="text-sm text-gray-500">Terkirim</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {cancelledCount}
            </p>
            <p className="text-sm text-gray-500">Dibatalkan</p>
          </div>
        </Card>
      </div>

      {/* Orders Table with Search & Filter */}
      <OrdersTable shipments={allShipments} />
    </div>
  );
}
