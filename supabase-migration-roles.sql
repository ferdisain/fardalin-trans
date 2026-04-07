-- ============================================
-- Fardalin Trans - Multi-admin & Roles
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Tabel profiles untuk menyimpan role user
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'operator',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Roles: admin (full access), operator (manage orders), driver (update status only)

CREATE INDEX idx_profiles_role ON profiles(role);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin bisa lihat semua profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin bisa manage profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Auto-create profile saat user baru register
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'operator')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
