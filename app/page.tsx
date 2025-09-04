import SearchBar from "@/components/search-bar";
import RandomPokemonBtn from "@/components/random-pokemon-btn";
import RandomPokemonGrid from "@/components/random-pokemon-grid";


export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch &apos;em all!</h1>
        <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
        <RandomPokemonBtn />
      </section>
      <section className="flex justify-center mt-10 mb-10">
        <div className="w-full max-w-lg">
          <SearchBar />
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#F4E7FA,_#FFFFFF)] p-14">
        <h2 className="text-4xl">Featured Pokémon</h2>
        <RandomPokemonGrid numberOfPokemonToFetch={4} />
      </section>
    </div>
  );
}
