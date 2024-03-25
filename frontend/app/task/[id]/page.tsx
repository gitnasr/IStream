"use client"

import React, { Suspense, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Actions } from "types"
import Backend from "libs/API"
import Loading from "./loading"
import { TaskCard } from "components/Task/Card"
import { useAuth } from "hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

interface TaskProps {
  params: {
    id: string
  }
}
const Task: React.FC<TaskProps> = ({ params }) => {
  const [isEnabled, setIsEnabled] = React.useState(true)
  const UpdateState = async () => {
    const API = new Backend()
    const data = await API.get(`/engine/status?id=${params.id}`)
    if (data.status !== "PROCESSING" && data.status !== "PENDING") {
      setIsEnabled(false)
      await API.Track(Actions.VIEW, data.operationId)
    }

    return data
  }
  const { data, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: UpdateState,
    throwOnError: true,
    enabled: isEnabled,
    refetchOnMount: "always",
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <Loading />
  return <TaskCard showDescription data={data} />
}

export default Task
