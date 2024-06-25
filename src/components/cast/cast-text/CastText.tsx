type CastTextProps = {
    castText: string
}
export default function CastText(props: CastTextProps) {
    const {castText} = props
    const lines = castText.split('\n')
    return (
                    <div
                        // className={`
                        //     absolute
                        //     top-0
                        //     text-inherit
                        //     w-full
                        //     outline-none
                        // `}
                    >
                        {lines.map((line, i) => {
                            return (
                                <div key={i}>
                                    {line.split(' ').map((word, i) => {
                                        if (/^@\w+/.test(word)) {
                                            return (
                                                <span key={i} className={'m'}>
                                                    {i!== 0 ? ' ' + word : word}
                                                    {/* {caretOnMention && userListQ && (
                                                        <UserList deferredQ={userListQ}/>
                                                    )} */}
                                                </span>
                                            )
                                        } else if (/^\/\w+/.test(word)){
                                            return (
                                                <span key={i} className={'m'}>
                                                    {i!== 0 ? ' ' + word : word}
                                                </span>
                                            )
                                        } else {
                                            return (
                                            <span key={i} className={``}>
                                                {i!== 0 ? ' ' + word : word}
                                            </span>
                                            )
                                        }
                                    })}

                                {i !== lines.length -1 && (
                                    <br></br>
                                )}
                                </div>
                            )
                        })}
                    </div>
    )
}