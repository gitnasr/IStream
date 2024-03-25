"use client" // Error components must be Client Components

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    
  return (
    <div className="flex">

        <h2>مفيش عملية بالرقم ده، إتأكد من الرقم وحاول تاني</h2>
    </div>
  )
}
