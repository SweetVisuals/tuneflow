"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { Layout } from "@/components/layout"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setAuthenticated(!!session?.user)
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Layout authenticated={authenticated}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="flex gap-4 mb-6 overflow-x-auto">
          {['discover', 'files', 'connect', 'videos', 'audio', 'create', 'profile', 'recent', 'liked', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <Dashboard activeTab={activeTab} />
      </div>
    </Layout>
  )
}
