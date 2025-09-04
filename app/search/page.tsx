import PokemonSearchBar from "@/components/pokemon-search-bar";
import PokemonSearchResults from "@/components/pokemon-search-results";

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;
    const query = params.query || "";
    const currentPage = parseInt(params.page || "1");

    return(
        <div>
            <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
                    <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch 'em all!</h1>
                    <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
            </section>
            <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#F4E7FA,_#FFFFFF)] p-14 min-h-screen">
                <div className="w-full max-w-4xl">
                    <PokemonSearchBar />
                </div>
                <PokemonSearchResults query={query} currentPage={currentPage} />
            </section>
        </div>
    )
}