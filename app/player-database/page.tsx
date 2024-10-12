'use client'

import { useState } from 'react'
import { Player } from '@/types/Player'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card/Card'
import { Input } from '@/components/Input/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Slider } from '@/components/Slider'
import { PLAYERS } from '@/mockData'
import PlayerCard from '@/components/PlayerCard/PlayerDatabaseCard'

const positions = ['PG', 'SG', 'SF', 'PF', 'C']
const leagues = ['NBA', 'WNBA', 'EuroLeague', 'G League']
type SortOptionType = 'name' | 'age' | 'salary' | 'height' | 'league' | 'weight' | 'contractYears' | 'rebounds' | 'team' | 'ppg' | 'assists' | 'steals' | 'blocks'
const SortOptions:SortOptionType[]  = ['name', 'team', 'league', 'contractYears', 'rebounds', 'salary', 'age', 'height', 'weight', 'ppg' , 'assists' , 'steals' , 'blocks']

export default function PlayerDatabasePage() {
  const initialPlayers = PLAYERS

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [searchTerm, setSearchTerm] = useState('')
  const [ageRange, setAgeRange] = useState([18, 40])
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOptionType>('name')

  const handlePositionChange = (pos: string) => {
    setSelectedPositions(prev => 
      prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
    )
  }

  const handleLeagueChange = (league: string) => {
    setSelectedLeagues(prev => 
      prev.includes(league) ? prev.filter(l => l !== league) : [...prev, league]
    )
  }
  

  const filteredPlayers = players.filter(player =>
    (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())) &&
    player.age >= ageRange[0] && player.age <= ageRange[1] &&
    (selectedPositions.length === 0 || player.position.some(pos => selectedPositions.includes(pos))) &&
    (selectedLeagues.length === 0 || selectedLeagues.includes(player.league))
  ).sort((a, b) => {
    if(typeof(a[sortBy]) === 'number' && typeof(b[sortBy]) === 'number') return b[sortBy] - a[sortBy]
    if(typeof(a[sortBy]) === 'string' && typeof(b[sortBy]) === 'string') return a[sortBy].localeCompare(b[sortBy])
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Database</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOptionType)}>
              <SelectTrigger className="capitalize w-52">
                <span className='font-light text-xs w-8'>Sort By:</span>
                <SelectValue placeholder="Sort by "/>
              </SelectTrigger>
              <SelectContent>
                {
                  SortOptions.map(option => 
                    <SelectItem value={option} key={option}>{option}</SelectItem>
                  )
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range: {ageRange[0]} - {ageRange[1]}</label>
            <Slider
              min={18}
              max={40}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leagues:</label>
            <div className="flex flex-wrap gap-2">
              {leagues.map(league => (
                <label key={league} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLeagues.includes(league)}
                    onChange={() => handleLeagueChange(league)}
                    className="form-checkbox h-5 w-5 text-orange-600"
                  />
                  <span className="ml-2">{league}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}