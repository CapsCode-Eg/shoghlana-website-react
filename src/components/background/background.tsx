
export default function Background({ linesOnly, blueOnly, image }: { blueOnly?: boolean, linesOnly?: boolean, image?: string }) {
    return (
        <div className={`absolute w-[100%] rounded-[25px] max-h-[853px] ${linesOnly ? "z-[4]" : "-z-[10]"} h-full  overflow-hidden`}>
            {!linesOnly && <img src={image || '/assets/home-01.jpg'} alt='background' className='object-cover' />}
            {!blueOnly &&
                <img src={'/assets/lines.png'} alt='background' className={`${linesOnly && "opacity-40"} object-cover`} />
            }
            {blueOnly &&
                <img src={'/assets/linesBlue.png'} alt='background' className={`${linesOnly && "opacity-40"} object-cover w-full`} />
            }
        </div>
    )
}
