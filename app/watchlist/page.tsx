'use client'

import { useState } from 'react'
import  Button  from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'

interface WatchlistItem {
  id: number
  name: string
  type: 'player' | 'team'
  notes: string
}

const initialWatchlist: WatchlistItem[] = [
  { id: 1, name: 'LeBron James', type: 'player', notes: 'Monitor performance post-injury' },
  { id: 2, name: 'Golden State Warriors', type: 'team', notes: 'Analyze offensive strategies' },
  { id: 3, name: 'Luka Doncic', type: 'player', notes: 'Potential trade target' },
]

export default function WatchlistPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist)
  const [searchTerm, setSearchTerm] = useState('')
//   const [newItem, setNewItem] = useState({ name: '', type: 'player', notes: '' })

  const filteredWatchlist = watchlist.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notes.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddItem = () => {
    // if (newItem.name && newItem.type) {
    // //   setWatchlist([...watchlist, { ...newItem, id: watchlist.length + 1 }])
    //   setNewItem({ name: '', type: 'player', notes: '' })
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            type="text"
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => setSearchTerm('')} className="mb-4">Clear</Button>
        </div>
        {/* <div className="mb-4 grid grid-cols-3 gap-2">
          <Input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'player' | 'team' })}
            className="border rounded-md p-2"
          >
            <option value="player">Player</option>
            <option value="team">Team</option>
          </select>
          <Input
            type="text"
            placeholder="Notes"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
          />
        </div> */}
        <Button onClick={handleAddItem} className="mb-4">Add to Watchlist</Button>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWatchlist.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{item.type}</td>
                  <td className="px-6 py-4">{item.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="secondary" className="mr-2">Edit</Button>
                    <Button variant="outline">Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}