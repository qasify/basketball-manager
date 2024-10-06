'use client'

import { useState } from 'react'
import  Button  from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'

interface Team {
  id: number
  name: string
  city: string
  coach: string
  players: string[]
}

const initialTeams: Team[] = [
  { id: 1, name: 'Lakers', city: 'Los Angeles', coach: 'Darvin Ham', players: ['LeBron James', 'Anthony Davis', 'D\'Angelo Russell'] },
  { id: 2, name: 'Warriors', city: 'Golden State', coach: 'Steve Kerr', players: ['Stephen Curry', 'Klay Thompson', 'Draymond Green'] },
  { id: 3, name: 'Celtics', city: 'Boston', coach: 'Joe Mazzulla', players: ['Jayson Tatum', 'Jaylen Brown', 'Marcus Smart'] },
]

export default function TeamManagementPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [searchTerm, setSearchTerm] = useState('')
  const [newTeam, setNewTeam] = useState({ name: '', city: '', coach: '' })

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTeam = () => {
    if (newTeam.name && newTeam.city && newTeam.coach) {
      setTeams([...teams, { ...newTeam, id: teams.length + 1, players: [] }])
      setNewTeam({ name: '', city: '', coach: '' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => setSearchTerm('')} className="mb-4">Clear</Button>
        </div>
        <div className="mb-4 flex space-x-2">
          {/* <Input
            type="text"
            placeholder="Team Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
          />
          <Input
            type="text"
            placeholder="City"
            value={newTeam.city}
            onChange={(e) => setNewTeam({ ...newTeam, city: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Coach"
            value={newTeam.coach}
            onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
          /> */}
          <Button onClick={handleAddTeam} className="mb-4">Add Team</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Players</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.map((team) => (
                <tr key={team.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{team.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{team.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{team.coach}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{team.players.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="secondary" className="mr-2">Edit</Button>
                    <Button variant="outline">Manage Roster</Button>
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