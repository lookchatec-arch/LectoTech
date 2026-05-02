import { createClient } from '@supabase/supabase-js';

// Usaremos un mock inicial si no hay variables de entorno, pero prepararemos el cliente.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-anon-key-publica';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
