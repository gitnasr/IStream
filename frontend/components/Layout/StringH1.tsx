import Image from "next/image"
import Link from "next/link"

const HeaderText: React.FC = () => {
  return (
    <Link href="/" className="flex flex-row items-center gap-2 m-auto text-6xl md:text-5xl xl:text-6xl">
      <h1 className="mb-4 font-extrabold leading-none tracking-tight text-center text-transparent bg-gradient-to-r from-pink-500 to-pink-900 bg-clip-text ">
        AEBot
      </h1>
      <Image src="/512.png" width={16} height={16} alt="AEBot" />
    </Link>
  )
}

export default HeaderText
