import { NextRequest, NextResponse, userAgent } from "next/server"

interface IDevice extends NextRequest {
  device: string
}
export function middleware(request: IDevice) {
  const { device } = userAgent(request)
  const viewport = device.type === "mobile" ? "mobile" : "desktop"

  const response = NextResponse.next()
  response.cookies.set({
    name: "device",
    value: viewport,
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
