'use client'

import { useState } from 'react'
import Button from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'

interface Player {
    id: number
    name: string
    position: string[]
    team: string
    age: number
    height: string
    weight: string
  }
  
  const initialPlayers: Player[] = [
    { id: 1, name: 'LeBron James', position: ['SF', 'PF'], team: 'Los Angeles Lakers', age: 38, height: "6'9\"", weight: '250 lbs' },
    { id: 2, name: 'Stephen Curry', position: ['PG'], team: 'Golden State Warriors', age: 35, height: "6'3\"", weight: '185 lbs' },
    { id: 3, name: 'Kevin Durant', position: ['SF', 'PF'], team: 'Phoenix Suns', age: 34, height: "6'10\"", weight: '240 lbs' },
    { id: 4, name: 'Giannis Antetokounmpo', position: ['PF', 'C'], team: 'Milwaukee Bucks', age: 28, height: "6'11\"", weight: '242 lbs' },
    { id: 5, name: 'Luka Doncic', position: ['PG', 'SG'], team: 'Dallas Mavericks', age: 24, height: "6'7\"", weight: '230 lbs' },
  ]
  
  const positions = ['PG', 'SG', 'SF', 'PF', 'C']
  
  export default function PlayerDatabasePage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [players, setPlayers] = useState<Player[]>(initialPlayers)
    const [searchTerm, setSearchTerm] = useState('')
    const [ageRange, setAgeRange] = useState([18, 40])
    const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  
    const filteredPlayers = players.filter(player =>
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())) &&
      player.age >= ageRange[0] && player.age <= ageRange[1] &&
      (selectedPositions.length === 0 || player.position.some(pos => selectedPositions.includes(pos)))
    )
  
    const handlePositionChange = (pos: string) => {
      setSelectedPositions(prev => 
        prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
      )
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Player Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range: {ageRange[0]} - {ageRange[1]}</label>
              <input
                type="range"
                min="18"
                max="40"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="18"
                max="40"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Positions:</label>
              <div className="flex flex-wrap gap-2">
                {positions.map(pos => (
                  <label key={pos} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPositions.includes(pos)}
                      onChange={() => handlePositionChange(pos)}
                      className="form-checkbox h-5 w-5 text-orange-600"
                    />
                    <span className="ml-2">{pos}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlayers.map((player) => (
                  <tr key={player.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.position.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.height}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="secondary" className="mr-2">Edit</Button>
                      <Button variant="outline">View Stats</Button>
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