import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MAX_AMOUNT_BTN = 5;

export default function PaginationNav({ page, totalPages, query }: { page: number; totalPages: number, query: string }) {
    let startBtn = Math.max(1, page - Math.floor(MAX_AMOUNT_BTN / 2));
    let endBtn = Math.min(totalPages, startBtn + MAX_AMOUNT_BTN - 1);
    if (endBtn - startBtn + 1 < MAX_AMOUNT_BTN)
        startBtn = Math.max(1, endBtn - MAX_AMOUNT_BTN + 1);

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className="my-8 flex gap-4 items-center justify-center"
        >
            {/* see if the page is already at 0 - if so, render the link as a disabled button instead */}
            {page - 1 > 0 ? (
                <Link
                    className="bg-[#846ab6] p-2 rounded cursor-pointer text-white flex items-center"
                    href={`?query=${query}&page=${page - 1}`} 
                >
                    <ChevronLeft size={20} /> Previous
                </Link>
            ) : (
                <button
                    className="bg-neutral-400 p-2  rounded cursor-pointer text-white flex items-center"
                    type="button"
                    disabled
                    aria-disabled="true"
                >
                    <ChevronLeft size={20} /> Previous
                </button>
            )}
            <div className="flex gap-2">
                {startBtn > 1 && (
                <>
                    <Link
                        key={1}
                        className="py-2 px-4 rounded cursor-pointer bg-neutral-200"
                        href={`?query=${query}&page=1`}
                    >
                        1
                    </Link>
                    {startBtn > 2 && <span className="py-2">...</span>}
                </>
                )}
                {Array.from({ length: endBtn - startBtn + 1 }, (_, i) => startBtn + i).map((i) => (
                    <Link
                    key={i}
                    className={`py-2 px-4 rounded cursor-pointe ${
                        i === page ? 'bg-[#846ab6] text-white' : 'text-gray-800 bg-neutral-200'
                    }`}
                    href={`?query=${query}&page=${i}`}
                    >
                    {i}
                    </Link>
                ))}
                {endBtn < totalPages && (
                <>
                    {endBtn < totalPages - 1 && <span className="py-2">...</span>}
                    <Link
                        key={totalPages}
                        className="py-2 px-4 rounded cursor-pointer bg-neutral-200"
                        href={`?query=${query}&page=${totalPages}`}
                    >
                        {totalPages}
                    </Link>
                </>
                )}                
            </div>
            {page + 1 <= totalPages ? (
                <Link
                    className="bg-[#846ab6] p-2 rounded cursor-pointer text-white flex items-center"
                    href={`?query=${query}&page=${page + 1}`}
                >
                    Next
                    <ChevronRight size={20} />
                </Link>
            ) : (
                <button
                    className="bg-neutral-400 p-2  rounded cursor-pointer text-white flex items-center"
                    type="button"
                    disabled
                    aria-disabled="true"
                >
                    Next
                    <ChevronRight size={20} />
                </button>
            )}
        </nav>
    );
}
