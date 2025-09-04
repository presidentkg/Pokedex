import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationNav({ page, totalPages }: { page: number; totalPages: number }) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className="my-8 flex gap-4 items-center justify-center"
        >
            {/* see if the page is already at 0 - if so, render the link as a disabled button instead */}
            {page - 1 > 0 ? (
                <Link
                    className="bg-neutral-200 p-2 rounded cursor-pointer dark:text-neutral-900 flex items-center"
                    href={`?page=${page - 1}`}
                >
                    <ChevronLeft size={20} /> Previous
                </Link>
            ) : (
                <button
                    className="bg-neutral-500 p-2  rounded cursor-pointer dark:text-neutral-900 flex items-center"
                    type="button"
                    disabled
                    aria-disabled="true"
                >
                    <ChevronLeft size={20} /> Previous
                </button>
            )}
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Link
                    key={i}
                    className={`py-2 px-4 rounded cursor-pointer dark:text-neutral-900 ${
                        i + 1 === page ? "bg-neutral-400" : "bg-neutral-200"
                    }`}
                    href={`?page=${i + 1}`}
                    >
                    {i + 1}
                    </Link>
                ))}
            </div>
            {/* see if the page is higher than pages divided with items per page - if so, render the link as a disabled button */}
            {page + 1 <= totalPages ? (
                <Link
                    className="bg-neutral-200 p-2 rounded cursor-pointer dark:text-neutral-900 flex items-center"
                    href={`?page=${page + 1}`}
                >
                    Next
                    <ChevronRight size={20} />
                </Link>
            ) : (
                <button
                    className="bg-neutral-500 p-2  rounded cursor-pointer dark:text-neutral-900 flex items-center"
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
