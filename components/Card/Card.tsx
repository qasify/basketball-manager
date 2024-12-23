import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={cn('bg-white shadow-md rounded-lg p-6 pr-2 flex flex-col flex-grow', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: CardProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: CardProps) {
  return (
    <h2 className={`text-2xl font-bold ${className}`}>
      {children}
    </h2>
  )
}

export function CardContent({ children, className = '' }: CardProps) {
  return (
    <div className={`flex flex-col h-full pr-4 ${className}`}>
      {children}
    </div>
  )
}