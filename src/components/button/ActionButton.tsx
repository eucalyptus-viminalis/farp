import { ReactNode } from "react"

type ActionButtonProps = {
    withBg?: boolean
    handleOnClick: Function
    children: ReactNode
}
export default function ActionButton(props: ActionButtonProps) {
    const {withBg, handleOnClick, children} = props
    return (
        <button
            className={`
                w-[10ch]
                p-2
                font-semibold
                ${withBg ? 'bg-red-600 text-light' : 'text-red-600'}
            `}
            onClick={()=>handleOnClick('preview')}
        >{children}</button>
    )
}