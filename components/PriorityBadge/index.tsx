import React from 'react';
import { Priority } from '@/types/Player';
import Badge from './Badge';

interface PriorityBadgeProps {
  priority: Priority;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const priorityColors: Record<Priority, string> = {
  High: 'bg-red-100 text-red-800 hover:bg-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  Low: 'bg-green-100 text-green-800 hover:bg-green-200',
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, onClick }) => {
  return (
    <Badge
      className={`${priorityColors[priority]} cursor-pointer transition-colors duration-200`}
      onClick={onClick}
    >
      {priority}
    </Badge>
  );
};