'use client'

import { useState } from 'react'
import  Button  from '@/components/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card/Card'
import Image from 'next/image'
import { Input } from '@/components/Input/Input'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    router.push('dashboard')
    console.log('Login attempt with:', email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/basketball-logo.svg"
              alt="Basketball Manager Logo"
              width={100}
              height={100}
            />
          </div>
          <CardTitle className="text-center text-3xl text-orange-800">
            Basketball Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}