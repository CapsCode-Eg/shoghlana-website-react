import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    isDark?: boolean
    withoutMargin?: boolean
    onPageChange: (page: number) => void;
}

export default function Pagination({ isDark, currentPage, totalPages, onPageChange, withoutMargin }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: any = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if total pages are 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Complex pagination with ellipsis
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };
    console.log(currentPage)

    return (
        <div className={`flex items-center relative z-[10] justify-center space-x-3  ${withoutMargin ? "mt-0" : "mt-[65px]"}`}>
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rotate-180 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Previous page"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={currentPage === 1 ? "#525252" : "#0357D9"} strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className={`px-4 py-2  ${isDark ? "text-main text-[20px] font-bold -mb-3" : "text-[20px] font-bold -mb-3 text-main"}`}>. . .</span>
                    ) : (
                        <button
                            onClick={() => typeof page === 'number' && onPageChange(page)}
                            className={`hover:cursor-pointer px-3 font-medium text-[16px] md:px-4 py-1.5 md:py-2 rounded-lg ${currentPage === page
                                ? 'bg-main text-white'
                                : 'text-main bg-[white] border-[1px] border-[#D6D6D6]'
                                }`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rotate-180 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Next page"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={currentPage === totalPages ? "#525252" : "#0357D9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

