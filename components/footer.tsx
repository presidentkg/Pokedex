import Image from "next/image";

export default async function Footer() {
  return (
    <section className="flex flex-col items-center gap-4 py-10 bg-[#2D2D2D]">
        <div className="flex items-center gap-2">
            <Image
                src="/Logo.png"
                alt="Logo"
                width={32}
                height={32}
            />
            <span className="text-xl font-bold text-white">Pokédex</span>
        </div>
        <p className="text-white">Explore the world of pokemon</p>
        <div className="flex flex-row gap-8">
            <Image
                src="/Facebook.svg"
                alt="Facebook"
                width={32}
                height={32}
            />
            <Image
                src="/Instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
            />
        </div>        
    </section>
  );
}