'use client'

import {CrossCircledIcon} from '@radix-ui/react-icons'
import { CastEditContext } from "@/contexts/CastEditContext"
import { useContext } from "react"

export default function DeleteReplyButton() {
    const cx = useContext(CastEditContext)

    const handleOnClick = (e: any) => {
        e.preventDefault()
        if (cx.replyIndex !== undefined) {
            cx.deleteReply(cx.replyIndex)
        }
    }
    return (
        <button
            onClick={handleOnClick} 
        >
            <CrossCircledIcon width={16} height={16}/>
        </button>
    )
}