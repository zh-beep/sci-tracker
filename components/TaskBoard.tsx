'use client'

import { Task } from '@/lib/supabase'
import { Clock, User } from 'lucide-react'

interface TaskBoardProps {
  tasks: Task[]
}

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const notStartedTasks = tasks.filter(t => t.status === 'Not started')
  const inProgressTasks = tasks.filter(t => t.status === 'In progress')
  const doneTasks = tasks.filter(t => t.status === 'Done')

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-[#373737] rounded p-3 mb-2 hover:bg-[#404040] transition-colors">
      <div className="text-sm font-medium mb-2">{task.name}</div>
      
      <div className="flex items-center gap-3 text-xs text-gray-400">
        {task.time_estimate_hrs && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{task.time_estimate_hrs}h</span>
          </div>
        )}
        
        {task.assigned_to.length > 0 && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{task.assigned_to.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Not Started ({notStartedTasks.length})
        </h3>
        <div>
          {notStartedTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-yellow-400 mb-3">
          In Progress ({inProgressTasks.length})
        </h3>
        <div>
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-green-400 mb-3">
          Done ({doneTasks.length})
        </h3>
        <div>
          {doneTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}