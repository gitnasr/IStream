"use client"

import { TaskCard } from "components/Task/Card"
import { useAuth } from "hooks/useAuth"
import { useRouter } from "next/navigation"
const History = () => {
  const { user,isAuthenticated } = useAuth()
  const router = useRouter()
  if (!user) return (<div>loading...</div>)
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3">
      {user.scrapies.map((scrapy) => (
        <TaskCard showDescription={false} data={scrapy} onClick={() => router.push(`/task/${scrapy.operationId}`)} />
      ))}
    </div>
  )
}

export default History
