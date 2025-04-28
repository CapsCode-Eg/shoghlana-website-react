
interface ScrollButtonProps {
    direction: 'left' | 'right';
    classes?: string;
    onClick: () => void;
}

export default function ScrollButton({ direction, onClick, classes }: ScrollButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`absolute w-[40px] h-[40px] top-0 md:-top-[75px]
                flex flex-col items-center justify-center
                ${classes ? classes : "bg-main"}  rounded-[8px] shadow-lg hover:bg-main/80 transition-colors 
                ${direction === 'right' ? 'right-0 md:-right-5' : 'right-[50px] md:right-10'} z-10`}
            // style={{ [direction]: '0.5rem' }}
            aria-label={`Scroll ${direction}`}
        >
            {direction === 'left' ? (
                <svg className='rotate-180' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.5369H19M19 12.5369L12 5.53687M19 12.5369L12 19.5369" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            ) : (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.5369H19M19 12.5369L12 5.53687M19 12.5369L12 19.5369" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )}
        </button>
    );
}