import { AlertTriangle, Loader2Icon, LoaderIcon, VerifiedIcon } from "lucide-react"
import { useCallback, useRef } from "react"

import AlertPill from "components/Pill/Pill"
import Image from "next/image"
import ResultModal from "./Modal"
import { Scrapy } from "types"

interface State {
  text: string
  type: "success" | "error" | "warning"
  Icon: any
}
interface CardProps {
  showDescription: boolean
  data: Scrapy
  onClick?: () => void
}
export const TaskCard = ({ showDescription = true, data, onClick }: CardProps) => {
  const ref = useRef<HTMLDialogElement>(null)

  const openResultModel = useCallback(() => {
    if (onClick) return onClick()
    ref.current?.showModal()
  }, [])
  const getState = (): State => {
    switch (data.status) {
      case "PROCESSING":
        return {
          text: "جارى المعالجة",
          type: "warning",
          Icon: Loader2Icon,
        }
      case "PENDING":
        return {
          text: "لحظات قليلة ويبدأ",
          type: "warning",
          Icon: LoaderIcon,
        }
      case "SUCCESS":
        return {
          text: "تمت العمليه بنجاح",
          type: "success",
          Icon: VerifiedIcon,
        }
      case "FAILED":
        return {
          text: "فشلت العملية",
          type: "error",
          Icon: AlertTriangle,
        }
      default:
        return {
          text: "جارى المعالجة",
          type: "warning",
          Icon: Loader2Icon,
        }
    }
  }

  return (
    <div className="mx-auto w-[300px]">
      {data.status === "SUCCESS" && !onClick && <ResultModal innerRef={ref} result={data.result} title={data.title} />}
      <AlertPill text={getState().text} type={getState().type} Icon={getState().Icon} />
      <div className="relative mt-4 flex h-fit flex-col rounded-xl border border-gray-700 bg-gray-800 pb-2">
        <Image
          onClick={openResultModel}
          src={data.poster}
          alt={`${data.title} Poster | AEbot`}
          width={300}
          height={100}
          className="rounded-t-xl"
        />
        <Image
          src={data.logo}
          width={64}
          height={64}
          className="absolute right-5 top-5 cursor-pointer rounded-lg bg-black p-2"
          alt={`${data.service} Logo`}
          onClick={() => window.open(data.link, "_blank")}
        />

        <div className="flex max-w-sm flex-row justify-between gap-4 p-4" dir="rtl">
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-300">إسم المسلسل</span>
            <h1 className="text-sm font-bold text-gray-100">{data.title}</h1>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-300">عدد الحلقات</span>
            <h1 className="text-sm font-bold text-gray-100">{data.episodes_count}</h1>
          </div>
        </div>
        {showDescription && (
          <div dir="rtl">
            <span className="text-xs text-gray-300">وصف المسلسل</span>
            <p className="px-2 text-xs font-semibold text-gray-100 ">{data.story}</p>
          </div>
        )}
      </div>
    </div>
  )
}
