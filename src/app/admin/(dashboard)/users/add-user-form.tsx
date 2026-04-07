"use client";

import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { addUser } from "./actions";

const roleOptions = [
  { value: "operator", label: "Operator" },
  { value: "driver", label: "Driver" },
  { value: "admin", label: "Admin" },
];

export function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const result = await addUser(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("User berhasil ditambahkan! Mereka bisa login dengan email dan password tersebut.");
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="full_name"
          name="full_name"
          label="Nama Lengkap"
          placeholder="Nama user"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="user@email.com"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Minimal 6 karakter"
          required
        />
        <Select
          id="role"
          name="role"
          label="Role"
          options={roleOptions}
          required
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
          {success}
        </p>
      )}

      <Button type="submit" size="md" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {loading ? "Menambah..." : "Tambah User"}
      </Button>
    </form>
  );
}
