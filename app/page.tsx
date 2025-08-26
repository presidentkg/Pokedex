import RandomPokemons from "@/components/RandomPokemons";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch 'em all!</h1>
        <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
        <button className="btn-primary">
          <Image
            src="/Dice.svg"
            width={25}
            height={25}
            alt="Dice"
          />
          Random Pokémon</button>
      </section>
      <section className="flex justify-center mt-10 mb-10">
        <div className="flex items-center w-full max-w-lg rounded-lg shadow-md">
          <input
            type="search"
            placeholder="Search for a Pokémon..."
            className="flex-grow rounded-l-full text-gray-700 focus:outline-none px-4"
          />
          <button className="flex items-center justify-center h-10 w-10 m-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors">
            <Image
              src="/Search.svg"
              alt="Search icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#F4E7FA,_#FFFFFF)] p-14">
        <h2 className="text-4xl">Featured Pokémon</h2>
        <RandomPokemons numberOfPokemonToFetch={4} />
      </section>
    </main>
  );
}
