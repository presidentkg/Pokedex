export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-8">
        <h1 className="text-center text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch 'em all!</h1>
        <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br/> your favourite and learn about their stats.</p>
        <button className="p-1 pl-3 pr-3 mt-2 text-center cursor-pointer text-xl text-white bg-gradient-to-r from-orange-400 to-red-400 rounded-full font-bold">Random Pokémon</button>
      </section>
    </main>
  );
}
