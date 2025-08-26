import Link from "next/link";
import Image from "next/image";
import data from "@/lib/data/pages.json";

export default async function NavBar() {
  return (
    <nav className="breakout flex items-center justify-between py-4 px-8">
        <Link className="flex items-center gap-2" href={"/"}>
            <Image
            src="/Logo.png"
            alt="Logo"
            width={32}
            height={32}
            />
            <span className="text-xl font-bold text-purple-800">Pokédex</span>
        </Link>
        <ul className="flex gap-4">
            {data["pages"].map((link, index) => (
            <li key={index}>
                <Link
                className="font-bold p-4 block hover:bg-gray-500 hover:text-neutral-100"
                href={link.href}
                >
                {link.label}
                </Link>
            </li>
            ))}
        </ul>
    </nav>
  );
}