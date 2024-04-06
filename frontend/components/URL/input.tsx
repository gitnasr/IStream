"use client"

import { ChangeEvent, useState } from "react"

import Backend from "libs/API"
import { Quality } from "./Quality"
import StartButton from "./Button"
import { arabic } from "app/fonts"
import classNames from "classnames"
import toast from "react-hot-toast"
import useAutoParse from "hooks/useAutoParse"
import { useRouter } from "next/navigation"

const URLInput: React.FC = () => {
  const { value, getValue, update } = useAutoParse()
  const [q, setQ] = useState("1080")
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const Start = async () => {
    try {
      setLoading(true)
      const API = new Backend()
      const Scrapy = await API.post("/engine/start", { link: value, q, source: "BY_WEBSITE" }, true)
    await  router.push(`/task/${Scrapy.operationId}`)
      
    } catch (error) {
      toast.error("انت مدخل لينك فيلم او حلقة، البوت مخصص للمسلسلات حط لينك المسلسل")
    }finally{
      setLoading(false)
    }
  
  }
  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="relative flex-1">
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            update(e.currentTarget.value)
          }}
          value={value}
          onClick={getValue}
          className={classNames(
            "w-full rounded-xl bg-gray-600 p-4 text-gray-300 shadow-lg  ring-1 ring-indigo-800 focus:outline-0 focus:ring-2 focus:ring-indigo-600 ",
            arabic.className
          )}
          placeholder="حط لينك المسلسل من الموقع هنا ..."
          dir="rtl"
        />
        <StartButton value={value} start={Start} disabled={loading}/>
      </div>
      <Quality quality={q} setQuality={setQ} disabled={loading}/>
    </div>
  )
}

export default URLInput
