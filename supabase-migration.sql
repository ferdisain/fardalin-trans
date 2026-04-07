-- ============================================
-- Fardalin Trans - Database Migration
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 1. Sequence untuk auto-generate nomor resi
CREATE SEQUENCE IF NOT EXISTS resi_seq START WITH 1;

-- 2. Function untuk generate resi: FT-YYYY-XXXXXX
CREATE OR REPLACE FUNCTION generate_resi()
RETURNS text AS $$
BEGIN
  RETURN 'FT-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('resi_seq')::text, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- 3. Tabel shipments (order pengiriman)
CREATE TABLE shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resi text UNIQUE NOT NULL DEFAULT generate_resi(),
  sender text NOT NULL,
  receiver text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  service text NOT NULL,
  vehicle text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Tabel tracking_events (status per tahap)
CREATE TABLE tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  timestamp timestamptz NOT NULL DEFAULT now(),
  location text NOT NULL,
  status text NOT NULL,
  completed boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Indexes
CREATE INDEX idx_shipments_resi ON shipments(resi);
CREATE INDEX idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX idx_shipments_status ON shipments(status);

-- 6. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shipments_updated_at
  BEFORE UPDATE ON shipments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 7. Enable Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies - shipments
CREATE POLICY "Siapapun bisa lihat shipments"
  ON shipments FOR SELECT
  USING (true);

CREATE POLICY "Admin bisa insert shipments"
  ON shipments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin bisa update shipments"
  ON shipments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin bisa delete shipments"
  ON shipments FOR DELETE
  TO authenticated
  USING (true);

-- 9. RLS Policies - tracking_events
CREATE POLICY "Siapapun bisa lihat tracking_events"
  ON tracking_events FOR SELECT
  USING (true);

CREATE POLICY "Admin bisa insert tracking_events"
  ON tracking_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin bisa update tracking_events"
  ON tracking_events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin bisa delete tracking_events"
  ON tracking_events FOR DELETE
  TO authenticated
  USING (true);
