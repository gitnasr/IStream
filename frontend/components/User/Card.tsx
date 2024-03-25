"use client"

import * as HoverCard from "@radix-ui/react-hover-card"

import Image from "next/image"
import Link from "next/link"
import { Loading } from "react-daisyui"
import moment from "moment"
import { useAuth } from "hooks/useAuth"

export const UCard = () => {
  const {isAuthenticated,user} = useAuth()
  if (!isAuthenticated || !user) {
    return <Loading />
  }
 
  return (
    <div className="fixed inset-x-0 bottom-5">
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <Link
            className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
            href="/history"
            rel="noreferrer noopener"
          >
            <Image
              alt="AEbot"
              width={48}
              height={48}
              className="inline-flex h-[48px] w-[48px] select-none items-center justify-center overflow-hidden rounded-full align-middle shadow ring-2"
              src={user.avatar}
            />
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-gray-800 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
            sideOffset={5}
          >
            <div className="flex flex-col gap-[7px]">
              <div className="flex flex-col gap-[15px]">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <Image
                      alt="AEbot"
                      width={64}
                      height={64}
                      className="inline-flex h-[48px] w-[48px] select-none items-center justify-center overflow-hidden rounded-full align-middle shadow ring-2"
                      src={user.avatar}
                    />
                    <div>
                      <div className="m-0 text-[15px] leading-[1.5] text-white">@{user?.username}</div>
                      <div className="m-0 text-xs leading-[1.5] text-gray-400">
                        {moment(user.lastActivity).format("LLL")}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl text-white">{user.scrapies.length}</h4>
                </div>
              </div>
            </div>

            <HoverCard.Arrow className="fill-white" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </div>
  )
}
