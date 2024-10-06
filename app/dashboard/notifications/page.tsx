'use client'

import { useState } from 'react'
import  Button from '@/components/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'

interface Notification {
  id: number
  message: string
  type: 'info' | 'warning' | 'success'
  timestamp: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, message: 'New trade offer received', type: 'info', timestamp: '2023-05-15 10:30', read: false },
  { id: 2, message: 'Player injury report: LeBron James (day-to-day)', type: 'warning', timestamp: '2023-05-14 15:45', read: false },
  { id: 3, message: 'Draft pick confirmed', type: 'success', timestamp: '2023-05-13 09:00', read: true },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end space-x-2">
          <Button variant="secondary" onClick={markAllAsRead}>Mark All as Read</Button>
          <Button variant="outline" onClick={clearAllNotifications}>Clear All</Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? 'bg-gray-100' : 'bg-orange-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-orange-800'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <Button variant="secondary"  onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications</p>
        )}
      </CardContent>
    </Card>
  )
}