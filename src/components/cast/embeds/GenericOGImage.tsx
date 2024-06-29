export default function GenericOGImage() {
    return (
        <img
            loading="lazy"
            src="/Link.png"
            alt="OpenGraph image"
            className="border bg-[#efefef] object-cover border-faint dark:bg-[#17101f] max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] rounded-lg"
        />
    );
}
