import { createClient } from "@supabase/supabase-js";

const projectURLBiz = import.meta.env.VITE_SUPABASE_PROJECT_URL_OFFERS;
const projectKeyBiz = import.meta.env.VITE_SUPABASE_PROJECT_KEY_OFFERS;

export const SupabaseOffers = createClient(projectURLBiz, projectKeyBiz);