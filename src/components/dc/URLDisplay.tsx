export default function URLDisplay() {
    const url = "https://ham.fun/dashboard"
    const display = 'ham.fun/dashboard'
    return (
        <a
            className="relative inline cursor-pointer text-link hover:underline underline"
            title={url}
            href={url}
            target="_blank"
        >
            {display}
        </a>
    );
}
