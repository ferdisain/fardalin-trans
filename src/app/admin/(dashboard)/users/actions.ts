"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addUser(formData: FormData) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  // Create auth user via sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, role },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Kalau trigger auto-create profile gagal, insert manual
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        email,
        full_name,
        role,
      });

    if (profileError) {
      return { error: `User dibuat tapi gagal simpan profile: ${profileError.message}` };
    }
  }

  revalidatePath("/admin/users");
  return { success: true };
}
