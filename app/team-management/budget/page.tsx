"use client"

import Button from "@/components/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// You would typically fetch this data from an API or database
const initialBudgetData = {
  totalBudget: 100000000, // $100 million
  spentBudget: 75000000,  // $75 million
  categories: [
    { name: "Player Salaries", amount: 65000000 },
    { name: "Staff Salaries", amount: 5000000 },
    { name: "Operations", amount: 3000000 },
    { name: "Marketing", amount: 2000000 },
  ]
}

export default function BudgetTrackingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [budgetData, setBudgetData] = useState(initialBudgetData)

  const remainingBudget = budgetData.totalBudget - budgetData.spentBudget
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const spentPercentage = (budgetData.spentBudget / budgetData.totalBudget) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budget Tracking</h1>
        <Link href="/team-management">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team Management
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budgetData.totalBudget.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spent Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${budgetData.spentBudget.toLocaleString()}</p>
            {/* <Progress value={spentPercentage} className="mt-2" /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${remainingBudget.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.categories.map((category) => (
              <div key={category.name} className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="font-bold">${category.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}