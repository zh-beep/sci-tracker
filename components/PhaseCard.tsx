'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PhaseProgress } from '@/lib/supabase'

interface PhaseCardProps {
  phase: PhaseProgress
  children?: React.ReactNode
}

export default function PhaseCard({ phase, children }: PhaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusClass = () => {
    switch (phase.status) {
      case 'Behind':
        return 'status-behind'
      case 'Ahead':
        return 'status-ahead'
      case 'On Track':
        return 'status-on-track'
      default:
        return 'status-not-started'
    }
  }

  const getStatusDot = () => {
    switch (phase.status) {
      case 'Behind':
        return '🔴'
      case 'Ahead':
        return '🟢'
      case 'On Track':
        return '🟡'
      default:
        return '⚪'
    }
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateDueDate = () => {
    if (!phase.client_start_date || !phase.planned_days) return 'Not set'
    const startDate = new Date(phase.client_start_date)
    const dueDate = new Date(startDate)
    dueDate.setDate(startDate.getDate() + phase.planned_days)
    return dueDate.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="phase-card">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-semibold">{phase.phase_name}</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              New
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Progress</span>
              <span className="font-medium">{phase.progress_percentage}%</span>
            </div>
            
            <div className="progress-bar flex-1 max-w-xs">
              <div 
                className="progress-fill bg-green-500"
                style={{ width: `${phase.progress_percentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="text-gray-400">
              {calculateDueDate()}
            </span>
            <div className="flex items-center gap-1">
              <span>{getStatusDot()}</span>
              <span className={`status-badge ${getStatusClass()}`}>
                {phase.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {isExpanded && children && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          {children}
        </div>
      )}
    </div>
  )
}