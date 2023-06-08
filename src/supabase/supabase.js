import { createClient } from "@supabase/supabase-js";



const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL_Emp;
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY_Emp;

export const SupabaseEmp = createClient(projectURL, projectKey);


// const projectURLBiz = import.meta.env.VITE_SUPABASE_PROJECT_URL;
// const projectKeyBiz = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

// export const SupabaseBiz = createClient(projectURLBiz, projectKeyBiz);