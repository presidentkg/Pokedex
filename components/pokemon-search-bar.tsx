"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";

export default function PokemonSearchBar(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (search: string) => {
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set("query", search);
            params.delete("page");
        } else {
            params.delete("query");
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const queryString = formData.get("query") as string;
        handleSearch(queryString);
    }

    return(
        <div className="flex items-center w-full rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex w-full items-center">
                <input
                    type="search"
                    placeholder="Search for a Pokémon..."
                    className="flex-grow rounded-l-full text-gray-700 focus:outline-none px-4"
                    name="query"
                    onChange={handleInputChange}
                />
                <button className="flex items-center justify-center h-10 w-10 m-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors">
                    <Image
                    src="/Search.svg"
                    alt="Search icon"
                    width={20}
                    height={20}
                    />
                </button>
            </form>
        </div>
    )}