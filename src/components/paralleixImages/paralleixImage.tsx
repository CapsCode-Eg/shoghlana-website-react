import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    wrap
} from "framer-motion";

interface ParallaxImageProps {
    images: string[]; // Array of image URLs
    baseVelocity: number;
    bg?: string | undefined;
}

export default function ParallaxImage({ images, baseVelocity = 100, bg }: ParallaxImageProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 500
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Change direction based on scroll velocity
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`parallax ${bg ? `${bg}` : '!bg-white'}`}>
            <motion.div className="scroller flex gap-[80px]" style={{ x }}>
                {images.map((src, index) => (
                    <motion.img
                        key={index}
                        src={src}
                        alt={`parallax-image-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
                {images.map((src, index) => (
                    <motion.img
                        key={`${index}-duplicate`}
                        src={src}
                        alt={`parallax-image-duplicate-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
                {images.map((src, index) => (
                    <motion.img
                        key={`${index}-duplicate`}
                        src={src}
                        alt={`parallax-image-duplicate-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
                {images.map((src, index) => (
                    <motion.img
                        key={`${index}-duplicate`}
                        src={src}
                        alt={`parallax-image-duplicate-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
                {images.map((src, index) => (
                    <motion.img
                        key={`${index}-duplicate`}
                        src={src}
                        alt={`parallax-image-duplicate-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
                {images.map((src, index) => (
                    <motion.img
                        key={`${index}-duplicate`}
                        src={src}
                        alt={`parallax-image-duplicate-${index}`}
                        className=" object-scale-down w-[200px] h-[140px]"
                    />
                ))}
            </motion.div>
        </div>
    );
}
