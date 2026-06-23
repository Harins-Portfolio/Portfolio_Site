import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client when environment variables are present to avoid
// throwing during app startup (which causes a blank page in development).
export let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
	try {
		supabase = createClient(supabaseUrl, supabaseAnonKey);
	} catch (err) {
		// keep supabase null and let callers handle the missing client
		console.warn('Supabase client init failed:', err.message || err);
		supabase = null;
	}
} else {
	// No env configured — warn during development but don't crash the app.
	// Consumers should check for a null `supabase` and handle accordingly.
	// Example: show an informative message or skip backend calls.
	if (import.meta.env.DEV) console.warn('VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY not set; Supabase disabled.');
}
