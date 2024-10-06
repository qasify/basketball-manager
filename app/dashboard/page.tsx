import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Players</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">450</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">30</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Games</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">12</p>
        </CardContent>
      </Card>
      {/* Add more dashboard widgets here */}
    </div>
  )
}