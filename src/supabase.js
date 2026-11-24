import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
// Kalau .env belum diisi, situs tetap jalan tanpa Supabase.
export const supabase = url && key ? createClient(url, key) : null
