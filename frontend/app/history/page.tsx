"use client"

import { Loading } from "react-daisyui"
import { TaskCard } from "components/Task/Card"
import { useAuth } from "hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const History = () => {
  const { user, isAuthenticated, update } = useAuth()
  const router = useRouter()
  if (!isAuthenticated || !user) return <Loading />
  useEffect(() => {
    update()
  }, [])
  if (!user.scrapies.length) return <p>مفيش عمليات سابقة ليك، تقدر توصل لكل عملياتك من هنا</p>
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 " dir="rtl">
      {user.scrapies.map((scrapy) => (
        <TaskCard showDescription={false} data={scrapy} onClick={() => router.push(`/task/${scrapy.operationId}`)} />
      ))}
    </div>
  )
}

export default History
