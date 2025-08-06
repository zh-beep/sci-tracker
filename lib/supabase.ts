import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Client = {
  id: string
  name: string
  notion_id: string | null
  slug: string
  created_at: string
}

export type Phase = {
  id: string
  client_id: string
  phase_number: number
  name: string
  client_start_date: string | null
  planned_days: number
  created_at: string
}

export type Task = {
  id: string
  phase_id: string
  client_id: string
  name: string
  task_number: number | null
  notion_url: string | null
  status: 'Not started' | 'In progress' | 'Done'
  instructions: string | null
  days_from_start: number | null
  due_date: string | null
  time_estimate_hrs: number | null
  assigned_to: string[]
  last_sync: string
}

export type PhaseProgress = {
  id: string
  client_id: string
  client_name: string
  client_slug: string
  phase_number: number
  phase_name: string
  client_start_date: string | null
  planned_days: number
  total_tasks: number
  completed_tasks: number
  in_progress_tasks: number
  not_started_tasks: number
  progress_percentage: number
  expected_progress: number
  status: 'Not Started' | 'Behind' | 'On Track' | 'Ahead'
  last_updated: string | null
}