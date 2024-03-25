import classNames from "classnames"
import { LucideIcon } from "lucide-react"
import React, { ReactComponentElement } from "react"
interface AlertPillProps {
  text: string
  Icon: LucideIcon
  type: "success" | "error" | "warning"
}
const AlertPill = ({ text, Icon, type, ...props }: AlertPillProps) => {
  return (
    <span
      className={classNames("inline-flex w-fit items-center justify-center  rounded-full px-2.5 py-0.5", {
        "bg-emerald-100 text-emerald-700": type === "success",
        "bg-red-100 text-red-700": type === "error",
        "bg-amber-100 text-amber-700": type === "warning",
      })}
      dir="rtl"
      {...props}
    >
      <Icon className="-ms-1 me-1.5 h-4 w-4" />
      <p className="whitespace-nowrap text-sm">{text}</p>
    </span>
  )
}

export default AlertPill
