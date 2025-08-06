import { supabase, Client } from '@/lib/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data || []
}

export default async function Home() {
  const clients = await getClients()

  // If there's only one client, redirect to it
  if (clients.length === 1) {
    redirect(`/${clients[0].slug}`)
  }

  // If no clients, show setup message
  if (clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Clients Found</h1>
          <p className="text-gray-400 mb-6">
            Sync your data from n8n to see your project phases here.
          </p>
          <div className="bg-[#2B2B2B] rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-gray-300">
              Edge Function URL:
            </p>
            <code className="text-xs text-blue-400 break-all">
              https://fvkoapdxcvmieognhmsx.supabase.co/functions/v1/sync-tasks
            </code>
          </div>
        </div>
      </div>
    )
  }

  // Show client list
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold">SCI Phase Tracker</h1>
      </header>

      <main className="p-6">
        <h2 className="text-lg font-medium mb-4">Select a Client</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/${client.slug}`}
              className="phase-card hover:bg-[#333333] transition-colors"
            >
              <h3 className="text-lg font-medium mb-2">{client.name}</h3>
              <p className="text-sm text-gray-400">View project phases →</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
