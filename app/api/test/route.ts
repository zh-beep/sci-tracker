import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ 
      error: 'Missing environment variables',
      url: supabaseUrl ? 'URL exists' : 'URL missing',
      key: supabaseAnonKey ? 'Key exists' : 'Key missing'
    })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')

  return NextResponse.json({
    url: supabaseUrl,
    clients: data?.length || 0,
    error: error?.message || null,
    data: data || []
  })
}