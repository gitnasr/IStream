import React from "react"
import { SendHorizontal } from "lucide-react"
import classNames from "classnames"
interface StartButtonProps {
  value: string
  start: () => void
  disabled: boolean
}
const StartButton: React.FC<StartButtonProps> = ({ value, start, disabled }) => {
  return (
    <button
      disabled={value.length === 0 || disabled}
      onClick={start}
      className={classNames("absolute inset-y-0 left-1 z-50 m-auto rounded-xl p-2", {
        "cursor-not-allowed text-gray-600": value.length === 0,
        "cursor-pointer text-gray-300": value.length > 0,
      })}
    >
      <SendHorizontal className="px-2 bg-gray-800 h-9 w-9 rounded-xl" />
    </button>
  )
}

export default StartButton
