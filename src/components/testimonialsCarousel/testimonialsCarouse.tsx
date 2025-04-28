import { useRef, useState, useEffect } from 'react';

import HomePageCard from '../homePageCard/homePageCard';
import ScrollButton from './scrollButton';
import './style.css'

const SCROLL_AMOUNT = 300;

export function TestimonialsCorouse() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [, setShowLeftButton] = useState(false);
    const [, setShowRightButton] = useState(true);
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    return (
        <div className="rounded-[20px] mt-[35px] relative">
            <ScrollButton direction="left" onClick={() => scroll('left')} />
            <ScrollButton direction="right" onClick={() => scroll('right')} />

            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-2 ps-[20px] pe-[20px] scrollbar-hide scroll-smooth"
                onScroll={checkScroll}
            >

                {Array.from({ length: 10 }).map((_, index) => (
                    <HomePageCard key={index} />
                ))}
            </div>
        </div>
    );
}