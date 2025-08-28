"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function PokemonSearch(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const queryString = formData.get("query") as string;
        const params = new URLSearchParams(searchParams);
        if (queryString) {
        params.set("query", queryString);
        } else {
        params.delete("query");
        }
        replace(`${pathname}?${params}`);
    }

    return(
        <div className="flex items-center w-full rounded-lg shadow-md">
            <form onSubmit={handleClick} className="flex w-full items-center">
                <input
                type="search"
                placeholder="Search for a Pokémon..."
                className="flex-grow rounded-l-full text-gray-700 focus:outline-none px-4"
                name="query"
                />
                <button className="flex items-center justify-center h-10 w-10 m-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors">
                    <img
                    src="/Search.svg"
                    alt="Search icon"
                    width={20}
                    height={20}
                    />
                </button>
            </form>
        </div>
    )}