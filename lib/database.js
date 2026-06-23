import { supabase } from './supabase';

export const PROJ_STATUS = {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  PAID: 'PAID',
  DELIVERED: 'DELIVERED',
};

export const STATUS_FLOW = [
  { key: PROJ_STATUS.SUBMITTED, label: 'Submitted', icon: 'ri-file-add-line', color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
  { key: PROJ_STATUS.UNDER_REVIEW, label: 'Under Review', icon: 'ri-search-line', color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { key: PROJ_STATUS.ACCEPTED, label: 'Accepted', icon: 'ri-check-circle-line', color: 'text-green-500 bg-green-50 border-green-200' },
  { key: PROJ_STATUS.REJECTED, label: 'Rejected', icon: 'ri-close-circle-line', color: 'text-red-500 bg-red-50 border-red-200' },
  { key: PROJ_STATUS.IN_PROGRESS, label: 'In Progress', icon: 'ri-loader-4-line', color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
  { key: PROJ_STATUS.COMPLETED, label: 'Completed', icon: 'ri-checkbox-circle-line', color: 'text-brand-500 bg-brand-50 border-brand-200' },
  { key: PROJ_STATUS.AWAITING_PAYMENT, label: 'Awaiting Payment', icon: 'ri-secure-payment-line', color: 'text-orange-500 bg-orange-50 border-orange-200' },
  { key: PROJ_STATUS.PAID, label: 'Paid', icon: 'ri-money-euro-circle-line', color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { key: PROJ_STATUS.DELIVERED, label: 'Delivered', icon: 'ri-download-cloud-line', color: 'text-accent-500 bg-accent-50 border-accent-200' },
];

const handleError = (error) => {
  if (error?.code === '42P01') {
    throw new Error('Database table "projects" not found. Please create it in Supabase.');
  }
  throw error;
};

export const db = {
  async createProject(data) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data: project, error } = await supabase
      .from('projects')
      .insert([{
        status: PROJ_STATUS.SUBMITTED,
        project_type: data.project_type || '',
        problem_description: data.problem_description || '',
        data_types: data.data_types || [],
        ai_spec: data.ai_spec || null,
        budget: data.budget || 0,
        timeline: data.timeline || '',
        urgency: data.urgency || '',
        booking_type: data.booking_type || '',
        client_name: data.client_name || '',
        client_email: data.client_email || '',
        company: data.company || '',
        file_count: data.file_count || 0,
        file_urls: data.file_urls || [],
        deliverables: [],
        deliverable_names: [],
        messages: [],
        invoice_url: null,
        payment_status: null,
        password_hash: data.password_hash || null,
      }])
      .select()
      .single();
    if (error) { handleError(error); }
    return project;
  },

  async updateProject(id, updates) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) handleError(error);
    return data;
  },

  async getProject(id) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) handleError(error);
    return data;
  },

  async getProjectByEmail(email) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_email', email)
      .order('created_at', { ascending: false });
    if (error) handleError(error);
    return data || [];
  },

  async getProjectsByEmailAndPassword(email, passwordHash) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_email', email)
      .eq('password_hash', passwordHash)
      .order('created_at', { ascending: false });
    if (error) handleError(error);
    return data || [];
  },

  async listProjects(status) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) handleError(error);
    return data || [];
  },

  async uploadFile(bucket, path, file) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    return { path: data.path, url: publicUrl };
  },

  async getFileUrl(bucket, path) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return publicUrl;
  },

  async deleteFile(bucket, path) {
    if (!supabase) throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
    return true;
  },
};
