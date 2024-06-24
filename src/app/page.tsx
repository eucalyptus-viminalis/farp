import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col gap-4 items-center justify-start p-24">
            <Link
                className="border p-2 border-white"
                href={"edit"}
            >
                Edit
            </Link>
            <Link
                className="border p-2 border-white"
                href={"image-embed-single"}
            >
                Image embed single
            </Link>
            <Link
                className="border p-2 border-white"
                href={"image-embed-double"}
            >
                Image embed double
            </Link>
            <Link href={"quote-cast"} className="border p-2 border-white">
                Quote cast
            </Link>
        </main>
    );
}
