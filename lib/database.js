import { supabase } from './supabase';

export const PROJ_STATUS = {
  SUBMITTED: 'SUBMITTED',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DELIVERED: 'DELIVERED',
  PAID: 'PAID',
};

export const db = {
  async createProject(data) {
    const { data: project, error } = await supabase
      .from('projects')
      .insert([{
        status: PROJ_STATUS.SUBMITTED,
        problem_description: data.problem_description || '',
        data_types: data.data_types || [],
        ai_spec: data.ai_spec || null,
        budget: data.budget || 0,
        timeline: data.timeline || '',
        client_name: data.client_name || '',
        client_email: data.client_email || '',
        client_linkedin: data.client_linkedin || '',
        company: data.company || '',
        deliverables_urls: [],
        file_urls: data.file_urls || [],
      }])
      .select()
      .single();
    if (error) throw error;
    return project;
  },

  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getProject(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async listProjects(status) {
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async uploadFile(bucket, path, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    return publicUrl;
  },

  async getFileUrl(bucket, path) {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return publicUrl;
  },
};
