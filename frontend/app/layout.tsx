import "styles/tailwind.css"

import { AuthProvider } from "hooks/useAuth"
import HeaderText from "components/Layout/StringH1"
import { Metadata } from "next"
import { ReactQueryClientProvider } from "components/ReactQueryProvider"
import { Toaster } from "react-hot-toast"
import { UCard } from "components/User/Card"
import { arabic } from "app/fonts"
import classNames from "classnames"

export const metadata: Metadata = {
  title: "AEbot - التحميل من أي موقع مشاهدة مره واحدة",
  description: "أونلاين بوت لتحميل المسلسلات برابط واحد من مواقع المشاهدة العربية زي أكوام وعرب سيد وغيرها",
  icons: [
    // Apple Touch Icons
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      url: "/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      url: "/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      url: "/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      url: "/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      url: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      url: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      url: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      url: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-icon-180x180.png",
    },

    // Favicons (Android, misc.)
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-icon-192x192.png",
    },
    {
      rel: "icon",
      url: "/android-chrome-384x384.png",
      type: "image/png",
      sizes: "384x384",
    },
    {
      rel: "manifest",
      url: "/manifest.json",
    },
  ],
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames("flex min-h-screen bg-gray-900", arabic.className)}>
        <div className="m-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16 ">
          <Toaster />
          <AuthProvider>
            <HeaderText />
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
            <UCard />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
