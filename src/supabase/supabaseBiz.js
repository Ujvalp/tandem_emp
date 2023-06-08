import { createClient } from "@supabase/supabase-js";






const projectURLBiz = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKeyBiz = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

export const SupabaseBiz = createClient(projectURLBiz, projectKeyBiz);