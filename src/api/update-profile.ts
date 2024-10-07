import { api } from "@/lib/axios";

interface UpadateProfile {
  name: string
  description: string | null
}
export async function updateProfile({ name, description }: UpadateProfile) {
  await api.put('/profile', { name, description})
}