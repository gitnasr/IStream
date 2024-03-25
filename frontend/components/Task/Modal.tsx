import { Actions, ScrapyResponse } from "types"
import { Button, Modal } from "react-daisyui"

import Backend from "libs/API"
import { TextFile } from "libs/Download"
import toast from "react-hot-toast"
import { useCopyToClipboard } from "usehooks-ts"

interface ResultProps {
  innerRef: React.RefObject<HTMLDialogElement>
  result: ScrapyResponse
  title: string
}
const ResultModal: React.FC<ResultProps> = ({ innerRef, result, title }) => {
  const [_, copy] = useCopyToClipboard()
  const Tracker = (action: string) => {
    const API = new Backend()
    switch (action) {
      case "COPY":
        copy(result.Links.join("\n"))
        toast.success("تم النسخ بنجاح")
        return API.Track(Actions.COPY, result.ScrapyId)
      case "DOWNLOAD_TEXT":
        TextFile(title, [result.Links.join("\n")])
        toast.success("تم تحميل اللينكات بنجاح")
        return API.Track(Actions.DOWNLOAD, result.ScrapyId)
      case "DOWNLOAD_ADM":
        TextFile("adm", [result.Links.join("\n")])
        toast.success("تم تحميل اللينكات بنجاح")
        return API.Track(Actions.DOWNLOAD, result.ScrapyId)
    }
  }
  return (
    <Modal ref={innerRef} className="w-full rounded-2xl bg-slate-800" backdrop responsive>
      <div className="max-w-md mt-3 text-right">
        <h4 className="text-xs text-gray-400 ">إضغط علي اللينكات للنسخ</h4>

        <textarea
          onClick={() => Tracker("COPY")}
          id="links"
          readOnly
          rows={result.count}
          className="w-full p-3 my-2 overflow-hidden text-gray-100 bg-gray-800 rounded-lg cursor-pointer resize-none max-h-80 ring-2 ring-green-600 focus:outline-none"
          value={result?.Links?.join("\n")}
        />
        <h4 className="mb-3 text-xs text-center">Estimated Download Size {result.size}</h4>
        <div className="flex flex-col">
          <p className="text-center text-gray-300">
            دي لينكات التحميل المباشرة للمسلسل تقدر تاخدها كوبي او تحمل اللينكات كملف تيكست وتحطه علي برنامج تحميل
          </p>
          <div className="flex flex-col justify-center w-full gap-4 md:flex-row" dir="rtl">
            <Button className="mt-2" onClick={() => Tracker("DOWNLOAD_TEXT")}>
              تحميل بصيغة TXT
            </Button>
            <Button onClick={() => Tracker("DOWNLOAD_ADM")} className="mt-2">
              تحميل بصيعة ADM
            </Button>
          </div>
          <a className="mt-3 text-xs text-center cursor-pointer hover:underline" href="https://youtu.be/hq6kIyFunTk?t=103" target="_blank">
            لو مش عارف إزاي ممكن تحط اللينكات علي برامج التحميل دوس هنا
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default ResultModal
