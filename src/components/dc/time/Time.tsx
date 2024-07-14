
type TimeProps = {
    time: string
}
export function Time(props: TimeProps) {
    const {time} = props
    return (
        <div className="mr-2 min-w-[50px] text-xs text-light w-max !min-w-0 text-end">
            {time}
        </div>
    );
}