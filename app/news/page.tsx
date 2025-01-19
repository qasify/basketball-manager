import Button from "@/components/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { Input } from "@/components/Input/Input"


export default function NewsPage() {
  // This would typically come from an API or database
  const newsItems = [
    {
      id: 1,
      title: "Lakers sign new star player",
      description: "The Los Angeles Lakers have signed a new star player to bolster their roster for the upcoming season.",
      date: "2023-07-15",
    },
    {
      id: 2,
      title: "NBA announces new tournament",
      description: "The NBA has announced a new mid-season tournament to increase competitiveness and fan engagement.",
      date: "2023-07-14",
    },
    {
      id: 3,
      title: "Rising star breaks scoring record",
      description: "A young NBA player has broken the scoring record for most points in a single game by a rookie.",
      date: "2023-07-13",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Basketball News</h1>
      <div className="flex space-x-4">
        <Input placeholder="Search news..." className="max-w-sm" />
        <Button>Search</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <>{item.date}</>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}