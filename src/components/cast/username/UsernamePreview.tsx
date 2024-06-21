type UsernamePreviewProps = {
    username: string;
    asEmbed?: boolean;
};

export default function UsernamePreview(props: UsernamePreviewProps) {
    // Props
    const { asEmbed, username } = props;

    return (
        <span className="relative h-min w-auto" data-state="closed">
            <a
                className={`
                    relative text-muted hover:underline 
                    ${asEmbed ? "text-sm" : ""}
                `}
            >
                {"@" + username}
            </a>
        </span>
    );
}
