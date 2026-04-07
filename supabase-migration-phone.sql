-- ============================================
-- Fardalin Trans - Tambah kolom phone ke shipments
-- Jalankan di Supabase SQL Editor
-- ============================================

ALTER TABLE shipments ADD COLUMN receiver_phone text;
