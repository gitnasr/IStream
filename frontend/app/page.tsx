"use client"

import { AlertCircle, CheckCheckIcon } from "lucide-react"

import AlertPill from "components/Pill/Pill"
import URLInput from "components/URL/input"

export default function Web() {
  return (
    <>
      <div className="mx-auto place-self-center">
        <p className="max-w-2xl mb-6 text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
          البوت الاول للتحميل من منصات المشاهدة العربية، يمكنك تحميل أي مسلسل من أي منصة من خلال ضغطه زر واحدة
        </p>
        <div className="flex flex-col justify-center mx-auto my-5" dir="rtl">
          <div className="flex flex-row justify-center gap-2">
            <AlertPill text="أكوام" Icon={CheckCheckIcon} type="success" />
            <AlertPill text="عرب سيد" Icon={AlertCircle} type="error" />
          </div>
        </div>
        <URLInput />
      </div>
    </>
  )
}
