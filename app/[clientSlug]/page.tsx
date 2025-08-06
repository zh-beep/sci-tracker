import { supabase, PhaseProgress, Task } from '@/lib/supabase'
import PhaseCard from '@/components/PhaseCard'
import TaskBoard from '@/components/TaskBoard'
import { notFound } from 'next/navigation'

async function getClientPhases(clientSlug: string): Promise<PhaseProgress[]> {
  const { data, error } = await supabase
    .from('phase_progress')
    .select('*')
    .eq('client_slug', clientSlug)
    .order('phase_number')

  if (error) {
    console.error('Error fetching phases:', error)
    return []
  }

  return data || []
}

async function getPhaseTasks(phaseId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('phase_id', phaseId)
    .order('task_number')

  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }

  return data || []
}

export default async function ClientPage({ params }: { params: Promise<{ clientSlug: string }> }) {
  const { clientSlug } = await params
  const phases = await getClientPhases(clientSlug)

  if (phases.length === 0) {
    notFound()
  }

  const clientName = phases[0]?.client_name || clientSlug

  // Fetch tasks for all phases
  const phasesWithTasks = await Promise.all(
    phases.map(async (phase) => ({
      ...phase,
      tasks: await getPhaseTasks(phase.id)
    }))
  )

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{clientName} Status Tracker</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Owner</span>
            <span className="text-sm">Zanir</span>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-4">
        {phasesWithTasks.map((phase) => (
          <PhaseCard key={phase.id} phase={phase}>
            <TaskBoard tasks={phase.tasks} />
          </PhaseCard>
        ))}
        
        {phases.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No phases found for this client.
          </div>
        )}
      </main>
    </div>
  )
}